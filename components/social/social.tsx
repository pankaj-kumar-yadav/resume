"use client"

import Link from "next/link"
import { ArrowUpRight, Copy } from "lucide-react"
import type { ComponentType } from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import { CopyToast } from "@/components/social/copy-toast"
import { IconBox } from "@/components/social/icon-box"
import { SectionHeading } from "@/components/shared/section-heading"
import { SocialGroup } from "@/components/social/social-group"
import { LinkPreview } from "@/components/ui/link-preview"
import { copyToClipboard } from "@/lib/copy-to-clipboard"
import { RESUME_DATA } from "@/lib/constants/resume.constant"
import { SOCIAL_ICON_TONES } from "@/lib/icon-box"
import { SOCIAL_ICON_MAP } from "@/lib/social-icons"
import { cn } from "@/lib/utils"

const TOAST_DURATION_MS = 2000
const LOCATION_MAPS_HREF = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(RESUME_DATA.location)}`

type SocialEntry = (typeof RESUME_DATA.socials)[number]
type SocialGroupId = SocialEntry["group"]

type SocialListItem =
    | { kind: "social"; social: SocialEntry }
    | { kind: "location" }

function getDisplayValue(social: SocialEntry): string {
    if (social.icon === "mail") return RESUME_DATA.email
    if (social.icon === "phone") return RESUME_DATA.phone
    return social.href.replace(/^https?:\/\/(www\.)?/, "")
}

function getCopyValue(social: SocialEntry): string {
    if (social.icon === "mail") return RESUME_DATA.email
    if (social.icon === "phone") return RESUME_DATA.phone
    return getDisplayValue(social)
}

function isExternalLink(icon: string): boolean {
    return (
        icon === "website" ||
        icon === "github" ||
        icon === "gitlab" ||
        icon === "leetcode" ||
        icon === "geeksforgeeks" ||
        icon === "hackerrank" ||
        icon === "linkedin" ||
        icon === "twitter"
    )
}

const rowClassName =
    "social-link pressable hover-accent group relative flex items-center gap-3 overflow-hidden rounded-md border border-transparent px-2 py-2.5 -mx-2 print:mx-0 print:border-0 print:px-0 print:py-1"

const contentClassName =
    "grid min-w-0 flex-1 grid-cols-1 gap-0.5 sm:grid-cols-[7rem_1fr] sm:items-center sm:gap-4"

const SOCIAL_GROUP_DEFS: {
    id: SocialGroupId
    headingId: string
    label: string
    iconOrder: string[]
}[] = [
    {
        id: "contact",
        headingId: "social-contact",
        label: "Contact",
        iconOrder: ["mail", "phone"],
    },
    {
        id: "work",
        headingId: "social-work",
        label: "Work",
        iconOrder: ["linkedin", "github", "gitlab", "website", "twitter"],
    },
    {
        id: "practice",
        headingId: "social-practice",
        label: "Practice",
        iconOrder: ["leetcode", "geeksforgeeks", "hackerrank"],
    },
]

function itemsForGroup(groupId: SocialGroupId, iconOrder: string[]): SocialListItem[] {
    const inGroup = RESUME_DATA.socials.filter((social) => social.group === groupId)
    const byIcon = new Map(inGroup.map((social) => [social.icon, social]))
    const items: SocialListItem[] = []
    const used = new Set<string>()

    for (const icon of iconOrder) {
        const social = byIcon.get(icon)
        if (!social) continue
        used.add(icon)
        items.push({ kind: "social", social })
        if (icon === "phone") {
            items.push({ kind: "location" })
        }
    }

    for (const social of inGroup) {
        if (used.has(social.icon)) continue
        items.push({ kind: "social", social })
    }

    return items
}

const SOCIAL_GROUPS = (() => {
    let stagger = 0

    return SOCIAL_GROUP_DEFS.flatMap((def) => {
        const items = itemsForGroup(def.id, def.iconOrder)
        if (items.length === 0) return []

        const headingDelayMs = stagger * 50
        stagger += 1

        return [
            {
                ...def,
                headingDelayMs,
                items: items.map((item) => {
                    const delayMs = stagger * 50
                    stagger += 1
                    return {
                        item,
                        delayMs,
                        key:
                            item.kind === "location"
                                ? "location"
                                : item.social.label,
                    }
                }),
            },
        ]
    })
})()

function CopyableRow({
    label,
    displayValue,
    href,
    Icon,
    iconKey,
    onCopy,
    external = false,
    previewUrl,
}: {
    label: string
    displayValue: string
    href: string
    Icon: ComponentType<{ size?: number; className?: string }>
    iconKey: string
    onCopy: () => void
    external?: boolean
    previewUrl?: string
}) {
    const linkButton = (
        <Link
            href={href}
            aria-label={`Open ${label.toLowerCase()}`}
            {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            className="pressable hover-accent inline-flex size-7 shrink-0 items-center justify-center rounded-md border border-input bg-background text-muted-foreground print:hidden"
        >
            <ArrowUpRight size={13} aria-hidden />
        </Link>
    )

    return (
        <div className={cn(rowClassName, "pr-1")}>
            <IconBox tone={SOCIAL_ICON_TONES[iconKey] ?? "blue"}>
                <Icon
                    size={16}
                    className="stroke-current drop-shadow-xl drop-shadow-black/40"
                />
            </IconBox>
            <span className={contentClassName}>
                <dt className="text-sm font-medium text-foreground/75 print:text-xs">
                    {label}
                </dt>
                <dd className="m-0 flex min-w-0 items-center gap-1.5">
                    <button
                        type="button"
                        onClick={onCopy}
                        aria-label={`Copy ${label.toLowerCase()} to clipboard`}
                        className="pressable inline-flex min-w-0 flex-1 items-center gap-1.5 truncate text-left text-sm text-foreground hover:underline hover:underline-offset-[3px] print:text-xs"
                    >
                        <span className="truncate">{displayValue}</span>
                        <Copy
                            size={12}
                            className="shrink-0 text-muted-foreground print:hidden"
                            aria-hidden
                        />
                    </button>
                    {previewUrl ? (
                        <LinkPreview url={previewUrl}>{linkButton}</LinkPreview>
                    ) : (
                        linkButton
                    )}
                </dd>
            </span>
        </div>
    )
}

function SocialListRow({
    item,
    delayMs,
    onCopy,
}: {
    item: SocialListItem
    delayMs: number
    onCopy: (label: string, value: string) => void
}) {
    if (item.kind === "location") {
        const LocationIcon = SOCIAL_ICON_MAP.location
        if (!LocationIcon) return null

        return (
            <div
                className="social-row print:break-inside-avoid"
                style={{ animationDelay: `${delayMs}ms` }}
            >
                <CopyableRow
                    label="Location"
                    displayValue={RESUME_DATA.location}
                    href={LOCATION_MAPS_HREF}
                    Icon={LocationIcon}
                    iconKey="location"
                    external
                    onCopy={() => onCopy("Location", RESUME_DATA.location)}
                />
            </div>
        )
    }

    const social = item.social
    const Icon = SOCIAL_ICON_MAP[social.icon]
    if (!Icon) return null

    const external = isExternalLink(social.icon)
    const displayValue = getDisplayValue(social)

    return (
        <div
            className="social-row print:break-inside-avoid"
            style={{ animationDelay: `${delayMs}ms` }}
        >
            <CopyableRow
                label={social.label}
                displayValue={displayValue}
                href={social.href}
                Icon={Icon}
                iconKey={social.icon}
                external={external}
                previewUrl={external ? social.href : undefined}
                onCopy={() => onCopy(social.label, getCopyValue(social))}
            />
        </div>
    )
}

export function Social() {
    const [toastMessage, setToastMessage] = useState("")
    const [toastVisible, setToastVisible] = useState(false)
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const showToast = useCallback((message: string) => {
        setToastMessage(message)
        setToastVisible(true)

        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => {
            setToastVisible(false)
        }, TOAST_DURATION_MS)
    }, [])

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden && timeoutRef.current) {
                clearTimeout(timeoutRef.current)
                setToastVisible(false)
            }
        }

        document.addEventListener("visibilitychange", handleVisibilityChange)
        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange)
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
        }
    }, [])

    const handleCopy = async (label: string, value: string) => {
        const copied = await copyToClipboard(value)
        if (copied) {
            showToast(`${label} copied`)
        }
    }

    return (
        <>
            <section id="social">
                <SectionHeading hideOnScreen>Social</SectionHeading>
                <p className="mb-5 text-sm text-muted-foreground print:mb-2 print:text-xs">
                    Open to opportunities. Click any value to copy. Hover links
                    to preview.
                </p>
                <div className="space-y-6 print:space-y-3">
                    {SOCIAL_GROUPS.map((group) => (
                        <SocialGroup
                            key={group.headingId}
                            id={group.headingId}
                            title={group.label}
                            headingDelayMs={group.headingDelayMs}
                        >
                            {group.items.map(({ item, delayMs, key }) => (
                                <SocialListRow
                                    key={key}
                                    item={item}
                                    delayMs={delayMs}
                                    onCopy={handleCopy}
                                />
                            ))}
                        </SocialGroup>
                    ))}
                </div>
            </section>
            <CopyToast message={toastMessage} visible={toastVisible} />
        </>
    )
}
