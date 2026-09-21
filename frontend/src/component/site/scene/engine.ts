import { useEffect, useRef } from "react";

/**
 * Shared runtime for the animated page backdrops.
 *
 * Every scene is a plain object with `create` (seeded, resolution-independent
 * state) and `draw` (one frame). This module owns everything else: device-pixel
 * sizing, resize, the requestAnimationFrame loop, and the rules that keep the
 * animation from burning battery — it idles whenever the canvas is scrolled out
 * of view or the tab is in the background, and freezes its clock while idle so
 * nothing jumps on the way back.
 *
 * Drawing is additive ("lighter") over a painted ground, which is what produces
 * the neon glow without any blur filter. Glow dots are blitted from one
 * pre-rendered sprite rather than building a gradient per dot per frame.
 */

export const ACCENT = [61, 165, 255] as const;
export const PALE = [207, 233, 255] as const;
export const MID = [30, 111, 196] as const;
export const DEEP = [10, 58, 120] as const;

export type Rgb = readonly number[];

export const rgba = (c: Rgb, a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

/** The ground the scenes are composed against, also used as the CSS fallback. */
export const GROUND_CSS = "radial-gradient(120% 120% at 34% 30%, #0E3A6B 0%, #04122A 100%)";

/** Design space the scenes were composed in; `k` scales them to the canvas. */
export const DESIGN_W = 1470;
export const DESIGN_H = 684;

/** Small deterministic generator, matched byte-for-byte by the design-time prototype. */
export function lcg(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** Drawing surface handed to a scene, with helpers that avoid per-frame allocation. */
export type Rig = {
  ctx: CanvasRenderingContext2D;
  w: number;
  h: number;
  /** design-space -> canvas scale */
  k: number;
  /** Soft glow point, blitted from a shared sprite. */
  dot(x: number, y: number, r: number, alpha: number): void;
  /** Open a stroke pass; every seg() until end() shares this colour and width. */
  begin(color: Rgb, alpha: number, width: number): void;
  seg(x0: number, y0: number, x1: number, y1: number): void;
  end(): void;
};

export type Scene<S = unknown> = {
  /** Seeded objects, independent of canvas size. */
  create(): S;
  /** Optional override for how design units map onto this canvas. */
  scale?(w: number, h: number): number;
  /** Rebuild anything size-dependent (sprites). */
  resize?(state: S, k: number, dpr: number): void;
  draw(rig: Rig, state: S, t: number): void;
};

/** One white-to-accent radial blob, scaled and alpha-modulated at draw time. */
function makeDotSprite(dpr: number): HTMLCanvasElement {
  const R = 32;
  const cv = document.createElement("canvas");
  cv.width = cv.height = Math.ceil(R * 2 * dpr);
  const g = cv.getContext("2d");
  if (g) {
    g.scale(dpr, dpr);
    const grd = g.createRadialGradient(R, R, 0, R, R, R);
    grd.addColorStop(0, rgba(PALE, 1));
    grd.addColorStop(0.4, rgba(ACCENT, 0.5));
    grd.addColorStop(1, rgba(ACCENT, 0));
    g.fillStyle = grd;
    g.fillRect(0, 0, R * 2, R * 2);
  }
  return cv;
}

export function useSceneCanvas<S>(scene: Scene<S>) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const state = scene.create();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let k = 1;
    let dpr = 1;
    let sprite = makeDotSprite(1);
    let raf = 0;
    let onScreen = true;
    let start = 0;
    let held = 0; // clock position kept across pauses

    const rig: Rig = {
      ctx,
      w: 0,
      h: 0,
      k: 1,
      dot(x, y, r, alpha) {
        if (r <= 0 || alpha <= 0.004) return;
        ctx.globalAlpha = alpha > 1 ? 1 : alpha;
        ctx.drawImage(sprite, x - r, y - r, r * 2, r * 2);
        ctx.globalAlpha = 1;
      },
      begin(color, alpha, width) {
        ctx.strokeStyle = rgba(color, alpha);
        ctx.lineWidth = width;
        ctx.beginPath();
      },
      seg(x0, y0, x1, y1) {
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
      },
      end() {
        ctx.stroke();
      },
    };

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      k = scene.scale ? scene.scale(w, h) : Math.max(0.62, Math.min(1.5, w / DESIGN_W));
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      sprite = makeDotSprite(dpr);
      rig.w = w;
      rig.h = h;
      rig.k = k;
      scene.resize?.(state, k, dpr);
    }

    function draw(t: number) {
      if (!w || !h) return;
      const bg = ctx!.createRadialGradient(
        w * 0.34,
        h * 0.3,
        0,
        w * 0.34,
        h * 0.3,
        Math.max(w, h) * 1.05,
      );
      bg.addColorStop(0, "#0E3A6B");
      bg.addColorStop(1, "#04122A");
      ctx!.globalCompositeOperation = "source-over";
      ctx!.fillStyle = bg;
      ctx!.fillRect(0, 0, w, h);
      ctx!.globalCompositeOperation = "lighter";
      scene.draw(rig, state, t);
    }

    function frame(now: number) {
      draw((now - start) / 1000);
      raf = requestAnimationFrame(frame);
    }
    function play() {
      if (raf || reduced) return;
      raf = requestAnimationFrame((now) => {
        start = now - held * 1000;
        frame(now);
      });
    }
    function pause() {
      if (!raf) return;
      cancelAnimationFrame(raf);
      raf = 0;
      held = (performance.now() - start) / 1000;
    }

    resize();
    if (reduced) draw(6);
    else play();

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) draw(6);
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(
      ([e]) => {
        onScreen = e.isIntersecting;
        if (onScreen && !document.hidden) play();
        else pause();
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) pause();
      else if (onScreen) play();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      pause();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [scene]);

  return ref;
}
