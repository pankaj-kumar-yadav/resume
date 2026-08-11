export const FONT_STORAGE_KEY = "resume-font"
export const DEFAULT_FONT = "schibsted" as const

export const FONT_IDS = ["schibsted", "inter", "geist"] as const
export type FontId = (typeof FONT_IDS)[number]

export function isFontId(value: unknown): value is FontId {
  return typeof value === "string" && (FONT_IDS as readonly string[]).includes(value)
}

/** Runs before paint to set `data-font` from localStorage. */
export const FONT_FOUC_SCRIPT = `(function(){try{var k=${JSON.stringify(FONT_STORAGE_KEY)};var d=${JSON.stringify(DEFAULT_FONT)};var v=localStorage.getItem(k);var ok=${JSON.stringify([...FONT_IDS])}.indexOf(v)!==-1;document.documentElement.setAttribute("data-font",ok?v:d);}catch(e){document.documentElement.setAttribute("data-font",${JSON.stringify(DEFAULT_FONT)});}})();`
