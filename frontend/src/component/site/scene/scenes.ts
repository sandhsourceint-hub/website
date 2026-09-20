import {
  ACCENT,
  DEEP,
  DESIGN_H,
  DESIGN_W,
  MID,
  PALE,
  type Rgb,
  type Scene,
  lcg,
  rgba,
} from "./engine";

/**
 * One scene per page. They share a palette and a technique so the site reads as
 * a set, but each carries its own idea:
 *
 *   spheres  home      glass spheres, wireframe cubes and a node constellation
 *   globe    about     a dotted globe on a tilted axis, with satellites
 *   flow     services  pulses of light running along process lanes
 *
 * Three more are kept below but not registered — see SCENES at the foot of the
 * file for why:
 *
 *   boxes    cartons drifting toward the viewer through a frustum
 *   orbits   tilted concentric orbits around a bright hub
 *   radar    a sweep and expanding rings from a fixed point
 *
 * Geometry is written out longhand rather than through vector helpers, to keep
 * the per-frame path free of allocation.
 */

/** Inner-page heroes are short and wide, so fit to the smaller axis. */
const fitBoth = (w: number, h: number) =>
  Math.max(0.5, Math.min(1.45, Math.min(w / DESIGN_W, h / DESIGN_H) * 1.15));

/* ------------------------------------------------------------------ spheres */

type Sphere = {
  ux: number;
  uy: number;
  z: number;
  r: number;
  vx: number;
  vy: number;
  ph: number;
  sprite: HTMLCanvasElement | null;
  pad: number;
};
type Cube = {
  ux: number;
  uy: number;
  z: number;
  s: number;
  ax: number;
  ay: number;
  sx: number;
  sy: number;
  vx: number;
  vy: number;
};
type Node = { ux: number; uy: number; vx: number; vy: number };
type SpheresState = { spheres: Sphere[]; cubes: Cube[]; nodes: Node[]; px: number[]; py: number[] };

const CUBE_V: [number, number, number][] = [];
for (const x of [-1, 1]) for (const y of [-1, 1]) for (const z of [-1, 1]) CUBE_V.push([x, y, z]);
const CUBE_E: [number, number][] = [];
for (let i = 0; i < 8; i++) {
  for (let j = i + 1; j < 8; j++) {
    let diff = 0;
    for (let q = 0; q < 3; q++) if (CUBE_V[i][q] !== CUBE_V[j][q]) diff++;
    if (diff === 1) CUBE_E.push([i, j]);
  }
}

/** Keeps drifting objects on screen by looping them around the edges. */
const wrap = (v: number, size: number, margin: number) => {
  const span = size + margin * 2;
  return ((((v + margin) % span) + span) % span) - margin;
};

