export const RESUME_DATA = {
    name: "John Doe",
    title: "Detail-oriented Full Stack Engineer",
    subtitle: "dedicated to building high-quality products.",
    location: "San Francisco, CA",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    about:
        "Frontend-focused Full Stack Engineer specializing in high-performance React applications, scalable Node.js services, and real-time collaboration systems. Experienced in technical architecture design and remote team leadership.",

    socials: [
        {
            label: "Website",
            href: "https://johndoe.com",
            icon: "globe",
        },
        {
            label: "Email",
            href: "mailto:john.doe@example.com",
            icon: "mail",
        },
        {
            label: "Phone",
            href: "tel:+15551234567",
            icon: "phone",
        },
        {
            label: "GitHub",
            href: "https://github.com/johndoe",
            icon: "github",
        },
        {
            label: "LinkedIn",
            href: "https://linkedin.com/in/johndoe",
            icon: "linkedin",
        },
        {
            label: "Twitter",
            href: "https://twitter.com/johndoe",
            icon: "twitter",
        },
    ],

    experience: [
        {
            company: "Motion",
            role: "Senior Software Engineer",
            type: "Remote",
            duration: "2025 - Present",
            technologies: ["React", "Next.js", "TypeScript", "AdonisJS"],
            description: "Working on internal AI agents platform allowing marketing specialists to create AI workflows.",
            achievements: [
                "Led architecture design for real-time collaboration features",
                "Mentored team of 3 junior engineers on React best practices",
                "Improved bundle size by 35% through code splitting and lazy loading",
            ],
        },
        {
            company: "Film.io",
            role: "Software Architect",
            type: "Remote",
            duration: "2024 - 2025",
            technologies: ["React", "Next.js", "TypeScript", "Node.js"],
            description: "Leading technical architecture of a blockchain-based film funding platform.",
            achievements: [
                "Architecting migration from CRA to Next.js for improved performance, SEO, and DX",
                "Established release process enabling faster deployments and reliable rollbacks",
                "Implementing system-wide monitoring and security improvements",
            ],
        },
        {
            company: "Parabol",
            role: "Senior Full Stack Developer",
            type: "Remote",
            duration: "2021 - 2024",
            technologies: ["React", "TypeScript", "Node.js", "GraphQL", "Tailwind CSS"],
            description: "Built and maintained real-time collaboration features for distributed team management.",
            achievements: [
                "Implemented real-time data synchronization reducing latency by 60%",
                "Built design system components used across entire application",
                "Led refactoring of state management improving code maintainability",
            ],
        },
    ],

    skills: [
        "React/Next.js/Remix",
        "TypeScript",
        "Tailwind CSS",
        "Design Systems",
        "WebRTC",
        "WebSockets",
        "Node.js",
        "GraphQL",
        "PostgreSQL",
        "Redis",
    ],

    projects: [
        {
            name: "Monito",
            description:
                "Browser extension for debugging web applications. Includes taking screenshots, screen recording, E2E tests generation and generating bug reports",
            technologies: ["TypeScript", "Next.js", "Vite"],
            additionalTech: ["Browser Extension", "PostgreSQL"],
            github: "https://github.com",
            featured: true,
        },
        {
            name: "Consultly",
            description: "Platform for online consultations with real-time video meetings and scheduling",
            technologies: ["TypeScript", "Next.js", "Vite"],
            additionalTech: ["GraphQL", "WebRTC", "Tailwind CSS"],
            github: "https://github.com",
            featured: true,
        },
        {
            name: "Minimalist CV",
            description:
                "An open source minimalist, print friendly CV template with a focus on readability and clean design. >9k stars on GitHub",
            technologies: ["TypeScript", "Next.js", "Tailwind CSS"],
            github: "https://github.com",
            featured: true,
        },
    ],
}
