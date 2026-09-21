import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";

import { CLIENTS, type Client } from "../../data/company";
import { SectionHeading } from "./AnimatedBackground";

/**
 * The client wall: one card per organization, each pairing its mark with its
 * name, linking out to the company where we have a URL.
 *
 * This replaced a scrolling marquee. Cards that link somewhere have to hold
 * still — a target sliding past is hard to hit and worse on a phone.
 *
 * The cards stay light in dark mode. Client artwork is drawn for light grounds:
 * four of these files carry a white plate, and several marks are dark ink on
 * transparency, so a dark card would show white rectangles beside logos that
 * had vanished. The classes here use tokens that do not flip with the theme.
 *
 * The 3D is pointer-driven: the card tilts toward the cursor and a highlight
 * tracks it. Both are written straight to the element's style rather than
 * through React state, so a pointer move does not re-render the tree. Tilt is
 * skipped entirely for coarse pointers (no hover to speak of) and for anyone
 * who has asked for reduced motion.
 */

const MAX_TILT = 9; // degrees

/** "Sapphire Textile Mills" -> "ST"; "Designtex" -> "DE". */
function initials(name: string) {
  const words = name.split(/\s+/).filter(Boolean);
  const raw = words.length === 1 ? words[0].slice(0, 2) : words[0][0] + words[1][0];
  return raw.toUpperCase();
}

function CardFace({ client }: { client: Client }) {
  return (
    <>
      {/* Highlight follows the cursor; --mx/--my are set on the card. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(240px circle at var(--mx,50%) var(--my,50%), color-mix(in oklab, var(--brand-ink) 8%, transparent), transparent 72%)",
        }}
      />
      {/* Lifted off the card face so the tilt reads as depth rather than a
          flat picture being rotated. */}
      <div
        className="relative flex flex-col items-center"
        style={{ transform: "translateZ(22px)" }}
      >
        <div className="flex h-12 w-full items-center justify-center">
          {client.logo ? (
            // Wordmarks run 3:1 to 5:1, so fix the height and let width follow.
            // A reversed logo gets a chip in its own brand colour to sit on,
            // otherwise white artwork disappears into the white card.
            <span
              className={
                client.logoBg ? "flex items-center justify-center rounded-lg px-3 py-2" : "contents"
              }
              style={client.logoBg ? { background: client.logoBg } : undefined}
            >
              <img
                src={client.logo}
                alt=""
                loading="lazy"
                className={`w-auto max-w-[150px] object-contain ${
                  client.logoBg ? "max-h-8" : "max-h-12"
                }`}
                style={client.logoMaxWidth ? { maxWidth: client.logoMaxWidth } : undefined}
              />
            </span>
          ) : (
            <span
              aria-hidden
              className="grid h-12 w-12 place-items-center rounded-xl border border-brand-ink/15 bg-brand-ink/[0.05] text-sm font-bold tracking-wide text-brand-ink/70"
            >
              {initials(client.name)}
            </span>
          )}
        </div>
        <div className="mt-4 font-display text-sm font-semibold leading-snug text-brand-ink">
          {client.name}
        </div>
        {client.url && (
          <span
            aria-hidden
            className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-brand-ink/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            Visit site <ArrowUpRight className="h-3 w-3" />
          </span>
        )}
      </div>
    </>
  );
}

function ClientCard({ client }: { client: Client }) {
  const ref = useRef<HTMLDivElement | HTMLAnchorElement | null>(null);
  const tiltable = useRef(false);

  useEffect(() => {
    tiltable.current =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  function onMove(e: ReactPointerEvent<HTMLElement>) {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
    if (!tiltable.current) return;
    el.style.transform = `perspective(760px) rotateX(${(0.5 - y) * MAX_TILT}deg) rotateY(${
      (x - 0.5) * MAX_TILT
    }deg) translateY(-4px) scale(1.02)`;
  }

  function onLeave(e: ReactPointerEvent<HTMLElement>) {
    e.currentTarget.style.transform = "";
  }

  const shared = {
    ref: ref as never,
    onPointerMove: onMove,
    onPointerLeave: onLeave,
    className:
      "group relative flex flex-col items-center justify-center rounded-2xl border border-brand-ink/10 bg-white p-6 text-center shadow-sm " +
      "transition-[transform,box-shadow,border-color] duration-300 ease-out will-change-transform " +
      "hover:border-brand-ink/25 hover:shadow-elevated",
    style: { transformStyle: "preserve-3d" as const },
  };

  if (!client.url) {
    return (
      <div {...shared}>
        <CardFace client={client} />
      </div>
    );
  }
  return (
    <a {...shared} href={client.url} target="_blank" rel="noreferrer noopener">
      <CardFace client={client} />
    </a>
  );
}

export function ClientWall() {
  return (
    <section className="bg-secondary/40 py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          center
          eyebrow="Clients"
          title={
            <>
              Trusted by <span className="text-gradient">leading organizations</span>.
            </>
          }
          desc="Manufacturers, mills and industrial groups across Pakistan who rely on us for corporate supply and procurement."
        />
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {CLIENTS.map((c) => (
            <ClientCard key={c.name} client={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
