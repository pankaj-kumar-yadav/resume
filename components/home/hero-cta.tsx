import Link from "next/link"
import { MotionArrow } from "@/components/shared/motion-arrow"
import { HERO } from "@/lib/constants/resume.constant"

export function HeroCta() {
    return (
        <Link
            href={HERO.ctaHref}
            className="hero-cta pressable group/arrow print:hidden"
        >
            {HERO.cta}
            <MotionArrow className="text-background" />
        </Link>
    )
}
