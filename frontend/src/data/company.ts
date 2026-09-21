import aliMurtazaLogo from "../assets/clients/ali-murtaza.png";
import ararLogo from "../assets/clients/arar.png";
import crescentLogo from "../assets/clients/crescent-bahuman.svg";
import mjmsLogo from "../assets/clients/mjms.png";
import pfjLogo from "../assets/clients/pfj.png";
import relianceLogo from "../assets/clients/reliance.png";
import richaLogo from "../assets/clients/richa-leathers.png";
import sapphireLogo from "../assets/clients/sapphire.svg";
import shoePlanetLogo from "../assets/clients/shoe-planet.png";
import sefamLogo from "../assets/clients/sefam.png";
import shahtajLogo from "../assets/clients/shahtaj.png";
import sscLogo from "../assets/clients/ssc.svg";

export type Brand = {
  /** Short name, used as the suffix on every inner page's tab title. */
  name: string;
  /** Full company name. Stands alone as the home page's tab title. */
  fullName: string;
  /** Short label beside the logo in the navbar and footer. */
  tagline: string;
  /** Full company strapline, shown in the hero and footer. */
  strapline: string;
  location: string;
  email: string;
  /** Landline. */
  phone: string;
  /** Mobile lines, listed under the landline in the footer. */
  mobiles: string[];
  fax: string;
  hours: string;
};

/**
 * Tab title for a page: the page's own name first, so it stays readable when
 * the browser truncates a narrow tab, then the company name.
 *
 * Pass the same label the navbar uses for that page — the tab should echo what
 * the visitor just clicked. Called with no page, it returns the full company
 * name on its own; that is the home page's title, which names the company
 * rather than labelling itself "Home".
 */
export function pageTitle(page?: string): string {
  return page ? `${page} | ${BRAND.name}` : BRAND.fullName;
}

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
  fullName: "S and H Source International",
  tagline: "Corporate Supplier",
  // Note: "Stationery" (paper goods), not "stationary" (not moving).
  strapline:
    "Leading Source of Office Stationery, Industrial Supplies, All Types of Packaging Materials, Papers, Computer Accessories & General Items",
  location: "Suite # 22, Street No. 32, Kabeer Street, Urdu Bazar, Lahore",
  email: "sandhsourceint@gmail.com",
  phone: "042 37110812",
  mobiles: ["+92 322 495 7590", "+92 336 403 6147"],
  // No fax line — the contact page hides this card while it is empty.
  fax: "",
  hours: "Mon–Sat · 9:00 – 18:00",
};

/**
 * The group structure shown as a tree on the home page.
 *
 * `note` is deliberately empty: what each entity actually does is the
 * company's own description to give, not something to infer from its name.
 * Fill it in and the cards show a line underneath.
 */
export type GroupEntity = {
  name: string;
  /** Short line under the name, e.g. "Sourcing and procurement". */
  note?: string;
};

export const GROUP: { parent: GroupEntity; children: GroupEntity[] } = {
  parent: { name: "S and H Source International" },
  children: [{ name: "SNI International Sourcing" }, { name: "Vision Traders" }],
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

export type Client = {
  name: string;
  /**
   * Imported logo file, e.g. `import sapphire from "../assets/clients/sapphire.png"`.
   * Left unset until the company supplies its mark; the band then shows an
   * initials tile instead. We do not draw approximations of other companies'
   * logos — an imitation is not their logo.
   */
  logo?: string;
  /**
   * The company's own site. Cards with a URL link out; cards without render as
   * plain tiles. Only ever set this to a URL the client has confirmed — linking
   * a client card at the wrong company is worse than not linking at all.
   */
  url?: string;
  /**
   * Caps the rendered width, in px. Only needed for low-resolution rasters:
   * some companies publish a logo barely larger than a favicon, and stretching
   * one to fill the card looks worse than letting it sit small and sharp.
   */
  logoMaxWidth?: number;
  /**
   * Backing colour for a reversed logo — one drawn in white for a dark header,
   * which would otherwise vanish against the white card. Use a colour taken
   * from the company's own site, not an invented one.
   */
  logoBg?: string;
};

/** Organizations shown in the "Trusted by leading organizations" band. */
export const CLIENTS: Client[] = [
  { name: "MJMS", logo: mjmsLogo, url: "https://www.mjms.pk/" },
  { name: "SSC Manufacturing", logo: sscLogo, url: "https://www.sscbrands.com/" },
  { name: "Designtex" },
  { name: "Hussain Manufacturing" },
  // shoeplanet.pk publishes its wordmark at 110x33 and serves that same file
  // for every size requested, so it is shown at native width.
  {
    name: "Shoe Planet",
    logo: shoePlanetLogo,
    url: "https://www.shoeplanet.pk/",
    logoMaxWidth: 110,
  },
  // Every logo variant Sapphire publishes is white-on-transparent, meant for a
  // dark header, so it sits on a chip in their own navy (#104474, taken from
  // their site) rather than disappearing into the card.
  {
    name: "Sapphire Textile Mills",
    logo: sapphireLogo,
    url: "https://www.sapphiretextiles.com.pk/",
    logoBg: "#104474",
  },
  { name: "Pakistan Fruit Juice", logo: pfjLogo, url: "https://pfj.com.pk/" },
  { name: "East Gate Industries" },
  { name: "Arar Innovations", logo: ararLogo, url: "https://theararinnovations.com/" },
  {
    name: "Reliance Weaving Mills",
    logo: relianceLogo,
    url: "https://www.relianceweavingmills.com/",
  },
  // Artwork supplied by us. Note it is the same mark used by Richa (richa.eu),
  // a Belgian motorcycle-apparel brand; no link between the two companies has
  // been confirmed. Swap in Richa Leathers' own logo if they provide one.
  // The link is an Enic.PK directory listing — no domain of theirs resolves.
  {
    name: "Richa Leathers",
    logo: richaLogo,
    url: "https://richaleathers.enic.pk/",
  },
  {
    name: "Crescent Bahuman",
    logo: crescentLogo,
    url: "https://crescentbahuman.com/",
  },
  { name: "Shahtaj Textile", logo: shahtajLogo, url: "https://www.shahtaj.com/" },
  {
    name: "Ali Murtaza Associates",
    logo: aliMurtazaLogo,
    url: "https://www.alimurtaza.com/",
  },
  { name: "Sefam", logo: sefamLogo, url: "https://sefam.com/" },
];

export const LEADERSHIP: LeaderContent[] = [
  {
    name: "Muhammad Imran",
    role: "Managing Partner",
    email: "imran@sourceintl.com",
    phone: "+92 322 495 7590",
    bio: "Muhammad Imran is Managing Partner with 20 years' experience in marketing and sourcing. He leads strategic direction, corporate partnerships and enterprise growth at Source International.",
    linkedin: "https://www.linkedin.com/in/muhammad-imran-a60075427",
  },
  {
    name: "Shamaila Shafeeq",
    role: "Sourcing Head",
    email: "shaumaila@sourceintl.com",
    phone: "+92 300 000 0000",
    bio: "Shamaila Shafeeq is Sourcing Head, focusing on supplier engagement, strategic sourcing and procurement coordination.",
    linkedin: "",
  },
  {
    name: "Muhammad Nadeem",
    role: "Marketing Head",
    email: "mnadeemshd@gmail.com",
    phone: "+92 336 403 6147",
    bio: "Muhammad Nadeem leads marketing and client engagement, overseeing campaigns, brand communications and account strategies.",
    linkedin: "https://www.linkedin.com/in/muhammad-nadeem-8b8529426",
  },
];
