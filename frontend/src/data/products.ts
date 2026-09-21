/**
 * The stocked catalog, transcribed from the internal item list
 * (Sales Margin Item Main Type Wise, 01-Jan-2026 to 11-Jul-2026).
 *
 * Item codes and descriptions are reproduced exactly as they appear there —
 * these are the codes staff and customers quote, so they must not be tidied up.
 *
 * Deliberately NOT carried over from that report: quantity sold, sales value,
 * cost and margin. It is a public catalog; cost and margin would show every
 * customer the markup on what they are buying.
 */

export type Product = {
  id: string;
  name: string;
  category: string;
  /** Item code from the stock system. Doubles as the id — unique catalog-wide. */
  sku: string;
  /** Unit of issue: NUM (each) or BOX. */
  unit: string;
  brand?: string;
  /** Product photograph, once the supplier provides one. See assets/products. */
  image?: string;
  desc: string;
  specs: { label: string; value: string }[];
};

export const CATEGORIES = [
  "Ballpoint",
  "Carbon Paper",
  "Chalk",
  "Cutter",
  "Duplicate Book",
  "Envelop",
  "Eraser",
  "Files",
  "Fluid Pen",
  "Gum",
  "Highlighter",
  "Ink",
  "Marker",
  "Paper",
  "Pen",
  "Pen Jar",
  "Pencil",
  "Punch Machine",
  "Register",
  "Ribbon",
  "Sheet",
  "Stapler",
  "Stapler Pin",
  "Sticker",
  "Tape",
  "Tape Dispensor",
  "Tracing Paper",
  "Tray Paper",
  "Writing Pad",
] as const;

/**
 * Every photograph in assets/products, keyed by the item code its filename
 * starts with.
 *
 * Wired by code rather than one import per item: drop `<item-code>-<slug>.jpg`
 * into that folder and the matching item picks it up, with no edit here. That
 * matters because the catalog is 71 items and photography arrives in batches.
 */
const PHOTOS: Record<string, string> = Object.fromEntries(
  Object.entries(
    import.meta.glob("../assets/products/*.{jpg,jpeg,png,webp,avif}", {
      eager: true,
      import: "default",
    }) as Record<string, string>,
  ).map(([path, src]) => [path.split("/").pop()!.split("-")[0], src]),
);

/** Expands a compact row into a full record; specs carry only known values. */
const item = (sku: string, name: string, unit: string, category: string): Product => ({
  id: sku,
  name,
  category,
  sku,
  unit,
  image: PHOTOS[sku],
  desc: `Stocked ${category.toLowerCase()} item, supplied by the ${
    unit === "BOX" ? "box" : "unit"
  }. Bulk and contract pricing on request.`,
  specs: [
    { label: "Item Code", value: sku },
    { label: "Category", value: category },
    { label: "Unit", value: unit },
  ],
});