/** Rasterizes one sphere — glow, shaded body, rim light, speculars — once. */
function makeSphereSprite(r: number, z: number, dpr: number): HTMLCanvasElement {
  const pad = r * 2.1;
  const size = Math.ceil(pad * 2);
  const cv = document.createElement("canvas");
  cv.width = cv.height = Math.max(1, Math.ceil(size * dpr));
  const g = cv.getContext("2d");
  if (!g) return cv;
  g.scale(dpr, dpr);
  g.globalCompositeOperation = "lighter";
  const c = pad;
  const hx = c - r * 0.34;
  const hy = c - r * 0.38;

  const glow = g.createRadialGradient(c, c, 0, c, c, r * 2.1);
  glow.addColorStop(0, rgba(ACCENT, 0.13 * z));
  glow.addColorStop(0.45, rgba(ACCENT, 0.04 * z));
  glow.addColorStop(1, rgba(ACCENT, 0));
  g.fillStyle = glow;
  g.fillRect(0, 0, size, size);

  // Two-circle gradient: shading runs from the highlight out to the silhouette.
  const body = g.createRadialGradient(hx, hy, 0, c, c, r);
  body.addColorStop(0, rgba(PALE, 0.95));
  body.addColorStop(0.3, rgba(ACCENT, 0.85));
  body.addColorStop(0.62, rgba(MID, 0.6));
  body.addColorStop(0.86, rgba(DEEP, 0.34));
  body.addColorStop(1, rgba(DEEP, 0.18));
  g.beginPath();
  g.arc(c, c, r, 0, Math.PI * 2);
  g.fillStyle = body;
  g.fill();

  g.save();
  g.beginPath();
  g.arc(c, c, r, 0, Math.PI * 2);
  g.clip();
  const rim = g.createLinearGradient(c - r, c - r, c + r, c + r);
  rim.addColorStop(0, rgba(PALE, 0));
  rim.addColorStop(0.55, rgba(PALE, 0));
  rim.addColorStop(1, rgba(PALE, 0.4));
  g.beginPath();
  g.arc(c, c, r * 0.93, 0, Math.PI * 2);
  g.lineWidth = Math.max(1, r * 0.14);
  g.strokeStyle = rim;
  g.stroke();
  g.restore();

  const spec = g.createRadialGradient(hx, hy, 0, hx, hy, r * 0.3);
  spec.addColorStop(0, "rgba(255,255,255,0.95)");
  spec.addColorStop(0.45, rgba(PALE, 0.45));
  spec.addColorStop(1, rgba(PALE, 0));
  g.fillStyle = spec;
  g.fillRect(0, 0, size, size);

  const bx = c + r * 0.3;
  const by = c + r * 0.42;
  const bounce = g.createRadialGradient(bx, by, 0, bx, by, r * 0.2);
  bounce.addColorStop(0, rgba(PALE, 0.4));
  bounce.addColorStop(1, rgba(ACCENT, 0));
  g.fillStyle = bounce;
  g.fillRect(0, 0, size, size);
  return cv;
}

