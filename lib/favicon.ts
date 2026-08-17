export function getFaviconUrl(href: string): string {
    const domain = new URL(href).hostname
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
}
