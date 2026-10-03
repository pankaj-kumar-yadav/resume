"use client"

import Image from "next/image"
import type { CaseStudyFigure } from "@/lib/constants/case-studies.constant"
import { BueDrift } from "@/components/ui/bue-drift"

export function CaseStudyFigureView({ figure }: { figure: CaseStudyFigure }) {
    return (
        <figure className="case-study-figure-bleed space-y-3">
            <figcaption className="mx-auto w-full max-w-2xl px-5 text-xs text-muted-foreground sm:px-8 lg:max-w-[1000px] lg:text-sm">
                {figure.caption}
            </figcaption>
            <div className="case-study-figure case-study-figure--cover">
                <BueDrift className="case-study-figure-shader-layer" />
                <div className="case-study-figure-frame case-study-figure-frame--cover">
                    <div className="relative h-full w-full">
                        <Image
                            src={figure.src}
                            alt={figure.alt}
                            fill
                            className="object-contain drop-shadow-md"
                            sizes="100vw"
                            priority={false}
                        />
                    </div>
                    {figure.placeholder ? (
                        <span className="absolute bottom-4 right-4 z-[2] rounded bg-background/90 px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
                            Placeholder
                        </span>
                    ) : null}
                </div>
            </div>
        </figure>
    )
}
