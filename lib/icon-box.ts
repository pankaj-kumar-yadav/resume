export const ICON_BOX_TONES = {
    blue: "bg-linear-to-b from-blue-400 to-blue-600 ring-offset-blue-500",
    orange: "bg-linear-to-b from-orange-400 to-orange-600 ring-offset-orange-500",
    emerald: "bg-linear-to-b from-emerald-400 to-emerald-600 ring-offset-emerald-500",
    green: "bg-linear-to-b from-green-400 to-green-600 ring-offset-green-500",
    red: "bg-linear-to-b from-red-400 to-red-600 ring-offset-red-500",
    violet: "bg-linear-to-b from-violet-400 to-violet-600 ring-offset-violet-500",
    purple: "bg-linear-to-b from-purple-400 to-purple-600 ring-offset-purple-500",
    yellow: "bg-linear-to-b from-yellow-400 to-yellow-600 ring-offset-yellow-500",
    indigo: "bg-linear-to-b from-indigo-400 to-indigo-600 ring-offset-indigo-500",
    neutral: "bg-linear-to-b from-neutral-400 to-neutral-600 ring-offset-neutral-500",
} as const

export type IconBoxTone = keyof typeof ICON_BOX_TONES

export const ICON_BOX_BASE =
    "inline-flex shrink-0 items-center justify-center align-middle shadow-lg ring-1 ring-white/20 ring-offset-2 ring-inset print:hidden"

export const SOCIAL_ICON_TONES: Record<string, IconBoxTone> = {
    website: "blue",
    mail: "orange",
    phone: "green",
    github: "neutral",
    gitlab: "orange",
    linkedin: "blue",
    twitter: "indigo",
    x: "indigo",
    leetcode: "yellow",
    geeksforgeeks: "green",
    hackerrank: "emerald",
    location: "violet",
    globe: "blue",
}
