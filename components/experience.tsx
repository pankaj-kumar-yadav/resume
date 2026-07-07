import { RESUME_DATA } from "@/lib/constants"
import { CalendarDays } from "lucide-react"

export function Experience() {
    return (
        <section className="mb-12">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-5">Work Experience</h2>
            <div className="space-y-11">
                {RESUME_DATA.experience.map((exp, idx) => (
                    <div key={idx}>
                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-1">
                            <div className="flex flex-col sm:flex-row sm:items-baseline gap-3">
                                <h3 className="text-xl font-bold tracking-tight text-foreground">{exp.company}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {exp.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="text-xs px-2 py-1 rounded-md bg-gray-100 text-foreground/80 font-mono font-semibold"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <time className="text-sm font-medium text-foreground/60 whitespace-nowrap inline-flex items-center gap-1.5">
                                <CalendarDays size={14} />
                                {exp.duration}
                            </time>
                        </div>

                        <h4 className="font-semibold text-base sm:text-lg text-foreground mt-3 mb-3">{exp.role}</h4>

                        <p className="text-pretty text-foreground/75 text-[15px] sm:text-base mb-4 leading-7">{exp.description}</p>

                        {exp.achievements && (
                            <ul className="space-y-2 text-[15px] sm:text-base text-foreground/80">
                                {exp.achievements.map((achievement, i) => (
                                    <li key={i} className="flex gap-2.5 leading-7">
                                        <span className="text-foreground/50 mt-0.5">•</span>
                                        <span className="text-pretty">
                                            {achievement.includes(":") ? (
                                                <>
                                                    <strong className="font-semibold text-foreground">{achievement.split(":")[0]}:</strong>
                                                    {achievement.slice(achievement.indexOf(":") + 1)}
                                                </>
                                            ) : (
                                                achievement
                                            )}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        </section>
    )
}
