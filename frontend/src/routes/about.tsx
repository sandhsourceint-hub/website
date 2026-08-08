import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Target, Eye, Heart, Award, Users, Globe2 } from "lucide-react";
import warehouseImg from "../assets/about-warehouse.jpg";
import { AnimatedBackground, SectionHeading } from "../component/site/AnimatedBackground";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Source International" },
      {
        name: "description",
        content:
          "Learn about Source International — our story, mission, values and corporate journey as a trusted procurement partner.",
      },
      { property: "og:title", content: "About Source International" },
      {
        property: "og:description",
        content: "Our story, mission and values as a trusted corporate supplier.",
      },
    ],
  }),
  component: AboutPage,
});

const values = [
  {
    icon: Target,
    title: "Mission",
    text: "To be the most reliable corporate supply partner — powering the workplaces that power economies.",
  },
  {
    icon: Eye,
    title: "Vision",
    text: "A future where procurement is transparent, efficient and effortless for every institution we serve.",
  },
  {
    icon: Heart,
    title: "Values",
    text: "Integrity, precision, service and long-term partnership over transactional wins.",
  },
];

const timeline = [
  {
    year: "2011",
    title: "Founded",
    text: "Source International established with a focus on institutional stationery supply.",
  },
  {
    year: "2014",
    title: "Corporate Expansion",
    text: "Onboarded first Fortune-scale corporate accounts and multi-branch networks.",
  },
  {
    year: "2017",
    title: "Category Growth",
    text: "Expanded into computer accessories, paper products and office equipment.",
  },
  {
    year: "2020",
    title: "Institutional Contracts",
    text: "Awarded annual supply agreements with private educational institutes and corporate groups.",
  },
  {
    year: "2023",
    title: "Nationwide Logistics",
    text: "In-house fleet + regional warehousing enabled next-day nationwide delivery.",
  },
  {
    year: "2025",
    title: "Digital Procurement",
    text: "Launched enterprise procurement portal for recurring corporate clients.",
  },
];

const achievements = [
  {
    icon: Award,
    k: "Certified Partner",
    v: "Authorized channel for global stationery & IT accessory brands.",
  },
  {
    icon: Users,
    k: "100+ Clients",
    v: "Private offices, education, institutes, manufacturing and retail served.",
  },
  {
    icon: Globe2,
    k: "Nationwide",
    v: "Deliveries fulfilled across every major city in the region.",
  },
];

function AboutPage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-brand-dark py-24 text-white md:py-32">
        <AnimatedBackground variant="dark" />
        <div className="container-x relative">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-accent">
              About Us
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] md:text-6xl">
              Built on <span className="text-gradient">trust</span>. <br /> Scaled with precision.
            </h1>
            <p className="mt-6 max-w-2xl text-white/80">
              Source International is a corporate supplier and distributor specializing in
              stationery, office essentials, IT accessories and procurement solutions. We serve the
              institutions that keep the region moving — quietly, precisely, on-time.
            </p>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="container-x py-24 md:py-32">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div className="relative overflow-hidden rounded-3xl shadow-elevated">
            <img
              src={warehouseImg}
              alt="Warehouse"
              loading="lazy"
              width={1600}
              height={1024}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-dark/40 to-transparent" />
          </div>
          <div>
            <SectionHeading
              eyebrow="Our Story"
              title={
                <>
                  Precision procurement for{" "}
                  <span className="text-gradient">demanding institutions</span>.
                </>
              }
              desc="What began as a focused stationery supplier grew — deliberately — into a full corporate procurement partner. Today, our teams support bulk contracts, annual supply agreements, recurring institutional orders and IT accessory fulfillment for private offices, institutes and companies."
            />
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { k: "14+", v: "Years supplying" },
                { k: "9", v: "Product categories" },
                { k: "100+", v: "Active clients" },
                { k: "10k+", v: "SKUs available" },
              ].map((s) => (
                <div key={s.v} className="rounded-2xl border border-border bg-card p-5">
                  <div className="font-display text-2xl font-bold text-gradient">{s.k}</div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                    {s.v}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-secondary/40 py-24 md:py-32">
        <div className="container-x">
          <SectionHeading
            center
            eyebrow="Foundations"
            title={
              <>
                Mission, vision & <span className="text-gradient">values</span>.
              </>
            }
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1 }}
                className="rounded-3xl border border-border bg-card p-8 shadow-elevated"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl gradient-royal text-white shadow-glow">
                  <v.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="container-x py-24 md:py-32">
        <SectionHeading
          center
          eyebrow="Growth Journey"
          title={
            <>
              Our <span className="text-gradient">timeline</span>.
            </>
          }
        />
        <div className="relative mx-auto mt-16 max-w-3xl">
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-brand-accent via-brand-2 to-transparent md:left-1/2" />
          <div className="space-y-10">
            {timeline.map((t, i) => (
              <motion.div
                key={t.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: 0.05 * i }}
                className={`relative grid gap-4 md:grid-cols-2 ${i % 2 === 0 ? "" : "md:[&>*:first-child]:col-start-2"}`}
              >
                <div
                  className={`ml-12 md:ml-0 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}
                >
                  <div className="font-display text-3xl font-bold text-gradient">{t.year}</div>
                  <h4 className="mt-1 font-display text-lg font-semibold">{t.title}</h4>
                  <p className="mt-2 text-sm text-muted-foreground">{t.text}</p>
                </div>
                <span className="absolute left-4 top-2 grid h-3 w-3 -translate-x-1/2 place-items-center rounded-full gradient-royal shadow-glow md:left-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section className="container-x pb-24">
        <div className="grid gap-4 md:grid-cols-3">
          {achievements.map((a) => (
            <div key={a.k} className="rounded-2xl border border-border bg-card p-6">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand/5 text-brand">
                <a.icon className="h-5 w-5" />
              </span>
              <h4 className="mt-4 font-display text-base font-semibold">{a.k}</h4>
              <p className="mt-2 text-sm text-muted-foreground">{a.v}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
