import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Boxes,
  Truck,
  Warehouse,
  Factory,
  Landmark,
  GraduationCap,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "../component/site/AnimatedBackground";
import { SceneBackground } from "../component/site/SceneCanvas";
import { SERVICES as services, pageTitle } from "../data/company";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: pageTitle("Services") },
      {
        name: "description",
        content:
          "Corporate procurement, bulk orders, tenders and quotations, institutional sales, logistics, delivery and inventory management for private offices, institutes and companies.",
      },
      { property: "og:title", content: "Services — Source International" },
      {
        property: "og:description",
        content: "End-to-end corporate procurement, bulk supply and institutional logistics.",
      },
    ],
  }),
  component: ServicesPage,
});

// Icons are components rather than data, so they're matched to service titles
// defined in data/company.ts.
const SERVICE_ICONS: Record<string, LucideIcon> = {
  "Corporate & Industrial Supply": Factory,
  "Tenders & Government Supply": Landmark,
  "Institutional & Education Supply": GraduationCap,
  "Logistics & Delivery": Truck,
  "Inventory Management": Warehouse,
};

const process = [
  { k: "01", t: "Discovery", d: "We map your consumption, categories and delivery cadence." },
  { k: "02", t: "Proposal", d: "A tailored catalog, pricing framework and SLA is issued." },
  { k: "03", t: "Onboarding", d: "Accounts, approvals and procurement portal go live." },
  { k: "04", t: "Fulfillment", d: "Recurring orders ship on schedule with QA verification." },
];

function ServicesPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-brand-dark py-24 text-white md:py-32">
        <SceneBackground variant="flow" />
        <div className="container-x relative">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-accent">
              Services
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] md:text-6xl">
              End-to-end <span className="text-gradient">corporate supply</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-white/80">
              From a single quotation to multi-year institutional contracts — our services are built
              for organizations that value reliability and precision.
            </p>
          </div>
        </div>
      </section>

      <section className="container-x py-24 md:py-32">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = SERVICE_ICONS[s.title] ?? Boxes;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:shadow-elevated"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-accent/10 transition group-hover:scale-[2]" />
                <div className="relative">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl gradient-royal text-white shadow-glow">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="bg-secondary/40 py-24 md:py-32">
        <div className="container-x">
          <SectionHeading
            center
            eyebrow="Process"
            title={
              <>
                How we <span className="text-gradient">engage</span>.
              </>
            }
            desc="A four-stage engagement designed for procurement teams who need clarity and speed."
          />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <motion.div
                key={p.k}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.08 }}
                className="relative rounded-2xl border border-border bg-card p-6"
              >
                <div className="font-display text-4xl font-bold text-gradient">{p.k}</div>
                <h4 className="mt-3 font-display text-base font-semibold">{p.t}</h4>
                <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-24">
        <div className="relative overflow-hidden rounded-3xl gradient-royal p-10 shadow-elevated md:p-14">
          <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
          <div className="relative grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <h3 className="font-display text-3xl font-bold leading-tight text-white md:text-4xl">
                Bring your procurement into one trusted supplier.
              </h3>
              <p className="mt-3 max-w-xl text-white/85">
                Talk to our corporate desk for quotations, annual supply agreements or a pilot
                supply program.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-brand-dark shadow-glow"
              >
                Start a conversation <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
