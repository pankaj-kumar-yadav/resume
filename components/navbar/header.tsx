import Link from "next/link"
import { RESUME_DATA } from "@/lib/constants/resume.constant"

export function PrintHeader() {
    return (
        <header className="mb-4 hidden print:block">
            <p className="text-xl font-semibold tracking-tight" id="resume-name">
                {RESUME_DATA.name}
            </p>
            <p className="mt-0.5 text-sm">{RESUME_DATA.title}</p>
            <p className="mt-2 text-xs leading-relaxed">
                {RESUME_DATA.socials.map((social, i) => (
                    <span key={social.label}>
                        {i > 0 && <span className="mx-1.5">·</span>}
                        <Link href={social.href}>{social.label}</Link>
                    </span>
                ))}
            </p>
        </header>
    )
}