export const spheres: Scene<SpheresState> = {
  create() {
    const rs = lcg(5);
    const sp: Sphere[] = [];
    const COLS = 6;
    const ROWS = 3;
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        if (rs() < 0.18) continue; // gaps, so it does not read as a lattice
        let z = 0.18 + rs() * 0.82;
        const ux = (col + 0.12 + rs() * 0.76) / COLS;
        const uy = (row + 0.12 + rs() * 0.76) / ROWS;
        // Shrink anything landing behind the headline so the copy stays legible.
        const fx = Math.max(0, 1 - Math.pow(Math.abs(ux - 0.5) / 0.34, 2));
        const fy = Math.max(0, 1 - Math.pow(Math.abs(uy - 0.42) / 0.42, 2));
        z *= 1 - 0.74 * fx * fy;
        sp.push({
          ux,
          uy,
          z,
          r: 10 + 62 * z * z,
          vx: (rs() - 0.5) * 7 * z,
          vy: -(3 + rs() * 7) * z,
          ph: rs() * 6.28,
          sprite: null,
          pad: 0,
        });
      }
    }
    const rc = lcg(29);
    const cubes: Cube[] = [];
    for (let i = 0; i < 5; i++) {
      const z = 0.35 + rc() * 0.65;
      cubes.push({
        ux: rc(),
        uy: 0.35 + rc() * 0.6,
        z,
        s: 30 + 66 * z,
        ax: rc() * 6.28,
        ay: rc() * 6.28,
        sx: (rc() - 0.5) * 0.3,
        sy: 0.1 + rc() * 0.22,
        vx: (rc() - 0.5) * 5 * z,
        vy: (rc() - 0.5) * 3 * z,
      });
    }
    const rn = lcg(11);
    const nodes: Node[] = [];
    for (let i = 0; i < 64; i++) {
      nodes.push({ ux: rn(), uy: rn(), vx: (rn() - 0.5) * 6, vy: (rn() - 0.5) * 6 });
    }
    return {
      spheres: sp.sort((a, b) => a.z - b.z),
      cubes: cubes.sort((a, b) => a.z - b.z),
      nodes,
      px: new Array(nodes.length).fill(0),
      py: new Array(nodes.length).fill(0),
    };
  },
  resize(s, k, dpr) {
    for (const o of s.spheres) {
      o.pad = o.r * k * 2.1;
      o.sprite = makeSphereSprite(o.r * k, o.z, dpr);
    }
  },
  draw({ ctx, w, h, k, dot, begin, seg, end }, s, t) {
    const { px, py, nodes } = s;
    for (let i = 0; i < nodes.length; i++) {
      px[i] = wrap(nodes[i].ux * w + nodes[i].vx * k * t, w, 40);
      py[i] = wrap(nodes[i].uy * h + nodes[i].vy * k * t, h, 40);
    }
    const reach = 155 * k;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const d = Math.hypot(px[i] - px[j], py[i] - py[j]);
        if (d >= reach) continue;
        begin(ACCENT, 0.13 * (1 - d / reach), 1.1);
        seg(px[i], py[i], px[j], py[j]);
        end();
      }
    }
    for (let i = 0; i < nodes.length; i++) dot(px[i], py[i], 3 * k, 0.75);

    for (const c of s.cubes) {
      const ax = c.ax + c.sx * t;
      const ay = c.ay + c.sy * t;
      const ca = Math.cos(ax);
      const sa = Math.sin(ax);
      const cb = Math.cos(ay);
      const sb = Math.sin(ay);
      const size = c.s * k;
      const ox = wrap(c.ux * w + c.vx * k * t, w, size * 2);
      const oy = wrap(c.uy * h + c.vy * k * t, h, size * 2);
      const xs: number[] = [];
      const ys: number[] = [];
      for (const [vx, vy, vz] of CUBE_V) {
        const y1 = vy * ca - vz * sa;
        const z1 = vy * sa + vz * ca;
        const x2 = vx * cb + z1 * sb;
        const z2 = -vx * sb + z1 * cb;
        const p = 2.6 / (2.6 + z2);
        xs.push(ox + x2 * size * p);
        ys.push(oy + y1 * size * p);
      }
      const a = 0.3 * c.z;
      begin(ACCENT, a * 0.5, 2.6);
      for (const [i, j] of CUBE_E) seg(xs[i], ys[i], xs[j], ys[j]);
      end();
      begin(PALE, a, 1.0);
      for (const [i, j] of CUBE_E) seg(xs[i], ys[i], xs[j], ys[j]);
      end();
      for (let i = 0; i < 8; i++) dot(xs[i], ys[i], 3.6 * k, a * 1.5);
    }

    for (const o of s.spheres) {
      if (!o.sprite) continue;
      const cx = wrap(o.ux * w + o.vx * k * t, w, o.pad);
      const cy = wrap(o.uy * h + o.vy * k * t + Math.sin(t * 0.35 + o.ph) * 9 * k, h, o.pad);
      ctx.drawImage(o.sprite, cx - o.pad, cy - o.pad, o.pad * 2, o.pad * 2);
    }
  },
};

/* -------------------------------------------------------------------- globe */

type GlobeState = { pts: [number, number, number][] };

