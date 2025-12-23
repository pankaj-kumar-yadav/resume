import { RESUME_DATA } from "@/lib/constants"

export function About() {
    return (
        <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">About</h2>
            <p className="text-gray-700 leading-relaxed text-base">{RESUME_DATA.about}</p>
        </section>
    )
}
