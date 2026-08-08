/**
 * Brand lockup, rebuilt from the company logo:
 *   • "S&H" monogram in a deep-navy tile
 *   • a thin rule
 *   • "SOURCE INTERNATIONAL" in tracked caps, the first "O" a blue sphere
 *   • short strapline beneath
 *
 * Drawn in markup rather than shipped as an image so it stays sharp at every
 * size and on every screen density, adapts to light and dark surfaces, and
 * adds no download weight.
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

/** The "S&H" tile — usable on its own as a compact mark or favicon-style badge. */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`grid shrink-0 place-items-center rounded-[5px] ${className}`}
      style={{ background: "linear-gradient(150deg, #1b4f8f 0%, #0d3a6b 55%, #07264a 100%)" }}
    >
      <span className="font-display font-bold leading-none tracking-[-0.03em] text-white">
        S&amp;H
      </span>
    </span>
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
      <LogoMark className="h-9 w-9 text-[11px] md:h-10 md:w-10 md:text-[12px]" />

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
          S<SphereO />
          urce<span className="ml-[0.45em]">International</span>
        </span>
        {showStrapline && (
          <span
            className={`mt-[5px] hidden text-[8px] uppercase tracking-[0.15em] sm:block md:text-[8.5px] ${
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