export const globe: Scene<GlobeState> = {
  scale: fitBoth,
  create() {
    // Fibonacci sphere: even coverage without the pole crowding of a lat/long grid.
    const pts: [number, number, number][] = [];
    const N = 760;
    for (let i = 0; i < N; i++) {
      const y = 1 - (2 * (i + 0.5)) / N;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const th = Math.PI * (1 + Math.sqrt(5)) * i;
      pts.push([Math.cos(th) * r, y, Math.sin(th) * r]);
    }
    return { pts };
  },
  draw({ w, h, k, dot, begin, seg, end }, s, t) {
    const cx = w * 0.72;
    const cy = h * 0.52;
    const R = 215 * k;
    const spin = t * 0.16;
    const cs = Math.cos(spin);
    const sn = Math.sin(spin);
    const TILT = -0.38;
    const ct = Math.cos(TILT);
    const st = Math.sin(TILT);

    // Spin about Y, then tilt about X. Only the near hemisphere is drawn.
    const project = (p: readonly number[]) => {
      const x1 = p[0] * cs + p[2] * sn;
      const z1 = -p[0] * sn + p[2] * cs;
      const y2 = p[1] * ct - z1 * st;
      const z2 = p[1] * st + z1 * ct;
      return [cx + x1 * R, cy + y2 * R, z2] as const;
    };

    for (const p of s.pts) {
      const [x, y, z] = project(p);
      if (z <= 0) continue;
      const d = 0.35 + 0.65 * z;
      dot(x, y, 2.1 * k * d, 0.5 + 0.8 * d);
    }

    begin(ACCENT, 0.22, 1.0);
    for (let m = 0; m < 6; m++) {
      let prev: readonly number[] | null = null;
      for (let j = 0; j <= 48; j++) {
        const a = (j / 48) * Math.PI - Math.PI / 2;
        const cur = project([
          Math.cos(a) * Math.cos((m * Math.PI) / 6),
          Math.sin(a),
          Math.cos(a) * Math.sin((m * Math.PI) / 6),
        ]);
        if (prev && cur[2] > 0 && prev[2] > 0) seg(prev[0], prev[1], cur[0], cur[1]);
        prev = cur;
      }
    }
    end();

    begin(ACCENT, 0.18, 1.0);
    for (const lat of [-0.55, -0.2, 0.2, 0.55]) {
      const rr = Math.sqrt(Math.max(0, 1 - lat * lat));
      let prev: readonly number[] | null = null;
      for (let j = 0; j <= 72; j++) {
        const a = (j / 72) * 2 * Math.PI;
        const cur = project([Math.cos(a) * rr, lat, Math.sin(a) * rr]);
        if (prev && cur[2] > 0 && prev[2] > 0) seg(prev[0], prev[1], cur[0], cur[1]);
        prev = cur;
      }
    }
    end();

    // Satellite orbits: tilted rings drawn whole, each carrying one bright dot.
    const rings: [number, number, number][] = [
      [0.55, 1.35, 0.32],
      [-0.75, 1.7, -0.22],
      [0.15, 2.05, 0.17],
    ];
    for (let i = 0; i < rings.length; i++) {
      const [tilt, rad, sp] = rings[i];
      const s2 = Math.sin(tilt);
      begin(ACCENT, 0.22, 1.0);
      let prev: [number, number] | null = null;
      for (let j = 0; j <= 96; j++) {
        const a = (j / 96) * 2 * Math.PI;
        const x = Math.cos(a) * rad;
        const z = Math.sin(a) * rad;
        const cur: [number, number] = [cx + x * R, cy + -z * s2 * R];
        if (prev) seg(prev[0], prev[1], cur[0], cur[1]);
        prev = cur;
      }
      end();
      const a = t * sp + i * 2.1;
      const x = Math.cos(a) * rad;
      const z = Math.sin(a) * rad;
      dot(cx + x * R, cy + -z * s2 * R, 5 * k, 0.95);
    }
  },
};

/* -------------------------------------------------------------------- boxes */

type Box = {
  ux: number;
  uy: number;
  z0: number;
  w: number;
  h: number;
  d: number;
  a: number;
  sp: number;
};
type BoxesState = { items: Box[]; order: number[] };
const ZREF = 9;
const ZSPAN = 18;
const ZNEAR = 1.4;

