const GENERIC_FAVICON_HOSTS = new Set(["omooma.com"])

export function getFaviconUrl(href: string): string | null {
    const hostname = new URL(href).hostname
    const apex = hostname.replace(/^www\./, "")

    if (GENERIC_FAVICON_HOSTS.has(apex)) {
        return null
    }

    return `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`
}
