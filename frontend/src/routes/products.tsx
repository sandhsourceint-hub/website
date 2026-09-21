import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Grid3x3, List, X, ArrowRight, Filter } from "lucide-react";
import { useMemo, useState } from "react";
import { BRAND, pageTitle } from "../data/company";
import { iconFor } from "../data/productIcons";
import { CATEGORY_COUNTS, filterProducts, type Product } from "../data/products";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: pageTitle("Products") },
      {
        name: "description",
        content:
          "Explore our corporate procurement catalog — stationery, computer accessories, paper products, office equipment and more.",
      },
      { property: "og:title", content: pageTitle("Products") },
      {
        property: "og:description",
        content: "Corporate procurement catalog across 29 stocked categories.",
      },
    ],
  }),
  component: ProductsPage,
});

/**
 * A product's photograph if it has one, otherwise its category glyph.
 *
 * The two want very different sizes: a photograph should fill its tile so the
 * product is actually legible, while a line glyph stretched that far just reads
 * as a broken placeholder. Hence a separate class for each.
 */
function ProductArt({
  p,
  photo,
  icon,
  stroke,
}: {
  p: Product;
  photo: string;
  icon: string;
  stroke: number;
}) {
  if (p.image) {
    return (
      <img
        src={p.image}
        alt={p.name}
        loading="lazy"
        decoding="async"
        className={`${photo} object-contain`}
      />
    );
  }
  const Icon = iconFor(p.category);
  return (
    <Icon
      className={`${icon} text-brand/30 transition group-hover:scale-110`}
      strokeWidth={stroke}
    />
  );
}

const PAGE_SIZE = 12;

function ProductsPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Product | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const categories = CATEGORY_COUNTS;

  // Filtering runs against the bundled catalog, so results are instant.
  const matches = useMemo(() => filterProducts(q, cat), [q, cat]);

  const total = matches.length;
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const current = matches.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  function reset(newCat: string | null) {
    setCat(newCat);
    setPage(1);
  }

  return (
    <div>
      {/* The catalog opens on the controls: search, filters and view. The page
          heading is kept for screen readers and search engines, which both
          expect an h1, but is not painted. */}
      <section className="container-x pt-10 md:pt-14">
        <h1 className="sr-only">Procurement catalog — Source International</h1>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setPage(1);
              }}
              placeholder="Search products, SKUs, brands…"
              aria-label="Search products"
              className="h-12 w-full rounded-full border border-border bg-card pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-brand"
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFiltersOpen((s) => !s)}
              className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-semibold transition hover:bg-secondary lg:hidden"
            >
              <Filter className="h-4 w-4" /> Filters
            </button>
            <div className="hidden rounded-full border border-border bg-card p-1 lg:flex">
              <button
                onClick={() => setView("grid")}
                aria-label="Grid view"
                aria-pressed={view === "grid"}
                className={`grid h-11 w-11 place-items-center rounded-full transition ${view === "grid" ? "gradient-royal text-white" : "text-muted-foreground hover:text-foreground"}`}
              >
                <Grid3x3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setView("list")}
                aria-label="List view"
                aria-pressed={view === "list"}
                className={`grid h-11 w-11 place-items-center rounded-full transition ${view === "list" ? "gradient-royal text-white" : "text-muted-foreground hover:text-foreground"}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x py-10 md:py-12">
        <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
          {/* Sidebar filters */}
          <aside className={`${filtersOpen ? "block" : "hidden"} lg:block`}>
            <div className="lg:sticky lg:top-24">
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Categories
              </div>
              <div className="mt-4 flex flex-col gap-1">
                <button
                  onClick={() => reset(null)}
                  className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition ${cat === null ? "gradient-royal text-white shadow-glow" : "hover:bg-secondary text-foreground/80"}`}
                >
                  <span>All Products</span>
                  <span
                    className={`text-xs ${cat === null ? "text-white/80" : "text-muted-foreground"}`}
                  >
                    {categories.reduce((sum, item) => sum + item.count, 0)}
                  </span>
                </button>
                {categories.map(({ category, count }) => {
                  const active = cat === category;
                  return (
                    <button
                      key={category}
                      onClick={() => reset(category)}
                      className={`flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium transition ${active ? "gradient-royal text-white shadow-glow" : "hover:bg-secondary text-foreground/80"}`}
                    >
                      <span>{category}</span>
                      <span
                        className={`text-xs ${active ? "text-white/80" : "text-muted-foreground"}`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Grid / List */}
          <div>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span>
                Showing <span className="font-semibold text-foreground">{current.length}</span> of{" "}
                <span className="font-semibold text-foreground">{total}</span> products
              </span>
              <span>
                Page {safePage} / {pageCount}
              </span>
            </div>

            {current.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border p-16 text-center text-muted-foreground">
                No products match your search.
              </div>
            ) : view === "grid" ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {current.map((p, i) => (
                  <motion.button
                    key={p.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => setSelected(p)}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-left transition hover:-translate-y-1 hover:border-brand/30 hover:shadow-elevated"
                  >
                    <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-gradient-to-br from-secondary via-background to-secondary/30">
                      <div
                        className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100"
                        style={{ background: "var(--gradient-glow)" }}
                      />
                      <ProductArt
                        p={p}
                        photo="absolute inset-0 h-full w-full p-5 transition-transform duration-300 group-hover:scale-105"
                        icon="h-20 w-20"
                        stroke={1.2}
                      />
                      <span className="absolute left-3 top-3 rounded-full bg-background/80 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand backdrop-blur">
                        {p.category.split(" ")[0]}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        {p.category} · {p.sku}
                      </div>
                      <h3 className="mt-2 font-display text-base font-semibold leading-snug line-clamp-2">
                        {p.name}
                      </h3>
                      <p className="mt-2 flex-1 text-xs text-muted-foreground line-clamp-2">
                        {p.desc}
                      </p>
                      <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                        Quick View{" "}
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {current.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelected(p)}
                    className="group flex items-center gap-5 rounded-2xl border border-border bg-card p-4 text-left transition hover:border-brand/30 hover:shadow-elevated"
                  >
                    <div className="relative grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded-xl bg-secondary">
                      <ProductArt
                        p={p}
                        photo="absolute inset-0 h-full w-full p-2"
                        icon="h-9 w-9"
                        stroke={1.2}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        {p.category} · {p.sku}
                      </div>
                      <div className="mt-1 truncate font-display font-semibold">{p.name}</div>
                      <div className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                        {p.desc}
                      </div>
                    </div>
                    <ArrowRight className="hidden h-4 w-4 shrink-0 text-brand transition group-hover:translate-x-1 md:block" />
                  </button>
                ))}
              </div>
            )}

            {pageCount > 1 && (
              <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
                {Array.from({ length: pageCount }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`h-11 min-w-11 rounded-full px-3 text-sm font-semibold transition ${safePage === i + 1 ? "gradient-royal text-white shadow-glow" : "border border-border text-foreground/70 hover:bg-secondary"}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[70] overflow-y-auto bg-brand-dark/60 p-4 backdrop-blur-sm"
          >
            <div className="flex min-h-full items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.98 }}
                onClick={(e) => e.stopPropagation()}
                className="relative grid w-full max-w-4xl gap-0 overflow-hidden rounded-3xl border border-border bg-card shadow-elevated md:max-h-[85vh] md:grid-cols-[1fr_1.1fr]"
              >
                <button
                  onClick={() => setSelected(null)}
                  className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-background/80 text-foreground backdrop-blur hover:bg-secondary"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="relative flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-secondary via-background to-secondary/40 sm:aspect-square md:aspect-auto">
                  <div
                    className="absolute inset-0"
                    style={{ background: "var(--gradient-glow)" }}
                  />
                  <ProductArt
                    p={selected}
                    photo="absolute inset-0 h-full w-full p-6 sm:p-10"
                    icon="relative h-24 w-24 sm:h-32 sm:w-32"
                    stroke={1}
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-background/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand backdrop-blur">
                    {selected.category}
                  </span>
                </div>
                <div className="overflow-y-auto p-6 sm:p-8">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
                    {selected.category}
                  </div>
                  <h3 className="mt-2 font-display text-2xl font-bold">{selected.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {selected.desc}
                  </p>

                  <div className="mt-6">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      Specifications
                    </div>
                    <table className="mt-3 w-full text-sm">
                      <tbody>
                        {selected.specs.map((s) => (
                          <tr key={s.label} className="border-b border-border last:border-0">
                            <td className="py-2.5 text-muted-foreground">{s.label}</td>
                            <td className="py-2.5 text-right font-medium">{s.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <a
                    href={`mailto:${BRAND.email}?subject=Quotation Request - ${encodeURIComponent(selected.name)} (${selected.sku})`}
                    className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full gradient-royal px-6 py-3.5 text-sm font-semibold text-white shadow-glow"
                  >
                    Corporate Inquiry <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
