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
  Star,
  Quote,
} from "lucide-react";
import heroBg from "../assets/hero-bg.jpg";
import { AnimatedBackground, SectionHeading } from "../component/site/AnimatedBackground";
import { Counter } from "../component/site/Counter";
import { BRAND } from "../data/company";
import { CATEGORY_COUNTS } from "../data/products";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const stats = [
  { value: 14, suffix: "+", label: "Years of Experience" },
  { value: 100, suffix: "+", label: "Corporate Clients" },
  { value: 10000, suffix: "+", label: "Products Delivered" },
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

const partners = [
  "ACME",
  "NEXUS",
  "ORION",
  "MERIDIAN",
  "ATLAS",
  "VERTEX",
  "HALCYON",
  "AURORA",
  "CIPHER",
  "PINNACLE",
];

const testimonials = [
  {
    quote:
      "Reliable, on-time and priced right — Source International is our go-to procurement partner across every branch office.",
    author: "Procurement Director",
    company: "Private Corporate Group",
  },
  {
    quote:
      "From office stationery to enterprise IT accessories, they simply deliver. Zero back-and-forth.",
    author: "Facilities Manager",
    company: "Global Bank",
  },
  {
    quote: "Their bulk education supply program powers 40 of our campuses. World-class service.",
    author: "Operations Head",
    company: "Education Group",
  },
];

function HomePage() {
  return (
    <div className="flex flex-col">
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroBg}
            alt=""
            className="h-full w-full object-cover opacity-90"
            width={1920}
            height={1280}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/70 via-brand-dark/85 to-background" />
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
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-7xl">
              Supplying the world's <span className="text-gradient">most demanding</span>{" "}
              workplaces.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl font-display text-lg font-semibold leading-snug text-white md:text-2xl">
              {BRAND.strapline}
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/70">
              End-to-end procurement solutions — built for private offices, educational institutes
              and companies.
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
          <div className="pointer-events-none mt-20 hidden md:block">
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
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
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
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 md:items-center">
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

      {/* PRODUCT CATEGORIES */}
      <section className="relative overflow-hidden bg-secondary/40 py-24 md:py-32">
        <AnimatedBackground />
        <div className="container-x relative">
          <SectionHeading
            center
            eyebrow="Product Universe"
            title={
              <>
                Everything your <span className="text-gradient">workplace</span> needs.
              </>
            }
            desc="Nine deeply curated categories — thousands of authenticated SKUs. From daily consumables to specialty procurement."
          />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORY_COUNTS.map(({ category, count }, i) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: (i % 3) * 0.08 }}
              >
                <Link
                  to="/products"
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-brand/30 hover:shadow-elevated"
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100"
                    style={{ background: "var(--gradient-glow)" }}
                  />
                  <div className="relative">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
                      Category {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="mt-3 font-display text-xl font-semibold">{category}</h3>
                    <div className="mt-2 text-sm text-muted-foreground">{count} products</div>
                  </div>
                  <div className="relative mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                    Browse{" "}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
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

      {/* PARTNERS */}
      <section className="relative overflow-hidden border-y border-border bg-card py-14">
        <div className="container-x mb-6 text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          Trusted by leading organizations
        </div>
        <div className="relative overflow-hidden">
          <div className="flex w-max animate-marquee gap-16 px-8">
            {[...partners, ...partners].map((p, i) => (
              <span
                key={i}
                className="font-display text-2xl font-bold tracking-widest text-muted-foreground/60"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container-x py-24 md:py-32">
        <SectionHeading
          center
          eyebrow="Client Voices"
          title={
            <>
              What partners <span className="text-gradient">say</span>.
            </>
          }
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.1 }}
              className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-elevated"
            >
              <Quote className="absolute -right-2 -top-2 h-24 w-24 text-brand/5" />
              <div className="flex gap-1 text-brand-accent">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-5 text-[15px] leading-relaxed text-foreground/90">"{t.quote}"</p>
              <div className="mt-6 border-t border-border pt-4">
                <div className="font-semibold text-sm">{t.author}</div>
                <div className="text-xs text-muted-foreground">{t.company}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-x pb-24">
        <div className="relative overflow-hidden rounded-3xl gradient-royal p-10 shadow-elevated md:p-16">
          <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
          <motion.div
            className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand-accent/40 blur-3xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <div className="relative grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
            <div>
              <h3 className="font-display text-3xl font-bold leading-tight text-white md:text-5xl">
                Ready to modernize your procurement?
              </h3>
              <p className="mt-4 max-w-xl text-white/85">
                Talk to our corporate desk about bulk contracts, annual supply agreements and
                recurring institutional orders. We respond within one business day.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
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
