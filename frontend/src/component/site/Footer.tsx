import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

import worldDots from "../../assets/world-dots.svg";
import { BRAND as brand, gmailLink, whatsappLink } from "../../data/company";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-brand-dark text-white/80">
      {/* Dot-matrix world map, sized to fill the footer and crop at the
          edges. White dots at low opacity pick up the navy behind them. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.13]"
        style={{ backgroundImage: `url(${worldDots})` }}
      />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-brand-accent/20 blur-3xl" />

      <div className="container-x relative py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Logo surface="dark" showStrapline={false} />
            <p className="mt-5 max-w-md font-display text-base font-semibold leading-snug text-white/90">
              {brand.strapline}
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">
              Serving private offices, educational institutes and companies with corporate
              procurement, bulk supply and institutional logistics.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="#"
                aria-label="LinkedIn"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 transition hover:bg-white/10"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h4>
            <ul className="mt-5 text-sm">
              {[
                { to: "/about", label: "About" },
                { to: "/team", label: "Leadership" },
                { to: "/services", label: "Services" },
                { to: "/products", label: "Product Catalog" },
                { to: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="inline-flex min-h-11 items-center text-white/70 transition hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-white/70">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" /> {brand.location}
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
                <span className="flex flex-col">
                  <a
                    href={`tel:${brand.phone.replace(/[^+\d]/g, "")}`}
                    className="inline-flex min-h-11 items-center transition hover:text-white"
                  >
                    {brand.phone}
                  </a>
                  {brand.mobiles.map((number) => (
                    <a
                      key={number}
                      href={whatsappLink(number)}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Message ${number} on WhatsApp`}
                      className="group inline-flex min-h-11 items-center gap-2 transition hover:text-white"
                    >
                      {number}
                      <FaWhatsapp
                        aria-hidden
                        className="h-4 w-4 text-[#25D366] opacity-80 transition group-hover:opacity-100"
                      />
                    </a>
                  ))}
                </span>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
                <a
                  href={gmailLink("Inquiry — Source International")}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center transition hover:text-white"
                >
                  {brand.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row md:items-center">
          <span>
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </span>
          <span>Corporate Procurement · Bulk Supply · Institutional Sales</span>
        </div>
      </div>
    </footer>
  );
}
