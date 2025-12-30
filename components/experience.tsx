import { RESUME_DATA } from "@/lib/constants"

export function Experience() {
    return (
        <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Work Experience</h2>
            <div className="space-y-10">
                {RESUME_DATA.experience.map((exp, idx) => (
                    <div key={idx}>
                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-1">
                            <div className="flex flex-col sm:flex-row sm:items-baseline gap-3">
                                <h3 className="text-lg font-bold">{exp.company}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {exp.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="text-xs px-2 py-0.5 rounded bg-gray-100 text-foreground/90 font-mono font-semibold"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <time className="text-sm text-gray-600 whitespace-nowrap">{exp.duration}</time>
                        </div>

                        <h4 className="font-bold text-lg text-gray-900 my-4">{exp.role}</h4>

                        <p className="text-pretty font-mono text-foreground/80 text-base mb-3 leading-relaxed">{exp.description}</p>

                        {exp.achievements && (
                            <ul className="space-y-1 text-base text-foreground/80">
                                {exp.achievements.map((achievement, i) => (
                                    <li key={i} className="flex gap-2">
                                        <span>•</span>
                                        <span className="text-pretty font-mono">{achievement}</span>
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