export const PRODUCTS: Product[] = [
  // Ballpoint
  item("001428", "Ballpoint Piano Yellowbody Blue", "NUM", "Ballpoint"),
  item("001933", "Ballpoint 0.8 Piano (Black)", "NUM", "Ballpoint"),
  item("002560", "Ballpoint Clipper Blue (Dollar)", "NUM", "Ballpoint"),
  item("002638", "Ballpoint Refill", "NUM", "Ballpoint"),
  item("002752", "M&G Leader Red", "NUM", "Ballpoint"),
  item("003636", "Piano Sky Blue Ball Pen", "NUM", "Ballpoint"),
  item("003640", "Dollar Jel One Blue", "NUM", "Ballpoint"),
  // Carbon Paper
  item("001512", "Carbon Paper Blue KCR", "NUM", "Carbon Paper"),
  // Chalk
  item("003495", "Omega white Chalk", "NUM", "Chalk"),
  // Cutter
  item("001814", "Paper Cutter DELI", "NUM", "Cutter"),
  // Duplicate Book
  item("002287", "Duplicate Book 9x6 Muzaffar", "NUM", "Duplicate Book"),
  // Envelop
  item("003144", "Envelop Golden 11x15", "NUM", "Envelop"),
  // Eraser
  item("001551", "Eraser Bahadur B-72", "NUM", "Eraser"),
  // Files
  item("001296", "Card File Brown", "NUM", "Files"),
  item("001509", "Ring File (Ring)", "NUM", "Files"),
  item("001514", "Box File 703 Shakir", "NUM", "Files"),
  item("003644", "Card File A-4 Bold", "NUM", "Files"),
  item("003655", "L Folder 18C Crescent", "NUM", "Files"),
  // Fluid Pen
  item("002221", "Correction Pen Kita", "NUM", "Fluid Pen"),
  // Gum
  item("003664", "Gum Stick 21 Grams First", "NUM", "Gum"),
  // Highlighter
  item("001774", "Highlighter Orange (Dollar)", "NUM", "Highlighter"),
  item("002252", "Mercury Highlighter Mix", "NUM", "Highlighter"),
  item("003626", "Highlighter KIta", "NUM", "Highlighter"),
  // Ink
  item("003658", "Ink Stamp Pad TF Blue", "NUM", "Ink"),
  // Marker
  item("001545", "On Board Dollar ( Blue)", "NUM", "Marker"),
  item("002561", "Permanent Marker Black 90 (Dollar)", "NUM", "Marker"),
  item("003570", "Tempo Marker Master", "NUM", "Marker"),
  item("003650", "Crescent Dalo Marker", "NUM", "Marker"),
  // Paper
  item("000380", "Paper Colour A4 Size Green 80g", "NUM", "Paper"),
  item("003247", "Kite Paper Stylo", "NUM", "Paper"),
  item("003265", "Paper BLC 70 Grams A-4", "NUM", "Paper"),
  item("003637", "Bata Kite Paper Sarene", "NUM", "Paper"),
  // Pen
  item("003662", "Correction Pen 3 Flower", "NUM", "Pen"),
  // Pen Jar
  item("000913", "Pen Jar", "NUM", "Pen Jar"),
  // Pencil
  item("001518", "Lead Pencil Goldfish", "NUM", "Pencil"),
  item("003006", "My Pencil Dollar", "NUM", "Pencil"),
  item("003163", "Lead Pencil Dollar 222", "NUM", "Pencil"),
  item("003375", "Lead Pencil 456 Dollar", "NUM", "Pencil"),
  item("003648", "Omegs Pencil Red", "NUM", "Pencil"),
  item("003649", "Omegs Pencil Yellow", "NUM", "Pencil"),
  // Punch Machine
  item("003665", "KW Punch Machine 9520", "NUM", "Punch Machine"),
  // Register
  item("001718", "Register #40 Thick Rizvi", "NUM", "Register"),
  item("003463", 'Pattern Sheets 40"x30 450 Grams Shoe', "NUM", "Register"),
  item("003647", "Crescent Register", "NUM", "Register"),
  item("003660", "Attendance Register 60 Pages", "NUM", "Register"),
  // Ribbon
  item("003040", "Ribbon Silver", "NUM", "Ribbon"),
  item("003041", "Ribbon Golden", "NUM", "Ribbon"),
  // Sheet
  item("003309", "Card Sheet Gatta 39x36 Shoe Planet", "NUM", "Sheet"),
  item("003550", "Straw Board File Quality", "NUM", "Sheet"),
  item("003587", "Sheets 40x52 Shoe", "NUM", "Sheet"),
  item("003657", "Sheets 75mm 24x54 SSC", "NUM", "Sheet"),
  // Stapler
  item("001216", "Stapler HD 50R (Copy)", "NUM", "Stapler"),
  item("001461", "Stapler HD-50R (Copy)", "NUM", "Stapler"),
  item("003373", "Stapler Fuji 24/6 45P", "NUM", "Stapler"),
  // Stapler Pin
  item("001044", "Stapler Pin 23/8", "NUM", "Stapler Pin"),
  item("003577", "Stapler Pin 23/17 3 Flowers", "NUM", "Stapler Pin"),
  item("003596", "Stapler Pin 24/6 Opal", "NUM", "Stapler Pin"),
  item("003634", "24/6 Stapler Pin 3 Flowers", "NUM", "Stapler Pin"),
  // Sticker
  item("003583", "Stickers Shamas Sialkot", "NUM", "Sticker"),
  // Tape
  item("001092", 'Double Tape Tissue 2" Excell', "NUM", "Tape"),
  item("002902", 'Scotch Tape 1"', "NUM", "Tape"),
  item("002994", 'Abro Tape 1"x20 Yards', "NUM", "Tape"),
  item("003372", 'Scotch tape 2"', "NUM", "Tape"),
  item("003445", 'Scotch tape 3"x60 yards vClear Excell', "NUM", "Tape"),
  item("003656", 'Scotch Tape 2"x95 Yards Shoe', "NUM", "Tape"),
  item("003659", 'Tissue Tape 2"', "NUM", "Tape"),
  // Tape Dispensor
  item("001573", 'Tape Dispensor Excell 3"', "NUM", "Tape Dispensor"),
  // Tracing Paper
  item("003642", "Tracing Paper 24x33 Shoe", "NUM", "Tracing Paper"),
  // Tray Paper
  item("001529", "Paper Tray Steel 03 Portions", "NUM", "Tray Paper"),
  // Writing Pad
  item("001436", "Writing Pad Large Fine Muzaffar", "NUM", "Writing Pad"),
  item("001501", "Writing Pad Small Fine Muzaffar", "NUM", "Writing Pad"),
];

/** Product count per category, in CATEGORIES order. */
export const CATEGORY_COUNTS: { category: string; count: number }[] = CATEGORIES.map(
  (category) => ({
    category,
    count: PRODUCTS.filter((p) => p.category === category).length,
  }),
);

/** Filters the catalog by free-text query and/or category. */
export function filterProducts(query: string, category: string | null): Product[] {
  let items = PRODUCTS;
  if (category) items = items.filter((p) => p.category === category);

  const q = query.trim().toLowerCase();
  if (q) {
    items = items.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q),
    );
  }
  return items;
}
