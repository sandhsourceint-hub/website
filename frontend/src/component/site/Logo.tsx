import markSrc from "../../assets/logo-mark.png";

/**
 * Brand lockup:
 *   • the company "S&H" monogram tile
 *   • a thin rule
 *   • "SOURCE INTERNATIONAL" in tracked caps, the first "O" a blue sphere
 *   • short strapline beneath
 *
 * The monogram is the real artwork (assets/LOGO.png, cropped square); the
 * wordmark beside it is drawn in markup so it stays sharp at every size and
 * adapts to light and dark surfaces.
 */

type Surface = "light" | "dark";

/** The blue sphere standing in for the "O" in SOURCE. */
function SphereO() {
  return (
    <span
      aria-hidden
      className="inline-block rounded-full"
      style={{
        width: "0.74em",
        height: "0.74em",
        verticalAlign: "-0.02em",
        background:
          "radial-gradient(circle at 34% 28%, #a6d8ff 0%, #4ea6ea 36%, #1a6cb8 68%, #0a3f76 100%)",
        boxShadow: "inset 0 0 0 0.5px rgba(255,255,255,0.4)",
      }}
    />
  );
}

/**
 * The "S&H" tile — the company logo, usable on its own as a compact mark.
 * The artwork is already a navy square, so the tile needs no background of its
 * own; it only rounds the corners to match the rest of the UI.
 */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <img
      src={markSrc}
      alt=""
      aria-hidden
      width={320}
      height={320}
      className={`shrink-0 rounded-[5px] object-cover ${className}`}
    />
  );
}

export function Logo({
  surface = "light",
  showStrapline = true,
  className = "",
}: {
  surface?: Surface;
  /** Hide when the surrounding layout already states the strapline. */
  showStrapline?: boolean;
  className?: string;
}) {
  const dark = surface === "dark";

  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      {/* The mark's navy sits close to the dark footer, so a hairline ring
          keeps its edges readable there. */}
      <LogoMark className={`h-9 w-9 md:h-10 md:w-10 ${dark ? "ring-1 ring-white/15" : ""}`} />

      <span
        aria-hidden
        className={`h-8 w-px shrink-0 md:h-9 ${dark ? "bg-white/25" : "bg-border"}`}
      />

      {/* The visual wordmark is decorative — its "O" is a graphic, not a
          character — so the accessible name is provided separately. */}
      <span className="sr-only">Source International</span>
      <span aria-hidden className="flex min-w-0 flex-col leading-none">
        <span
          className={`font-display text-[13px] font-semibold uppercase tracking-[0.13em] md:text-[15px] ${
            dark ? "text-white" : "text-foreground"
          }`}
        >
          sandh S<SphereO />
          urce<span className="ml-[0.45em]">International</span>
        </span>
        {showStrapline && (
          <span
            className={`mt-[5px] hidden text-[9.5px] uppercase tracking-[0.15em] sm:block md:text-[10px] lg:hidden xl:block ${
              dark ? "text-white/55" : "text-muted-foreground"
            }`}
          >
            Leading Source of Stationery &amp; Papers
          </span>
        )}
      </span>
    </span>
  );
}
