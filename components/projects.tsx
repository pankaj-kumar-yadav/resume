import { RESUME_DATA } from "@/lib/constants"

export function Projects() {
    const featuredProjects = RESUME_DATA.projects.filter((p) => p.featured)

    return (
        <section>
            <h2 className="text-2xl font-bold mb-8">Side projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProjects.map((proj, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex gap-1">
                                <h3 className="text-lg font-bold mb-0.5">{proj.name}</h3>
                                <span className="text-lg text-lime-500">•</span>
                            </div>
                        </div>

                        <p className="text-sm text-gray-700 mb-4 leading-relaxed">{proj.description}</p>

                        <div className="mb-4 flex flex-wrap gap-1">
                            {proj.technologies.map((tech) => (
                                <span key={tech} className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {proj.additionalTech && (
                            <div className="mb-4 flex flex-wrap gap-1">
                                {proj.additionalTech.map((tech) => (
                                    <span key={tech} className="text-xs px-2 py-1 rounded bg-gray-50 text-gray-600">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        )}

                        {proj.github && (
                            <a
                                href={proj.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-medium text-gray-900 hover:underline"
                            >
                                GitHub →
                            </a>
                        )}
                    </div>
                ))}
            </div>
        </section>
    )
}