export const boxes: Scene<BoxesState> = {
  scale: fitBoth,
  create() {
    const r = lcg(17);
    const items: Box[] = [];
    for (let i = 0; i < 46; i++) {
      items.push({
        // Spread is chosen in screen space at ZREF, then divided back through
        // the projection, so cartons fill the frame and fly outward as they near.
        ux: (r() - 0.5) * 3.0,
        uy: (r() - 0.5) * 1.9,
        z0: r() * ZSPAN,
        w: 0.45 + r() * 0.75,
        h: 0.45 + r() * 0.75,
        d: 0.45 + r() * 0.75,
        a: r() * 6.28,
        sp: 0.1 + r() * 0.25,
      });
    }
    return { items, order: items.map((_, i) => i) };
  },
  draw({ w, h, k, begin, seg, end }, s, t) {
    const vx = w * 0.66;
    const vy = h * 0.5;
    const F = 620 * k;
    const depth = (b: Box) => ((((b.z0 - t * 1.1) % ZSPAN) + ZSPAN) % ZSPAN) + ZNEAR;
    s.order.sort((a, b) => depth(s.items[b]) - depth(s.items[a])); // far first
    const xs = new Array<number>(8);
    const ys = new Array<number>(8);
    for (const idx of s.order) {
      const b = s.items[idx];
      const z = depth(b);
      const fade = Math.min(1, (ZSPAN + ZNEAR - z) / 5.0) * Math.min(1, (z - ZNEAR) / 2.6);
      if (fade <= 0.01) continue;
      const ang = b.a + t * b.sp;
      const ca = Math.cos(ang);
      const sa = Math.sin(ang);
      const cp = Math.cos(0.3);
      const sp2 = Math.sin(0.3);
      for (let i = 0; i < 8; i++) {
        const [sx, sy, sz] = CUBE_V[i];
        const px0 = sx * b.w * 0.5;
        const py0 = sy * b.h * 0.5;
        const pz0 = sz * b.d * 0.5;
        const x1 = px0 * ca + pz0 * sa; // yaw
        const z1 = -px0 * sa + pz0 * ca;
        const y2 = py0 * cp - z1 * sp2; // pitch
        const z2 = py0 * sp2 + z1 * cp;
        const sc = F / Math.max(z + z2, 0.6);
        xs[i] = vx + (b.ux * ZREF + x1) * sc;
        ys[i] = vy + (b.uy * ZREF + y2) * sc;
      }
      begin(ACCENT, 0.26 * fade, 2.2);
      for (const [i, j] of CUBE_E) seg(xs[i], ys[i], xs[j], ys[j]);
      end();
      begin(PALE, 0.46 * fade, 1.0);
      for (const [i, j] of CUBE_E) seg(xs[i], ys[i], xs[j], ys[j]);
      end();
    }
  },
};

/* --------------------------------------------------------------------- flow */

type Lane = { uy: number; amp: number; ph: number; sp: number; n: number };
type FlowState = { lanes: Lane[] };

export const flow: Scene<FlowState> = {
  scale: fitBoth,
  create() {
    const r = lcg(23);
    const lanes: Lane[] = [];
    for (let i = 0; i < 6; i++) {
      lanes.push({
        uy: 0.16 + 0.14 * i,
        amp: 18 + r() * 46,
        ph: r() * 6.28,
        sp: 0.18 + r() * 0.5,
        n: 2 + Math.floor(r() * 2),
      });
    }
    return { lanes };
  },
  draw({ w, h, k, dot, begin, seg, end }, s, t) {
    const at = (l: Lane, u: number): [number, number] => [
      u * w,
      l.uy * h + Math.sin(u * 3.0 + l.ph) * l.amp * k,
    ];
    for (const l of s.lanes) {
      begin(ACCENT, 0.24, 1.3);
      let prev = at(l, 0);
      for (let j = 1; j <= 90; j++) {
        const cur = at(l, j / 90);
        seg(prev[0], prev[1], cur[0], cur[1]);
        prev = cur;
      }
      end();
      for (let i = 0; i < 9; i++) {
        const p = at(l, (i + 0.5) / 9);
        dot(p[0], p[1], 3.2 * k, 0.52);
      }
      for (let n = 0; n < l.n; n++) {
        const u = ((((t * l.sp + n / l.n) % 1.15) + 1.15) % 1.15) - 0.075;
        if (u < 0 || u > 1) continue;
        for (let q = 0; q < 16; q++) {
          const uu = u - q * 0.008;
          if (uu < 0) break;
          const p = at(l, uu);
          dot(p[0], p[1], (7.5 - q * 0.36) * k, 0.78 * Math.pow(1 - q / 16, 1.6));
        }
        const head = at(l, u);
        dot(head[0], head[1], 12 * k, 0.4);
      }
    }
  },
};

/* ------------------------------------------------------------------- orbits */

type OrbitsState = { counts: number[] };

