import { motion } from "framer-motion";
import { Building2 } from "lucide-react";

import { GROUP, type GroupEntity } from "../../data/company";

/**
 * The group structure, drawn as a tree that lights up from the top down.
 *
 * Two layouts rather than one that bends: below sm the entities stack against
 * a spine running down the left, and from sm they sit in a row under a
 * horizontal branch. Trying to make a single set of connectors serve both
 * means pseudo-elements that are right at exactly one width.
 *
 * The visible tree is decorative; the structure underneath is a nested list,
 * which is what a screen reader needs to hear "two entities under this parent"
 * rather than four unrelated headings.
 */

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 3)
    .map((w) => w[0]!.toUpperCase())
    .join("");
}

function Card({ entity, parent = false }: { entity: GroupEntity; parent?: boolean }) {
  return (
    <div
      className={`tree-card relative overflow-hidden rounded-2xl border text-center ${
        parent
          ? "border-transparent gradient-royal px-6 py-6 text-white shadow-elevated sm:px-10 sm:py-7"
          : "border-border bg-card px-5 py-6 shadow-elevated"
      }`}
    >
      {/* A highlight along the top edge reads as light catching a raised face. */}
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 top-0 h-px ${
          parent ? "bg-white/40" : "bg-brand/25"
        }`}
      />
      <span
        aria-hidden
        className={`mx-auto grid h-11 w-11 place-items-center rounded-xl text-[13px] font-bold tracking-wide ${
          parent ? "bg-white/15 text-white" : "bg-brand/10 text-brand dark:text-brand-accent"
        }`}
      >
        {parent ? <Building2 className="h-5 w-5" /> : initials(entity.name)}
      </span>
      <div
        className={`mt-3 font-display font-semibold leading-snug ${
          parent ? "text-lg sm:text-xl" : "text-base"
        }`}
      >
        {entity.name}
      </div>
      {entity.note && (
        <div
          className={`mt-1.5 text-xs leading-relaxed ${
            parent ? "text-white/75" : "text-muted-foreground"
          }`}
        >
          {entity.note}
        </div>
      )}
    </div>
  );
}

const rise = {
  hidden: { opacity: 0, y: -18 },
  show: { opacity: 1, y: 0 },
};

export function GroupTree() {
  const { parent, children } = GROUP;

  return (
    <motion.div
      className="tree-stage mt-12"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      // Children animate in order, so the tree assembles downward.
      transition={{ staggerChildren: 0.16 }}
    >
      <ul className="list-none">
        <li>
          <motion.div variants={rise} className="mx-auto max-w-sm">
            <Card entity={parent} parent />
          </motion.div>

          {/* Trunk */}
          <motion.div variants={rise} aria-hidden className="tree-line-v mx-auto h-10 sm:h-12" />

          {/* ---- sm and up: a branch with a drop to each entity ---- */}
          <div className="hidden sm:block">
            <motion.div variants={rise} aria-hidden className="relative mx-auto w-full max-w-3xl">
              <div
                className="tree-line-h mx-auto"
                style={{ width: `calc(100% - 100% / ${children.length})` }}
              />
              <div
                className="absolute inset-x-0 top-0 grid"
                style={{ gridTemplateColumns: `repeat(${children.length}, minmax(0, 1fr))` }}
              >
                {children.map((c) => (
                  <span key={c.name} className="flex justify-center">
                    <span className="tree-line-v h-8" />
                  </span>
                ))}
              </div>
            </motion.div>

            <ul
              className="mx-auto mt-8 grid max-w-3xl list-none gap-5"
              style={{ gridTemplateColumns: `repeat(${children.length}, minmax(0, 1fr))` }}
            >
              {children.map((c) => (
                <motion.li key={c.name} variants={rise}>
                  <Card entity={c} />
                </motion.li>
              ))}
            </ul>
          </div>

          {/* ---- below sm: a spine down the left with a stub to each ---- */}
          <ul className="relative list-none pl-8 sm:hidden">
            <span
              aria-hidden
              className="tree-line-v absolute left-[3px] top-0"
              style={{ height: "calc(100% - 2.5rem)" }}
            />
            {children.map((c) => (
              <motion.li key={c.name} variants={rise} className="relative mt-5 first:mt-0">
                <span aria-hidden className="tree-line-h absolute -left-8 top-10 w-8" />
                <Card entity={c} />
              </motion.li>
            ))}
          </ul>
        </li>
      </ul>
    </motion.div>
  );
}
