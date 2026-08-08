export type Product = {
  id: string;
  name: string;
  category: string;
  sku: string;
  brand?: string;
  desc: string;
  specs: { label: string; value: string }[];
};

export const CATEGORIES = [
  "Office Stationery",
  "Computer Accessories",
  "Printer Supplies",
  "Paper Products",
  "School Supplies",
  "Office Equipment",
  "Cleaning Supplies",
  "Packaging Materials",
  "Office Furniture",
] as const;

/**
 * Expands compact seed rows into full product records.
 * The SKU doubles as the product id — it is unique across the whole catalog.
 */
const gen = (rows: [string, string, string, string?][], category: string): Product[] =>
  rows.map(([name, sku, desc, brand]) => ({
    id: sku,
    name,
    category,
    sku,
    brand,
    desc,
    specs: [
      { label: "SKU", value: sku },
      { label: "Category", value: category },
      { label: "Brand", value: brand ?? "Assorted" },
      { label: "MOQ", value: "50 units" },
      { label: "Lead Time", value: "3–7 days" },
      { label: "Packaging", value: "Bulk carton" },
    ],
  }));

export const PRODUCTS: Product[] = [
  ...gen(
    [
      [
        "Executive Ballpoint Pen (Box of 50)",
        "STA-001",
        "Smooth-writing blue-ink ballpoint pens for daily office use.",
        "Uniball",
      ],
      [
        "Gel Ink Rollerball Pens",
        "STA-002",
        "0.5mm fine-tip gel pens, quick-dry ink, pack of 12.",
        "Pilot",
      ],
      [
        "Highlighter Set — 6 Colors",
        "STA-003",
        "Chisel-tip fluorescent highlighters, water-based ink.",
        "Stabilo",
      ],
      [
        "Whiteboard Markers (Pack of 10)",
        "STA-004",
        "Low-odour dry-erase markers, refillable barrels.",
        "Faber-Castell",
      ],
      [
        "Permanent Markers Black",
        "STA-005",
        "Fast-drying, waterproof marker for all surfaces.",
        "Sharpie",
      ],
      [
        "Stapler Heavy-Duty 40 Sheet",
        "STA-006",
        "Full-strip metal stapler with jam-free mechanism.",
        "Kangaro",
      ],
      [
        "Staple Pins No. 24/6 (Box)",
        "STA-007",
        "Standard chisel-point staples, 5000 per box.",
        "Kangaro",
      ],
      ["Paper Clips 33mm — Jar 500", "STA-008", "Nickel-plated smooth-edge clips.", "Deli"],
      [
        "Binder Clips Assorted",
        "STA-009",
        "Assorted sizes 15/19/25/32/41/51mm, 60pc pack.",
        "Deli",
      ],
      [
        "Correction Fluid & Tape Set",
        "STA-010",
        "Fast-dry correction fluid + roller tape combo.",
        "Tipp-Ex",
      ],
      ['Scissors Titanium 8"', "STA-011", "Ergonomic soft-grip office scissors.", "Fiskars"],
      [
        "Desk Organiser Mesh 6-Compartment",
        "STA-012",
        "Powder-coated steel mesh, compact footprint.",
        "Deli",
      ],
    ],
    "Office Stationery",
  ),
  ...gen(
    [
      [
        "Wireless Optical Mouse",
        "CMP-001",
        "2.4GHz USB receiver, 1600 DPI, ambidextrous grip.",
        "Logitech",
      ],
      [
        "Wired Membrane Keyboard",
        "CMP-002",
        "Full-size keyboard with numeric keypad, spill resistant.",
        "Logitech",
      ],
      ["USB-C Docking Station 8-in-1", "CMP-003", "HDMI 4K, RJ45, PD 100W passthrough.", "Anker"],
      ["HDMI Cable 2m", "CMP-004", "4K@60Hz certified high-speed HDMI 2.0.", "Belkin"],
      [
        "USB 3.0 Flash Drive 64GB",
        "CMP-005",
        "High-speed portable storage with capless slider.",
        "SanDisk",
      ],
      ["External SSD 1TB", "CMP-006", "USB-C 3.2 Gen2, up to 1050 MB/s.", "Samsung"],
      [
        "Laptop Stand Aluminum",
        "CMP-007",
        'Ergonomic adjustable stand for 11–17" laptops.',
        "Rain Design",
      ],
      ["Webcam 1080p", "CMP-008", "Full HD with dual mics and privacy shutter.", "Logitech"],
      [
        "Surge Protector 6-Outlet",
        "CMP-009",
        "2100 joules, universal sockets, LED indicator.",
        "APC",
      ],
      ["Ethernet Cable Cat6 5m", "CMP-010", "Snagless RJ45 gigabit patch cable.", "Belkin"],
    ],
    "Computer Accessories",
  ),
  ...gen(
    [
      [
        "HP LaserJet Toner Cartridge 26A",
        "PRN-001",
        "Genuine black toner, 3100 pages yield.",
        "HP",
      ],
      ["Canon Ink Cartridge PG-745XL", "PRN-002", "High-yield black pigment ink.", "Canon"],
      ["Epson Ink Bottle 003 Black", "PRN-003", "Original EcoTank ink, 65ml.", "Epson"],
      ["Brother Drum Unit DR-2455", "PRN-004", "12000 page drum for HL-L2350DW series.", "Brother"],
      ["Xerox Toner 106R", "PRN-005", "Standard capacity black toner cartridge.", "Xerox"],
      [
        "Ribbon Cartridge for Dot Matrix",
        "PRN-006",
        "Compatible with Epson LX-310 / LQ-310.",
        "Epson",
      ],
    ],
    "Printer Supplies",
  ),
  ...gen(
    [
      [
        "A4 Copier Paper 80gsm — 500 Sheets",
        "PAP-001",
        "Bright white 80gsm multi-purpose paper.",
        "Double A",
      ],
      [
        "A4 Premium Paper 100gsm",
        "PAP-002",
        "High-brightness paper for presentations.",
        "Navigator",
      ],
      ["A3 Copier Paper 80gsm", "PAP-003", "Large format multi-purpose paper.", "Double A"],
      [
        "Legal Size Paper 75gsm",
        "PAP-004",
        "Compatible with all major printers/copiers.",
        "PaperOne",
      ],
      [
        'Sticky Notes 3x3" (Pack of 12)',
        "PAP-005",
        "Repositionable yellow adhesive notes.",
        "Post-it",
      ],
      ["Notebook A5 Hardcover", "PAP-006", "80gsm ruled pages, elastic closure.", "Moleskine"],
      [
        "Legal Pad Yellow (Pack 12)",
        "PAP-007",
        "Ruled yellow legal pads, 50 sheets each.",
        "Amazon Basics",
      ],
      ["Manila File Folders (Pack 100)", "PAP-008", "Letter size, 1/3-cut tabs.", "Smead"],
      ["Envelopes DL White (Box 500)", "PAP-009", "Self-seal window envelopes.", "Tudor"],
    ],
    "Paper Products",
  ),
  ...gen(
    [
      [
        "Student Backpack 25L",
        "SCH-001",
        "Water-resistant polyester, laptop compartment.",
        "Herschel",
      ],
      [
        "Geometry Box Complete Set",
        "SCH-002",
        "Metal compass, rulers, protractor, set squares.",
        "Camlin",
      ],
      [
        "Coloured Pencils (24 Set)",
        "SCH-003",
        "Blendable pigment cores, pre-sharpened.",
        "Faber-Castell",
      ],
      ["Watercolor Set 12 Cakes", "SCH-004", "Vibrant washable watercolours with brush.", "Camlin"],
      [
        "Wooden HB Pencils (Box 144)",
        "SCH-005",
        "Break-resistant graphite, hexagonal body.",
        "Staedtler",
      ],
      ["Wax Crayons 24 Colors", "SCH-006", "Smooth-glide non-toxic crayons.", "Crayola"],
      ["Student Scientific Calculator", "SCH-007", "240 functions, dual-power.", "Casio"],
    ],
    "School Supplies",
  ),
  ...gen(
    [
      [
        "A3 Multifunction Laser Printer",
        "EQP-001",
        "Print/copy/scan/fax, 40ppm, network ready.",
        "HP",
      ],
      ["Paper Shredder Cross-Cut 12-Sheet", "EQP-002", "P-4 security level, 20L bin.", "Fellowes"],
      [
        'Digital Whiteboard 65"',
        "EQP-003",
        "4K touch interactive display for meeting rooms.",
        "Samsung",
      ],
      [
        "Projector Full HD 4000 Lumens",
        "EQP-004",
        "Business projector with HDMI/USB inputs.",
        "Epson",
      ],
      ["Laminator A3 Hot/Cold", "EQP-005", "4-roller laminator, 250 micron capacity.", "GBC"],
      ["Coin/Note Counter", "EQP-006", "UV/MG counterfeit detection, 1000 notes/min.", "Kores"],
      ["Time Attendance Machine", "EQP-007", "Biometric + RFID, cloud sync.", "ZKTeco"],
    ],
    "Office Equipment",
  ),
  ...gen(
    [
      [
        "Multi-Surface Disinfectant 5L",
        "CLN-001",
        "Hospital-grade cleaner, fresh scent.",
        "Dettol",
      ],
      [
        "Hand Sanitizer Gel 500ml (Pack 12)",
        "CLN-002",
        "70% alcohol, moisturising formula.",
        "Purell",
      ],
      ["Microfiber Cloths (Pack 24)", "CLN-003", "Lint-free, machine-washable.", "Scotch-Brite"],
      ["Floor Mop with Bucket", "CLN-004", "Spin mop system with 2 microfiber heads.", "Vileda"],
      ["Trash Bags 60L (Roll 100)", "CLN-005", "Heavy-duty black bin liners.", "Glad"],
      [
        "Toilet Paper 2-Ply (Case 48)",
        "CLN-006",
        "Ultra-soft commercial grade tissue rolls.",
        "Kleenex",
      ],
      [
        "Facial Tissue Box (Pack 24)",
        "CLN-007",
        "3-ply premium tissues, 100 sheets each.",
        "Rose Petal",
      ],
      [
        "Air Freshener Automatic Dispenser",
        "CLN-008",
        "Programmable, 3000 spray refill.",
        "Airwick",
      ],
    ],
    "Cleaning Supplies",
  ),
  ...gen(
    [
      [
        "Corrugated Shipping Boxes M (Pack 25)",
        "PKG-001",
        "Double-wall 5-ply, 40x30x25cm.",
        "Uline",
      ],
      [
        "Bubble Wrap Roll 500mm x 50m",
        "PKG-002",
        "Small bubble anti-static packaging.",
        "Sealed Air",
      ],
      ["Packing Tape Clear 48mm (Pack 6)", "PKG-003", "Heavy-duty acrylic adhesive tape.", "3M"],
      ["Stretch Film Wrap 500mm", "PKG-004", "17 micron pallet wrap, 300m roll.", "Signode"],
      ["Kraft Paper Roll 900mm", "PKG-005", "Recyclable void-fill packaging paper.", "Ranpak"],
      [
        "Padded Mailer Envelopes A4 (Pack 50)",
        "PKG-006",
        "Bubble-lined tear-resistant mailers.",
        "Jiffy",
      ],
    ],
    "Packaging Materials",
  ),
  ...gen(
    [
      [
        "Executive Office Chair — Mesh Back",
        "FUR-001",
        "Ergonomic lumbar support, adjustable arms.",
        "Herman Miller",
      ],
      [
        "Height-Adjustable Standing Desk",
        "FUR-002",
        "Electric dual-motor, 120x60cm, memory presets.",
        "Flexispot",
      ],
      [
        "Steel Filing Cabinet 4-Drawer",
        "FUR-003",
        "Anti-tilt, central locking, letter/legal.",
        "Godrej",
      ],
      [
        "Conference Table 10-Seater",
        "FUR-004",
        "Solid wood veneer with cable management.",
        "Steelcase",
      ],
      ["Visitor Chair Faux Leather (Pair)", "FUR-005", "Chrome frame, stackable design.", "IKEA"],
      [
        "Bookshelf 5-Tier Steel",
        "FUR-006",
        "Powder-coated, 900mm wide, load 40kg/shelf.",
        "Godrej",
      ],
      ["Reception Sofa 3-Seater", "FUR-007", "Premium leatherette with steel legs.", "Boss"],
    ],
    "Office Furniture",
  ),
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
