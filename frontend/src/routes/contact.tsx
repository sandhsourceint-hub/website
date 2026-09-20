import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Printer, Clock, ArrowRight } from "lucide-react";
import { SectionHeading } from "../component/site/AnimatedBackground";
import { StaticBackdrop } from "../component/site/StaticBackdrop";
import { BRAND as brand, pageTitle } from "../data/company";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: pageTitle("Contact") },
      {
        name: "description",
        content:
          "Request a corporate quote or supply proposal from Source International. We respond within one business day.",
      },
      { property: "og:title", content: "Contact Source International" },
      {
        property: "og:description",
        content: "Get in touch for corporate quotations and procurement inquiries.",
      },
    ],
  }),
  component: ContactPage,
});

const INQUIRY_TYPES = [
  "Corporate Inquiry",
  "Bulk Supply",
  "Institutional / Education Supply",
  "Product Quotation",
  "Partnership",
];

/** Pre-fills the visitor's email client with a structured inquiry. */
function inquiryMailto(subject: string) {
  const body = [
    "Name:",
    "Organization:",
    "Phone:",
    "",
    "Products / quantities required:",
    "",
    "Delivery timeline:",
    "",
  ].join("\n");
  return `mailto:${brand.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function ContactPage() {
  // Optional details (fax) are omitted rather than rendered as an empty card.
  const contactCards = [
    { icon: MapPin, label: "Address", value: brand.location },
    { icon: Phone, label: "Phone", value: brand.phone },
    { icon: Printer, label: "Fax", value: brand.fax },
    { icon: Mail, label: "Email", value: brand.email },
    { icon: Clock, label: "Hours", value: brand.hours },
  ].filter((c) => c.value?.trim());

  return (
    <div>
      <section className="relative overflow-hidden bg-brand-dark py-24 text-white md:py-32">
        <StaticBackdrop />
        <div className="container-x relative">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-accent">
              Contact
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] md:text-6xl">
              Let's <span className="text-gradient">work together</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-white/80">
              Request a corporate quotation or supply proposal. Our team responds within one
              business day.
            </p>
          </div>
        </div>
      </section>

      <section className="container-x py-16">
        <div
          className={`grid gap-4 sm:grid-cols-2 ${
            contactCards.length === 5 ? "lg:grid-cols-3 xl:grid-cols-5" : "lg:grid-cols-4"
          }`}
        >
          {contactCards.map((c) => (
            <div key={c.label} className="rounded-2xl border border-border bg-card p-5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand/5 text-brand">
                <c.icon className="h-4 w-4" />
              </span>
              <div className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {c.label}
              </div>
              <div className="mt-1 text-sm font-semibold">{c.value}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x pb-24">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-elevated md:p-10">
            <SectionHeading
              eyebrow="Get in touch"
              title={
                <>
                  Corporate <span className="text-gradient">inquiry</span>
                </>
              }
              desc="Email our corporate desk with your requirements and we'll route your inquiry to the right specialist."
            />

            <a
              href={inquiryMailto("Corporate Inquiry — Source International")}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full gradient-royal px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.01]"
            >
              <Mail className="h-4 w-4" /> Email us
            </a>

            <div className="mt-10">
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                What we can help with
              </div>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {INQUIRY_TYPES.map((t) => (
                  <li key={t}>
                    <a
                      href={inquiryMailto(`${t} — Source International`)}
                      className="group flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm font-medium transition hover:border-brand/30 hover:bg-secondary"
                    >
                      {t}
                      <ArrowRight className="h-3.5 w-3.5 text-brand transition-transform group-hover:translate-x-1" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-border shadow-elevated lg:aspect-[4/5]">
              <div className="absolute inset-0 gradient-royal opacity-90" />
              <div className="absolute inset-0 grid-pattern opacity-20" />
              <div className="relative flex h-full flex-col justify-between p-8 text-white">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-accent">
                    Head Office
                  </div>
                  <h4 className="mt-3 font-display text-2xl font-bold">{brand.name}</h4>
                  <p className="mt-2 max-w-xs text-sm text-white/80">{brand.location}</p>
                </div>
                <div className="glass-dark rounded-2xl p-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="h-4 w-4 text-brand-accent" /> {brand.hours}
                  </div>
                  <p className="mt-2 text-xs text-white/70">
                    Visit us at our Urdu Bazar office, or call ahead to schedule an appointment.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-border bg-card p-6">
              <div className="font-display font-semibold">Prefer direct contact?</div>
              <p className="mt-2 text-sm text-muted-foreground">
                Reach our corporate desk directly for urgent supply requirements.
              </p>
              <div className="mt-4 grid gap-2 text-sm">
                <a
                  href={`mailto:${brand.email}`}
                  className="flex min-h-11 items-center gap-2 text-brand hover:underline"
                >
                  <Mail className="h-4 w-4 shrink-0" /> {brand.email}
                </a>
                <a
                  href={`tel:${brand.phone.replace(/\s/g, "")}`}
                  className="flex min-h-11 items-center gap-2 text-brand hover:underline"
                >
                  <Phone className="h-4 w-4 shrink-0" /> {brand.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
