import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Mail, Phone, Linkedin } from "lucide-react";
import imranImg from "../assets/team-imran.png";
import nadeemImg from "../assets/team-nadeem.jpeg";
import shamailaImg from "../assets/team-shamaila.png";
import { SectionHeading } from "../component/site/AnimatedBackground";
import { StaticBackdrop } from "../component/site/StaticBackdrop";
import { LEADERSHIP, pageTitle } from "../data/company";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: pageTitle("Team") },
      {
        name: "description",
        content:
          "Meet the leadership team behind Source International — Muhammad Imran, Managing Partner, Shamaila Shafeeq, Sourcing Head, and Muhammad Nadeem, Marketing Head.",
      },
      { property: "og:title", content: "Leadership Team — Source International" },
      {
        property: "og:description",
        content: "Meet the leadership team behind Source International.",
      },
    ],
  }),
  component: TeamPage,
});

// Portraits are bundled assets; the rest of each profile comes from data/company.ts.
//
// Every source photo is taller than the card's 4:5 frame, so `object-cover`
// crops them vertically. `position` sets where that crop is anchored — without
// it the default (centre) cuts through the subject's face. Tuned per photo
// because the shots are framed differently: Imran's is 3/4-length (804x1280),
// Shamaila's is a 3:4 half-length shot (960x1280) that only loses a sliver
// top and bottom, and Nadeem's is head-and-shoulders (1023x1537).
const TEAM_PHOTOS: Record<string, { src: string; position: string }> = {
  "Muhammad Imran": { src: imranImg, position: "50% 20%" },
  "Shamaila Shafeeq": { src: shamailaImg, position: "50% 25%" },
  "Muhammad Nadeem": { src: nadeemImg, position: "50% 25%" },
};

function TeamPage() {
  const team = LEADERSHIP.map((m) => ({
    ...m,
    img: TEAM_PHOTOS[m.name]?.src,
    imgPosition: TEAM_PHOTOS[m.name]?.position ?? "50% 25%",
  }));

  return (
    <div>
      <section className="relative overflow-hidden bg-brand-dark py-24 text-white md:py-32">
        <StaticBackdrop />
        <div className="container-x relative">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-accent">
              Leadership
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] md:text-6xl">
              The people behind <span className="text-gradient">Source International</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-white/80">
              A focused leadership team combining decades of procurement, finance and operations
              experience.
            </p>
          </div>
        </div>
      </section>

      <section className="container-x py-24 md:py-32">
        <SectionHeading
          center
          eyebrow="Executive Team"
          title={
            <>
              Meet the <span className="text-gradient">leadership</span>.
            </>
          }
        />
        <div className="mx-auto mt-14 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m, i) => (
            <motion.article
              key={m.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card shadow-elevated transition hover:-translate-y-1"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                <img
                  src={m.img}
                  alt={m.name}
                  loading="lazy"
                  width={768}
                  height={960}
                  style={{ objectPosition: m.imgPosition }}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-brand-dark/80 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-accent">
                    {m.role}
                  </div>
                  <h3 className="mt-1 font-display text-2xl font-bold">{m.name}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm leading-relaxed text-muted-foreground">{m.bio}</p>
                <div className="mt-6 grid gap-2 text-sm">
                  <a
                    href={`mailto:${m.email}`}
                    className="flex min-h-11 items-center gap-2 text-foreground/80 hover:text-brand"
                  >
                    <Mail className="h-4 w-4 shrink-0" /> {m.email}
                  </a>
                  <a
                    href={`tel:${m.phone.replace(/\s/g, "")}`}
                    className="flex min-h-11 items-center gap-2 text-foreground/80 hover:text-brand"
                  >
                    <Phone className="h-4 w-4 shrink-0" /> {m.phone}
                  </a>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <a
                    href={m.linkedin}
                    target={m.linkedin.startsWith("http") ? "_blank" : undefined}
                    rel={m.linkedin.startsWith("http") ? "noreferrer" : undefined}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full gradient-royal px-4 py-2.5 text-xs font-semibold text-white shadow-glow"
                  >
                    <Linkedin className="h-3.5 w-3.5" /> LinkedIn
                  </a>
                  <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
                    Source International
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}
