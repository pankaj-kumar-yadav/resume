import { RESUME_DATA } from "@/lib/constants"
import { Badge } from "@/components/ui/badge"

export function Skills() {
    return (
        <section className="mb-12">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2.5">
                {RESUME_DATA.skills.map((skill) => (
                    <Badge key={skill} className="text-xs sm:text-sm font-mono font-semibold bg-foreground/85 text-white border-transparent px-2.5 py-1">
                        {skill}
                    </Badge>
                ))}
            </div>
        </section>
    )
}
