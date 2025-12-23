import { RESUME_DATA } from "@/lib/constants"

export function Skills() {
    return (
        <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Skills</h2>
            <div className="flex flex-wrap gap-2">
                {RESUME_DATA.skills.map((skill) => (
                    <span key={skill} className="px-3 py-1.5 rounded-full bg-gray-900 text-white text-sm font-medium">
                        {skill}
                    </span>
                ))}
            </div>
        </section>
    )
}
