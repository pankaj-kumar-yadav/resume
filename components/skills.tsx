import { RESUME_DATA } from "@/lib/constants"
import { Badge } from "./ui/badge"

export function Skills() {
    return (
        <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Skills</h2>
            <div className="flex flex-wrap gap-2">
                {RESUME_DATA.skills.map((skill) => (
                    <Badge key={skill} className="text-sm font-mono font-bold bg-accent-foreground/80">
                        {skill}
                    </Badge>
                ))}
            </div>
        </section>
    )
}
