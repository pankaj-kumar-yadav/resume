import { SocialIcons } from "@/components/social-icons"
import { RESUME_DATA } from "@/lib/constants"
import { Globe } from "lucide-react"
import Image from "next/image"

export function Header() {
    return (
        <header className="mb-12 border-b border-gray-200 pb-8">
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
                {/* Left side - Name, title, and socials */}
                <div className="flex-1">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-1">{RESUME_DATA.name}</h1>
                    <p className="text-base sm:text-lg text-gray-700 mb-2">{RESUME_DATA.title}</p>
                    <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                        <span><Globe size={16} /></span>
                        {RESUME_DATA.location}
                    </p>

                    {/* Social icons */}
                    <div className="mt-4 flex gap-3">
                        <SocialIcons size={16} />
                    </div>
                </div>

                {/* Right side - Profile picture placeholder */}
                <div className="flex-shrink-0">
                    {/* <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">Photo</span>
                    </div> */}
                    <Image
                        src={RESUME_DATA.avatar}
                        alt={RESUME_DATA.name}
                        width={160}
                        height={160}
                        className="rounded-2xl object-cover border border-gray-200 shadow-sm"
                    />
                </div>
            </div>
        </header>
    )
}
