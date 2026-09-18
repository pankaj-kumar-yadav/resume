import { cn } from "@/lib/utils"

const LINE_WIDTHS = ["92%", "100%", "88%", "96%", "74%", "100%", "90%", "64%"] as const

export function ResumeSkeleton({ framed = true }: { framed?: boolean }) {
    return (
        <div
            className={cn(
                "resume-skeleton relative overflow-hidden bg-background",
                framed
                    ? "h-[min(90vh,1100px)] rounded-3xl border border-border shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)]"
                    : "min-h-[min(90vh,1100px)]",
            )}
            aria-busy="true"
            aria-live="polite"
        >
            <span className="sr-only">Loading resume</span>
            <div className="flex flex-col gap-3 p-8 sm:p-12">
                <div className="resume-skeleton-block h-7 w-48 rounded-md" />
                <div className="resume-skeleton-block h-3.5 w-64 rounded-md" />
                <div className="mt-8 space-y-3">
                    {LINE_WIDTHS.map((width, index) => (
                        <div
                            key={index}
                            className="resume-skeleton-block h-3 rounded-md"
                            style={{ width }}
                        />
                    ))}
                </div>
                <div className="mt-8 space-y-3">
                    {LINE_WIDTHS.map((width, index) => (
                        <div
                            key={index}
                            className="resume-skeleton-block h-3 rounded-md"
                            style={{ width }}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