export const orbits: Scene<OrbitsState> = {
  scale: fitBoth,
  create() {
    const r = lcg(41);
    return { counts: [0, 1, 2, 3, 4].map(() => 1 + Math.floor(r() * 2)) };
  },
  draw({ w, h, k, dot, begin, seg, end }, s, t) {
    const cx = w * 0.72;
    const cy = h * 0.52;
    dot(cx, cy, 155 * k, 0.42);
    dot(cx, cy, 19 * k, 0.92);
    for (let i = 0; i < 5; i++) {
      const rx = (100 + i * 82) * k;
      const ry = rx * 0.34;
      const rot = -0.32 + i * 0.06;
      const cr = Math.cos(rot);
      const sr = Math.sin(rot);
      begin(ACCENT, 0.27 - i * 0.018, 1.2);
      let prev: [number, number] | null = null;
      for (let j = 0; j <= 128; j++) {
        const a = (j / 128) * 2 * Math.PI;
        const x = Math.cos(a) * rx;
        const y = Math.sin(a) * ry;
        const cur: [number, number] = [cx + x * cr - y * sr, cy + x * sr + y * cr];
        if (prev) seg(prev[0], prev[1], cur[0], cur[1]);
        prev = cur;
      }
      end();
      for (let m = 0; m < s.counts[i]; m++) {
        const a = t * (0.52 / (1 + i * 0.55)) + m * 3.14 + i * 1.1;
        const x = Math.cos(a) * rx;
        const y = Math.sin(a) * ry;
        const near = 0.55 + 0.45 * Math.sin(a); // brighter in front of the hub
        dot(cx + x * cr - y * sr, cy + x * sr + y * cr, (4.4 + 3.4 * near) * k, 0.45 + 0.55 * near);
      }
    }
  },
};

/* -------------------------------------------------------------------- radar */

type RadarState = { blips: [number, number][] };

export const radar: Scene<RadarState> = {
  scale: fitBoth,
  create() {
    const r = lcg(53);
    const blips: [number, number][] = [];
    for (let i = 0; i < 11; i++) blips.push([r() * 6.28, 0.2 + r() * 0.85]);
    return { blips };
  },
  draw({ w, h, k, dot, begin, seg, end }, s, t) {
    const cx = w * 0.72;
    const cy = h * 0.54;
    const R = 280 * k;
    const SQUASH = 0.42; // the dish is seen at a shallow angle

    const ring = (rr: number, color: Rgb, alpha: number, width: number) => {
      begin(color, alpha, width);
      let prev: [number, number] | null = null;
      for (let j = 0; j <= 96; j++) {
        const a = (j / 96) * 2 * Math.PI;
        const cur: [number, number] = [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr * SQUASH];
        if (prev) seg(prev[0], prev[1], cur[0], cur[1]);
        prev = cur;
      }
      end();
    };

    for (let i = 0; i < 5; i++) ring(R * (0.22 + 0.19 * i), ACCENT, 0.17, 1.0);
    for (let i = 0; i < 3; i++) {
      const u = (((t * 0.26 + i / 3) % 1) + 1) % 1;
      ring(R * (0.15 + u * 0.95), PALE, 0.46 * Math.pow(1 - u, 1.4), 1.8);
    }

    const sweep = t * 0.75;
    for (let q = 0; q < 26; q++) {
      const a = sweep - q * 0.045;
      begin(ACCENT, 0.3 * Math.pow(1 - q / 26, 1.5), 1.5);
      seg(cx, cy, cx + Math.cos(a) * R * 1.1, cy + Math.sin(a) * R * 1.1 * SQUASH);
      end();
    }
    begin(PALE, 0.5, 1.2);
    seg(cx, cy, cx + Math.cos(sweep) * R * 1.1, cy + Math.sin(sweep) * R * 1.1 * SQUASH);
    end();

    for (const [a, rr] of s.blips) {
      const lag = (((sweep - a) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
      dot(
        cx + Math.cos(a) * R * rr,
        cy + Math.sin(a) * R * rr * SQUASH,
        5.5 * k,
        0.2 + 0.8 * Math.exp(-lag * 2.2),
      );
    }
    dot(cx, cy, 9 * k, 0.95);
  },
};

/**
 * Scenes actually mounted on a page. `boxes`, `orbits` and `radar` are written
 * and working but deliberately left out: the catalog, team and contact pages
 * are places to get something done, and motion behind a search field or a phone
 * number competes with it. Excluding them here also keeps them out of the
 * bundle — add one back to this object to put it on a page again.
 */
export const SCENES = { spheres, globe, flow } as const;
export type SceneName = keyof typeof SCENES;
