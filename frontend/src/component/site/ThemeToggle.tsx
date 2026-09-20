import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import { THEME_KEY } from "./theme";

/**
 * Light/dark switch.
 *
 * The class on <html> is set by an inline script in the document head before
 * the page paints (see routes/__root.tsx) — doing it here would flash the light
 * theme first. This component only reflects and changes that state.
 *
 * With no stored choice the site follows the operating system, and keeps
 * following it as it changes. Clicking the switch is a deliberate override and
 * is remembered from then on.
 */

function apply(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  // Rendered on the server too, where there is no DOM; start light and correct
  // on mount, which is also when the head script has already run.
  const [dark, setDark] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    setReady(true);

    // Track the OS only while the visitor has not picked a side.
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystem = () => {
      if (localStorage.getItem(THEME_KEY)) return;
      apply(mq.matches);
      setDark(mq.matches);
    };
    mq.addEventListener("change", onSystem);
    return () => mq.removeEventListener("change", onSystem);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    apply(next);
    try {
      // Storing the value that matches the system is still a choice: it stops
      // the theme flipping later if the OS switches at sunset.
      localStorage.setItem(THEME_KEY, next ? "dark" : "light");
    } catch {
      // Private browsing can refuse writes; the toggle still works this visit.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={dark}
      className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-border bg-background/70 text-foreground/80 transition hover:bg-secondary hover:text-foreground ${className}`}
    >
      {/* Until mounted we do not know the real state; render the icon only then
          so the server and client markup agree. */}
      {ready ? (
        dark ? (
          <Sun className="h-[18px] w-[18px]" />
        ) : (
          <Moon className="h-[18px] w-[18px]" />
        )
      ) : (
        <span className="h-[18px] w-[18px]" />
      )}
    </button>
  );
}
