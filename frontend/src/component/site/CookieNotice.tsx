import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { readConsent, writeConsent } from "./consent";

/**
 * Cookie consent notice.
 *
 * Shown once, on the first visit, until the visitor answers; the answer lives
 * in localStorage (see consent.ts). Dismissing with the X counts as refusing
 * the optional categories, which is what the copy promises — a close button
 * that silently accepted would make the notice a dark pattern.
 *
 * Nothing on the site loads a marketing script today, so the "marketing"
 * choice records a preference rather than switching anything off. Gate any
 * tracker added later on hasMarketingConsent() and it starts working.
 */

const ESSENTIAL_NOTE =
  "Remembering your light or dark theme choice. These cannot be turned off — without them the site cannot honour the preference you set.";
const MARKETING_NOTE =
  "Measuring which pages and products draw interest, so we can improve the catalog. Off unless you allow it.";

function Switch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition ${
        checked ? "gradient-royal" : "bg-muted-foreground/30"
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
          checked ? "left-[22px]" : "left-0.5"
        }`}
      />
    </button>
  );
}

export function CookieNotice() {
  // Never rendered on the server: the answer lives in localStorage, so the
  // markup would not match what the browser decides to show.
  const [show, setShow] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (readConsent() === null) setShow(true);
  }, []);

  useEffect(() => {
    if (!show) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") decide(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [show]);

  function decide(allowMarketing: boolean) {
    writeConsent(allowMarketing);
    setShow(false);
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          ref={panel}
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-notice-title"
          aria-describedby="cookie-notice-body"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="fixed inset-x-4 bottom-4 z-[80] mx-auto max-w-md rounded-3xl border border-border bg-card p-6 text-card-foreground shadow-elevated sm:inset-x-auto sm:left-6 sm:bottom-6 sm:p-7"
        >
          <div className="flex items-start justify-between gap-4">
            <h2 id="cookie-notice-title" className="font-display text-2xl font-bold">
              Notice
            </h2>
            <button
              type="button"
              onClick={() => decide(false)}
              aria-label="Close and reject non-essential cookies"
              className="-mr-2 -mt-2 grid h-11 w-11 shrink-0 place-items-center rounded-full text-muted-foreground transition hover:bg-secondary hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <p id="cookie-notice-body" className="mt-3 text-sm leading-relaxed text-muted-foreground">
            We use cookies for essential functions and, with your consent, marketing. Closing this
            notice rejects non-essential cookies.{" "}
            <Link
              to="/privacy"
              className="font-semibold text-brand underline-offset-2 hover:underline dark:text-brand-accent"
            >
              Privacy Policy
            </Link>
            .
          </p>

          {customizing && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-5 space-y-4 overflow-hidden rounded-2xl border border-border bg-secondary/50 p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold">Essential</div>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {ESSENTIAL_NOTE}
                  </p>
                </div>
                <span className="mt-0.5 shrink-0 rounded-full bg-brand/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand dark:text-brand-accent">
                  Always on
                </span>
              </div>
              <div className="flex items-start justify-between gap-4 border-t border-border pt-4">
                <div>
                  <div className="text-sm font-semibold">Marketing</div>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {MARKETING_NOTE}
                  </p>
                </div>
                <div className="mt-0.5 grid h-11 shrink-0 place-items-center">
                  <Switch
                    checked={marketing}
                    onChange={setMarketing}
                    label="Allow marketing cookies"
                  />
                </div>
              </div>
            </motion.div>
          )}

          <div className="mt-6 flex flex-col gap-3">
            <div className="flex flex-col gap-3 sm:flex-row">
              {customizing ? (
                <button
                  type="button"
                  onClick={() => decide(marketing)}
                  className="min-h-11 flex-1 rounded-full border border-border px-5 text-sm font-semibold transition hover:bg-secondary"
                >
                  Save choices
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setCustomizing(true)}
                  className="min-h-11 flex-1 rounded-full border border-border px-5 text-sm font-semibold transition hover:bg-secondary"
                >
                  Customize
                </button>
              )}
              <button
                type="button"
                onClick={() => decide(false)}
                className="min-h-11 flex-1 rounded-full border border-border px-5 text-sm font-semibold transition hover:bg-secondary"
              >
                Reject non-essential
              </button>
            </div>
            <button
              type="button"
              onClick={() => decide(true)}
              className="min-h-11 w-full rounded-full gradient-royal px-5 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.02]"
            >
              Accept all
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
