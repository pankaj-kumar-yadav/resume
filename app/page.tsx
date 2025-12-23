import { Header } from "@/components/header"
import { About } from "@/components/about"
import { Experience } from "@/components/experience"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 sm:px-12 py-8 sm:py-12">
        <Header />
        <About />
        <Experience />
        <Skills />
        <Projects />
      </div>
    </main>
  )
}
