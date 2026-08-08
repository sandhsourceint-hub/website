import { motion } from "framer-motion";

export function AnimatedBackground({ variant = "light" }: { variant?: "light" | "dark" }) {
  const dark = variant === "dark";
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className={`absolute inset-0 grid-pattern ${dark ? "opacity-20" : "opacity-40"}`} />
      <motion.div
        className="absolute -top-32 -left-20 h-[28rem] w-[28rem] rounded-full bg-brand-accent/25 blur-3xl"
        animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-40 right-0 h-[26rem] w-[26rem] rounded-full bg-brand/30 blur-3xl"
        animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-[22rem] w-[22rem] rounded-full bg-brand-2/25 blur-3xl"
        animate={{ x: [0, 20, 0], y: [0, -30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  desc,
  center,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  desc?: string;
  center?: boolean;
}) {
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-3xl`}>
      {eyebrow && (
        <div
          className={`inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand`}
        >
          <span className="h-1.5 w-1.5 rounded-full gradient-royal" /> {eyebrow}
        </div>
      )}
      <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
        {title}
      </h2>
      {desc && (
        <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">{desc}</p>
      )}
    </div>
  );
}
