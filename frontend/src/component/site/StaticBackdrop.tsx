/**
 * Quiet header backdrop for the pages where the visitor came to do something
 * rather than be sold to — the catalog, the team, the contact details.
 *
 * No canvas and no motion at all: a faint grid and two soft pools of brand
 * colour, layered over the section's own `bg-brand-dark`. It costs nothing to
 * render and keeps search fields, portraits and phone numbers as the only
 * things asking for attention.
 */
export function StaticBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="grid-pattern absolute inset-0 opacity-[0.18]" />
      <div className="absolute -right-32 -top-40 h-[30rem] w-[30rem] rounded-full bg-brand-accent/15 blur-3xl" />
      <div className="absolute -bottom-48 left-1/4 h-[24rem] w-[24rem] rounded-full bg-brand-2/12 blur-3xl" />
    </div>
  );
}
