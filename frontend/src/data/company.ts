export type Brand = {
  name: string;
  /** Short label beside the logo in the navbar and footer. */
  tagline: string;
  /** Full company strapline, shown in the hero and footer. */
  strapline: string;
  location: string;
  email: string;
  phone: string;
  fax: string;
  hours: string;
};

export type ServiceContent = {
  title: string;
  desc: string;
};

export type LeaderContent = {
  name: string;
  role: string;
  email: string;
  phone: string;
  bio: string;
  linkedin: string;
};

/** Company details shown across the site. Edit here to update every page. */
export const BRAND: Brand = {
  name: "Source International",
  tagline: "Corporate Supplier",
  // Note: "Stationery" (paper goods), not "stationary" (not moving).
  strapline: "Leading Source of Stationery, Papers, Computer & General Items",
  location: "Suite # 22, Street No. 32, Kabeer Street, Urdu Bazar, Lahore",
  email: "sandhsourceint@gmail.com",
  phone: "042 37110812",
  // No fax line — the contact page hides this card while it is empty.
  fax: "",
  hours: "Mon–Sat · 9:00 – 18:00",
};

export const SERVICES: ServiceContent[] = [
  {
    title: "Corporate Procurement",
    desc: "End-to-end procurement management for growing enterprises — vendor consolidation, catalog curation and predictable pricing.",
  },
  {
    title: "Bulk Orders",
    desc: "Volume-based pricing on high-turnover SKUs with dedicated account management.",
  },
  {
    title: "Tenders & Quotations",
    desc: "Documentation-ready responses to corporate tenders and requests for quotation.",
  },
  {
    title: "Institutional Sales",
    desc: "Long-term supply agreements for schools, colleges, training institutes and corporate campuses.",
  },
  {
    title: "Logistics & Delivery",
    desc: "In-house fleet plus regional 3PL — next-day nationwide fulfillment on stocked items.",
  },
  {
    title: "Inventory Management",
    desc: "Consignment stock, min/max reordering and just-in-time replenishment for enterprise clients.",
  },
];

export const LEADERSHIP: LeaderContent[] = [
  {
    name: "Muhammad Imran",
    role: "Managing Partner",
    email: "imran@sourceintl.com",
    phone: "+92 322 495 7590",
    bio: "Muhammad Imran leads the strategic direction, corporate partnerships and enterprise growth at Source International. Over a decade of experience in institutional procurement and B2B supply chain.",
    linkedin: "https://www.linkedin.com/in/muhammad-imran-a60075427",
  },
  {
    name: "Muhammad Nadeem",
    role: "Manager Accounts",
    email: "mnadeemshd@gmail.com",
    phone: "+92 336 403 6147",
    bio: "Muhammad Nadeem oversees financial operations, corporate account management and client billing. Known for precision, transparency and long-term client relationships.",
    linkedin: "https://www.linkedin.com/in/muhammad-nadeem-8b8529426",
  },
];
