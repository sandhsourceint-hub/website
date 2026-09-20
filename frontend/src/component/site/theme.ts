/**
 * Theme storage key and the snippet that applies the saved theme.
 *
 * Kept out of the toggle component so that file exports only a component —
 * mixing constants in breaks fast refresh.
 */
export const THEME_KEY = "theme";

/**
 * Injected into <head> and run before the first paint, so a dark-theme visitor
 * never sees a flash of the light palette. Written as a string because it goes
 * in via dangerouslySetInnerHTML; keep it small and dependency-free.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var s=localStorage.getItem("${THEME_KEY}");var d=s?s==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;if(d)document.documentElement.classList.add("dark");}catch(e){}})();`;
