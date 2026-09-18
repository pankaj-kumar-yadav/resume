import { RESUME_PDF_DOWNLOAD_URL } from "@/lib/constants/resume.constant"

export const revalidate = 3600

export async function GET() {
    const upstream = await fetch(RESUME_PDF_DOWNLOAD_URL, {
        next: { revalidate },
    })

    if (!upstream.ok) {
        return new Response("Resume unavailable", { status: 502 })
    }

    const bytes = new Uint8Array(await upstream.arrayBuffer())
    const isPdf =
        bytes[0] === 0x25 &&
        bytes[1] === 0x50 &&
        bytes[2] === 0x44 &&
        bytes[3] === 0x46

    if (!isPdf) {
        return new Response("Resume unavailable", { status: 502 })
    }

    return new Response(bytes, {
        headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": 'inline; filename="resume.pdf"',
            "Cache-Control": "public, max-age=3600",
        },
    })
}