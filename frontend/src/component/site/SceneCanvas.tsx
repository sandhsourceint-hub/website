import { GROUND_CSS, type Scene, useSceneCanvas } from "./scene/engine";
import { SCENES, type SceneName } from "./scene/scenes";

/**
 * An animated page backdrop. Sits behind hero copy, so it is inert and hidden
 * from assistive tech.
 */
export function SceneCanvas({
  variant,
  className = "",
}: {
  variant: SceneName;
  className?: string;
}) {
  // Each scene carries its own state type; the hook only needs an opaque one.
  const scene: Scene<unknown> = SCENES[variant];
  const ref = useSceneCanvas(scene);
  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`block h-full w-full ${className}`}
      // The canvas is only painted once the effect runs, so carry the scene's
      // ground colour in CSS. Covers first paint and a JS-disabled visitor.
      style={{ background: GROUND_CSS }}
    />
  );
}

/**
 * Full-bleed backdrop for the inner-page heroes: the scene plus a left-to-right
 * scrim, since every scene puts its subject on the right and the copy on those
 * pages is left-aligned.
 */
export function SceneBackground({ variant }: { variant: SceneName }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <SceneCanvas variant={variant} className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/75 to-transparent" />
    </div>
  );
}
