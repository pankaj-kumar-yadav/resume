"use client"

import { ArrowUpRight, Copy } from "lucide-react"
import type { ComponentType } from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import { CopyToast } from "@/components/copy-toast"
import { SectionHeading } from "@/components/section-heading"
import { LinkPreview } from "@/components/ui/link-preview"
import { copyToClipboard } from "@/lib/copy-to-clipboard"
import { RESUME_DATA } from "@/lib/constants"
import { SOCIAL_ICON_MAP } from "@/lib/social-icons"
import { cn } from "@/lib/utils"

const TOAST_DURATION_MS = 2000
const LOCATION_MAPS_HREF = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(RESUME_DATA.location)}`

function getDisplayValue(
    social: (typeof RESUME_DATA.socials)[number]
): string {
    if (social.icon === "mail") return RESUME_DATA.email
    if (social.icon === "phone") return RESUME_DATA.phone
    return social.href.replace(/^https?:\/\//, "")
}

function getCopyValue(
    social: (typeof RESUME_DATA.socials)[number]
): string {
    if (social.icon === "mail") return RESUME_DATA.email
    if (social.icon === "phone") return RESUME_DATA.phone
    return getDisplayValue(social)
}

function isExternalLink(icon: string): boolean {
    return (
        icon === "website" ||
        icon === "github" ||
        icon === "gitlab" ||
        icon === "linkedin" ||
        icon === "twitter"
    )
}

const rowClassName =
    "social-link pressable hover-accent group relative flex items-center gap-3 overflow-hidden rounded-md border border-transparent px-2 py-2.5 -mx-2 print:mx-0 print:border-0 print:px-0 print:py-1"

const contentClassName =
    "grid min-w-0 flex-1 grid-cols-1 gap-0.5 sm:grid-cols-[7rem_1fr] sm:items-center sm:gap-4"

const SOCIAL_TAB_ITEMS = [
    ...RESUME_DATA.socials.filter((social) => social.icon !== "website"),
    ...RESUME_DATA.socials.filter((social) => social.icon === "website"),
]

type SocialListItem =
    | { kind: "social"; social: (typeof RESUME_DATA.socials)[number] }
    | { kind: "location" }

function buildSocialListItems(): SocialListItem[] {
    const items: SocialListItem[] = []
    for (const social of SOCIAL_TAB_ITEMS) {
        items.push({ kind: "social", social })
        if (social.icon === "phone") {
            items.push({ kind: "location" })
        }
    }
    return items
}

const SOCIAL_LIST_ITEMS = buildSocialListItems()

function CopyableRow({
    label,
    displayValue,
    href,
    Icon,
    onCopy,
    external = false,
    previewUrl,
}: {
    label: string
    displayValue: string
    href: string
    Icon: ComponentType<{ size?: number; className?: string }>
    onCopy: () => void
    external?: boolean
    previewUrl?: string
}) {
    const linkButton = (
        <a
            href={href}
            aria-label={`Open ${label.toLowerCase()}`}
            {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            className="pressable hover-accent inline-flex size-7 shrink-0 items-center justify-center rounded-md border border-input bg-background text-muted-foreground print:hidden"
        >
            <ArrowUpRight size={13} aria-hidden />
        </a>
    )

    return (
        <div className={cn(rowClassName, "pr-1")}>
            <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-md border border-input bg-background text-foreground print:hidden">
                <Icon size={15} className="stroke-current text-foreground/70" />
            </span>
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
            <section
                id="social"
                className="section-enter"
                style={{ animationDelay: "250ms" }}
            >
                <SectionHeading hideOnScreen>Social</SectionHeading>
                <p className="mb-5 text-sm text-muted-foreground print:mb-2 print:text-xs">
                    Open to opportunities. Click any value to copy. Hover links
                    to preview.
                </p>
                <dl className="space-y-2 print:space-y-1.5">
                    {SOCIAL_LIST_ITEMS.map((item, idx) => {
                        if (item.kind === "location") {
                            const LocationIcon = SOCIAL_ICON_MAP.location
                            if (!LocationIcon) return null

                            return (
                                <div
                                    key="location"
                                    className="social-row print:break-inside-avoid"
                                    style={{
                                        animationDelay: `${270 + idx * 50}ms`,
                                    }}
                                >
                                    <CopyableRow
                                        label="Location"
                                        displayValue={RESUME_DATA.location}
                                        href={LOCATION_MAPS_HREF}
                                        Icon={LocationIcon}
                                        external
                                        onCopy={() =>
                                            handleCopy(
                                                "Location",
                                                RESUME_DATA.location
                                            )
                                        }
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
                                key={social.label}
                                className="social-row print:break-inside-avoid"
                                style={{ animationDelay: `${270 + idx * 50}ms` }}
                            >
                                <CopyableRow
                                    label={social.label}
                                    displayValue={displayValue}
                                    href={social.href}
                                    Icon={Icon}
                                    external={external}
                                    previewUrl={external ? social.href : undefined}
                                    onCopy={() =>
                                        handleCopy(
                                            social.label,
                                            getCopyValue(social)
                                        )
                                    }
                                />
                            </div>
                        )
                    })}
                </dl>
            </section>
            <CopyToast message={toastMessage} visible={toastVisible} />
        </>
    )
}
