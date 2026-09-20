import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Boxes,
  Briefcase,
  Building2,
  GraduationCap,
  Landmark,
  Factory,
  ShoppingBag,
  ShieldCheck,
  Truck,
  Sparkles,
} from "lucide-react";
import { SectionHeading } from "../component/site/AnimatedBackground";
import { ClientWall } from "../component/site/ClientWall";
import { Counter } from "../component/site/Counter";
import { SceneCanvas } from "../component/site/SceneCanvas";
import { BRAND, pageTitle } from "../data/company";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: pageTitle() },
      {
        name: "description",
        content:
          "Source International — corporate supplier of stationery, office supplies, computer accessories and paper products for offices, institutes and companies across Pakistan.",
      },
      { property: "og:title", content: pageTitle() },
      {
        property: "og:description",
        content: "Your trusted partner for corporate stationery, office supplies and procurement.",
      },
    ],
  }),
  component: HomePage,
});

const stats = [
  { value: 14, suffix: "+", label: "Years of Experience" },
  // Matches the figure on the About page; the site carries one client count.
  { value: 30, suffix: "+", label: "Corporate Clients" },
  { value: 24, suffix: "/7", label: "Client Support" },
];

const industries = [
  { icon: Building2, label: "Private Offices" },
  { icon: GraduationCap, label: "Education" },
  { icon: Landmark, label: "Institutes" },
  { icon: Briefcase, label: "Companies" },
  { icon: ShoppingBag, label: "Retailers" },
  { icon: Factory, label: "Industrial" },
];

const whyChoose = [
  {
    icon: ShieldCheck,
    title: "Trusted Supplier",
    desc: "Preferred procurement partner to hundreds of leading institutions across the region.",
  },
  {
    icon: Truck,
    title: "Nationwide Logistics",
    desc: "In-house fleet and inventory network delivering on time, every time.",
  },
  {
    icon: Sparkles,
    title: "Premium Quality",
    desc: "Only authenticated brands and rigorously QA-tested supplies reach your door.",
  },
  {
    icon: Boxes,
    title: "Bulk & Custom",
    desc: "From a single quotation to recurring corporate contracts — priced to scale.",
  },
];

const groupEntities = [
  "sandhsourceinternational",
  "sandiinternational",
  "sourcingVision",
  "traders",
];

function HomePage() {
  return (
    <div className="flex flex-col">
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          {/* Was a static render of these same spheres and cubes; the canvas
              draws them live so the scene moves. */}
          <SceneCanvas variant="spheres" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/40 via-brand-dark/70 to-background" />
        </div>
        <div className="absolute inset-0 -z-10 grid-pattern opacity-15" />
        <motion.div
          className="pointer-events-none absolute -top-40 left-1/2 h-[40rem] w-[70rem] -translate-x-1/2 rounded-full bg-brand-accent/30 blur-[120px]"
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 6, repeat: Infinity }}
        />

        <div className="container-x relative py-24 md:py-36">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-4xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-accent backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-accent shadow-glow" />
              Corporate Procurement Partner
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
              Supplying the world's <span className="text-gradient">most demanding</span>{" "}
              workplaces.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl font-display text-lg font-semibold leading-snug text-white md:text-2xl">
              {BRAND.strapline}
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/70">
              End-to-end procurement solutions — built for industries, offices, and educational
              institutions.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full gradient-royal px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.04]"
              >
                Request a Quote{" "}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
              >
                Explore Catalog
              </Link>
            </div>
          </motion.div>

          {/* Floating cards */}
          <div className="pointer-events-none mt-20 hidden lg:block">
            <div className="grid grid-cols-4 gap-4">
              {[
                "Office Stationery",
                "Computer Accessories",
                "Paper Products",
                "Office Equipment",
              ].map((c, i) => (
                <motion.div
                  key={c}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="rounded-2xl glass-dark p-5"
                  style={{ transform: `translateY(${(i % 2) * 12}px)` }}
                >
                  <div className="text-[11px] uppercase tracking-widest text-brand-accent">
                    Category
                  </div>
                  <div className="mt-2 font-display text-base font-semibold text-white">{c}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative -mt-10 md:-mt-16">
        <div className="container-x">
          <div className="relative rounded-3xl border border-border bg-card p-6 shadow-elevated md:p-10">
            <div className="mx-auto grid max-w-3xl grid-cols-3 gap-4 sm:gap-6">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-display text-3xl font-bold text-gradient md:text-5xl">
                    <Counter to={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-2 text-xs font-medium uppercase tracking-wider text-muted-foreground md:text-sm">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="container-x py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          <SectionHeading
            eyebrow="Who We Are"
            title={
              <>
                Corporate supply, <span className="text-gradient">refined</span>.
              </>
            }
            desc="Source International is a full-service corporate supplier delivering stationery, office essentials, IT accessories and procurement solutions to private offices, educational institutes and companies. Precision sourcing, transparent pricing, on-time delivery."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {whyChoose.map((w, i) => (
              <motion.div
                key={w.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.08 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:shadow-elevated"
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-accent/10 transition group-hover:scale-150" />
                <div className="relative">
                  <span className="grid h-11 w-11 place-items-center rounded-xl gradient-royal text-white shadow-glow">
                    <w.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="container-x py-24 md:py-32">
        <SectionHeading
          center
          eyebrow="Industries"
          title={
            <>
              Trusted across <span className="text-gradient">every sector</span>.
            </>
          }
          desc="Purpose-built procurement for the institutions that keep economies moving."
        />
        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {industries.map((i) => (
            <div
              key={i.label}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 text-center transition hover:-translate-y-1 hover:shadow-elevated"
            >
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand/5 text-brand transition group-hover:gradient-royal group-hover:text-white">
                <i.icon className="h-6 w-6" />
              </span>
              <span className="text-sm font-semibold">{i.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* GROUP ENTITIES */}
      <section className="container-x py-12 md:py-20">
        <SectionHeading
          center
          eyebrow="Group"
          title={<>Group Entities</>}
          desc="The following entities operate under the Source International umbrella."
        />
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {groupEntities.map((g) => (
            <div
              key={g}
              className="flex items-center justify-center rounded-2xl border border-border bg-card p-4 text-center text-sm font-semibold break-words sm:p-6 sm:text-base"
            >
              {g}
            </div>
          ))}
        </div>
      </section>

      <ClientWall />

      {/* CTA */}
      <section className="container-x pb-24">
        <div className="relative overflow-hidden rounded-3xl gradient-royal p-10 shadow-elevated md:p-16">
          <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
          <motion.div
            className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand-accent/40 blur-3xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <h3 className="font-display text-3xl font-bold leading-tight text-white md:text-5xl">
                Ready to modernize your procurement?
              </h3>
              <p className="mt-4 max-w-xl text-white/85">
                Talk to our corporate desk about bulk contracts, annual supply agreements and
                recurring institutional orders. We respond within one business day.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-brand-dark shadow-glow"
              >
                Request Quote <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
