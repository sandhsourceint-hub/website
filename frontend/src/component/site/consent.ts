/**
 * Cookie consent state.
 *
 * Kept out of the notice component so that file exports only a component —
 * mixing constants in breaks fast refresh, same as theme.ts.
 *
 * Only "marketing" is a real choice. Essential storage (the theme preference)
 * carries no consent flag because it is not optional: the site cannot honour a
 * visitor's dark mode without remembering it.
 */
export const CONSENT_KEY = "cookie-consent";

export type Consent = {
  marketing: boolean;
  /** ISO date the choice was made — a consent record is worthless undated. */
  decidedAt: string;
};

/**
 * The stored choice, or null when the visitor has not answered yet.
 *
 * Returns null rather than throwing when storage is unavailable (private
 * browsing, blocked site data), which means the notice shows again next visit.
 * That is the safe way round: better to ask twice than to assume consent.
 */
export function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const v = JSON.parse(raw) as Partial<Consent>;
    if (typeof v.marketing !== "boolean") return null;
    return { marketing: v.marketing, decidedAt: v.decidedAt ?? "" };
  } catch {
    return null;
  }
}

export function writeConsent(marketing: boolean): Consent {
  const consent: Consent = { marketing, decidedAt: new Date().toISOString() };
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  } catch {
    // Storage can refuse writes; the choice still holds for this visit.
  }
  return consent;
}

/**
 * Gate for any marketing or analytics script added later.
 *
 * Nothing on the site calls this yet because nothing on the site tracks
 * anyone — see the notes in CookieNotice.tsx. Load such a script from here
 * rather than from the page, so consent is checked in exactly one place:
 *
 *   if (hasMarketingConsent()) loadAnalytics();
 */
export function hasMarketingConsent(): boolean {
  return readConsent()?.marketing === true;
}
