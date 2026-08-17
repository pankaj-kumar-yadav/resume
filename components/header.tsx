import Image from "next/image"
import { RESUME_DATA } from "@/lib/constants"

export function Header() {
    return (
        <header
            className="section-enter mb-2"
            style={{ animationDelay: "0ms" }}
        >
            <div className="flex items-center gap-3">
                <div className="relative size-10 shrink-0 overflow-hidden rounded-md ring-1 ring-border/40">
                    <Image
                        src={RESUME_DATA.profileImage}
                        alt={`${RESUME_DATA.name} profile photo`}
                        fill
                        priority
                        sizes="40px"
                        className="object-cover object-[center_20%]"
                    />
                </div>

                <div className="min-w-0">
                    <h1
                        className="text-xl font-semibold tracking-tight text-foreground"
                        id="resume-name"
                    >
                        {RESUME_DATA.name}
                    </h1>

                    <p className="hidden print:block mt-2 text-xs leading-relaxed">
                        {RESUME_DATA.socials.map((social, i) => (
                            <span key={social.label}>
                                {i > 0 && <span className="mx-1.5">·</span>}
                                <a href={social.href}>{social.label}</a>
                            </span>
                        ))}
                    </p>
                </div>
            </div>
        </header>
    )
}
