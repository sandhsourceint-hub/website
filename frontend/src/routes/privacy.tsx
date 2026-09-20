import { createFileRoute } from "@tanstack/react-router";
import { StaticBackdrop } from "../component/site/StaticBackdrop";
import { BRAND as brand, pageTitle } from "../data/company";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: pageTitle("Privacy & Cookies") },
      {
        name: "description",
        content:
          "How Source International's website handles visitor data, browser storage and cookies.",
      },
    ],
  }),
  component: PrivacyPage,
});

/**
 * Written from what this site actually does, not from a template: every claim
 * below is checkable in the source. If a tracker, form backend or embed is
 * added later, this page has to change with it.
 */
const SECTIONS: { title: string; body: string[] }[] = [
  {
    title: "What this site stores on your device",
    body: [
      "Two small entries in your browser's local storage, and nothing else. The first remembers whether you chose the light or dark version of the site. The second records your answer to the cookie notice, so you are not asked again on every page.",
      "Both stay on your device. They are never sent to us or to anyone else, and they are not advertising identifiers.",
    ],
  },
  {
    title: "Tracking and analytics",
    body: [
      "This site runs no analytics, no advertising pixels and no third-party tracking scripts. Nothing measures which pages you visit or builds a profile of you.",
      "If that changes, the marketing option in the cookie notice will control it, and it will stay switched off unless you allow it.",
    ],
  },
  {
    title: "Fonts loaded from Google",
    body: [
      "The site's typefaces (Inter and Manrope) are served by Google Fonts. Loading them means your browser contacts Google's servers, which can see your IP address and the fact that a page on this site was opened. We receive nothing from this and set no cookie through it.",
    ],
  },
  {
    title: "When you contact us",
    body: [
      "The contact page opens your own email program with a message pre-filled; it does not submit anything to this website. Whatever you then choose to send reaches us as an ordinary email, and we keep it only to answer your inquiry and run the resulting order.",
    ],
  },
  {
    title: "Changing your mind",
    body: [
      "Clearing your browser's site data for this domain erases both stored entries. The cookie notice will then appear again on your next visit and you can answer differently.",
    ],
  },
];

function PrivacyPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-brand-dark py-20 text-white md:py-28">
        <StaticBackdrop />
        <div className="container-x relative">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-accent">
              Privacy
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-tight md:text-5xl">
              Privacy &amp; Cookies
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/75 md:text-lg">
              A plain description of what this website does with your data. It is short because the
              site does very little.
            </p>
          </div>
        </div>
      </section>

      <section className="container-x py-20 md:py-28">
        <div className="max-w-3xl space-y-12">
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h2 className="font-display text-xl font-semibold md:text-2xl">{s.title}</h2>
              {s.body.map((p) => (
                <p
                  key={p}
                  className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base"
                >
                  {p}
                </p>
              ))}
            </div>
          ))}

          <div className="rounded-2xl border border-border bg-secondary/40 p-6">
            <h2 className="font-display text-lg font-semibold">Questions</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Write to{" "}
              <a
                href={`mailto:${brand.email}`}
                className="font-semibold text-brand hover:underline dark:text-brand-accent"
              >
                {brand.email}
              </a>{" "}
              or call {brand.phone} and we will answer.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
