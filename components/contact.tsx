import { RESUME_DATA } from "@/lib/constants"

export function Contact() {
    return (
        <section className="max-w-2xl mx-auto px-6 py-8">
            <div className="grid grid-cols-2 gap-8 text-center">
                <div>
                    <h3 className="text-sm font-mono font-bold uppercase tracking-widest text-gray-900 dark:text-gray-100 mb-3">
                        Email
                    </h3>
                    <a
                        href={`mailto:${RESUME_DATA.email}`}
                        className="text-gray-900 dark:text-white hover:underline font-medium break-all"
                    >
                        {RESUME_DATA.email}
                    </a>
                </div>

                <div>
                    <h3 className="text-sm font-mono font-bold uppercase tracking-widest text-gray-900 dark:text-gray-100 mb-3">
                        Phone
                    </h3>
                    <a href={`tel:${RESUME_DATA.phone}`} className="text-gray-900 dark:text-white hover:underline font-medium">
                        {RESUME_DATA.phone}
                    </a>
                </div>
            </div>
        </section>
    )
}
