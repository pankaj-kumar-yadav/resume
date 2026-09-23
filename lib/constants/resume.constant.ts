export const RESUME_PDF_FILE_ID = "1nUHlDCzBWuf2vXBwHiEPEgVyasK8mEje"

export const RESUME_PDF_URL =
    `https://drive.google.com/file/d/${RESUME_PDF_FILE_ID}/view?usp=sharing`

export const RESUME_PDF_DOWNLOAD_URL =
    `https://drive.google.com/uc?export=download&id=${RESUME_PDF_FILE_ID}`

export const HERO = {
    greeting: "Hey, I'm Pankaj",
    line: "I build production web and mobile apps — auth, payments, dashboards, and messy enterprise workflows.",
    currentLabel: "Building at",
    currentName: "Techap Solutions",
    currentHref: "https://techapsol.com/",
    voice: "I like when complicated systems feel simple.",
    cta: "Say hello",
    ctaHref: "/socials",
} as const

export const HERO_MARKS = [
    {
        name: "StratXG",
        href: "https://lms.learnxg.com/en",
        icon: "https://lms.learnxg.com/icon1.png",
    },
    {
        name: "EXG",
        href: "https://www.exgglobal.com/",
    },
    {
        name: "BotJunior",
        href: "https://www.botjunior.com/",
        icon: "https://www.botjunior.com/img/logos/botjunior_favicon.png",
    },
    {
        name: "Continuum",
        href: "https://www.continuumenergy.in/",
        icon: "https://www.continuumenergy.in/img/logo-fav.png",
    },
    {
        name: "Techap Solutions",
        href: "https://techapsol.com/",
        icon: "https://www.techapsol.com/logo/android-chrome-512x512.png",
    },
] as const

export type WorkItem = {
    name: string
    href?: string
    icon?: string
    outcome: string
    summary: string
    featured?: boolean
}

export const WORK: WorkItem[] = [
    {
        name: "LMS Platform",
        href: "https://lms.learnxg.com/en",
        icon: "https://lms.learnxg.com/icon1.png",
        outcome: "End-to-end learning",
        summary:
            "SCORM, RBAC, assessments, and certificates for organizations running online learning.",
        featured: true,
    },
    {
        name: "EXG",
        href: "https://www.exgglobal.com/",
        outcome: "ESG reporting",
        summary:
            "BRSR/GRI reporting with schema-driven forms, approvals, and KPI dashboards.",
        featured: true,
    },
    {
        name: "BotJunior",
        href: "https://www.botjunior.com/",
        icon: "https://www.botjunior.com/img/logos/botjunior_favicon.png",
        outcome: "EdTech commerce",
        summary:
            "JWT auth and Razorpay checkout for single and bundled K–5 course purchases.",
        featured: true,
    },
    {
        name: "Continuum",
        href: "https://www.continuumenergy.in/",
        icon: "https://www.continuumenergy.in/img/logo-fav.png",
        outcome: "Permit-to-work",
        summary:
            "Reusable React Native workflows across General, Solar, Shutdown, LOTO, and Substation permits.",
        featured: true,
    },
    {
        name: "Omooma",
        href: "https://omooma.com/en/",
        outcome: "Stripe subscriptions",
        summary:
            "Social networking and health-tracking with Stripe billing and role-based premium access.",
    },
    {
        name: "Techap website",
        href: "https://techapsol.com/",
        icon: "https://www.techapsol.com/logo/android-chrome-512x512.png",
        outcome: "Company presence",
        summary:
            "Services, portfolio, and inquiry flows — the company's primary site for client acquisition.",
    },
]

export type PersonQuote = {
    name: string
    role: string
    company: string
    href: string
    quote: string
    image?: string
}

export const PEOPLE_SAY: PersonQuote[] = [
    {
        name: "Sushant Ipte",
        role: "Lead Software Engineer",
        company: "Mitr Learning & Media",
        href: "https://www.linkedin.com/in/sushant-ipte-291513139/",
        image: "/people/sushant-ipte.jpg",
        quote: "Pankaj takes **complex product surfaces** through to **production**. On the LMS, he independently owned **roles, progress tracking, and certificates**.",
    },
    {
        name: "Deepak Sethi",
        role: "Chief Center of Excellence",
        company: "StratXG",
        href: "https://www.linkedin.com/in/deepak-s-b646b9135/",
        image: "/people/deepak-sethi.jpg",
        quote: "He treats **enterprise workflows** as a **product**, not a backlog of tickets. Delivery remained clear, and he left a **system** the next engineer could maintain.",
    },
    {
        name: "Raj Chauhan",
        role: "Project Manager",
        company: "StratXG",
        href: "https://www.linkedin.com/in/raj-chauhan-023a4316b/",
        image: "/people/raj-chauhan.jpg",
        quote: "On the LMS, work he marked complete **passed review without rework**. Tickets included **edge cases already addressed**, which reduced the QA cycle.",
    },
]

export const RESUME_DATA = {
    name: "Pankajkumar Yadav",
    title: "Software Engineer",
    subtitle: "Build scalable, production-grade web and mobile applications.",
    location: "Mumbai, India",
    email: "pankaj981966@gmail.com",
    phone: "+91 99679 17443",
    about: [HERO.line],
    profileImage:
        "https://s09ykw6qje.ufs.sh/f/ml9JKQ59IhvzPN7amQJoyQ8w7BS2mYk1dpcNabOi9RfWVguF",

    socials: [
        {
            label: "Website",
            href: "https://pankaj-kumar-yadav.vercel.app",
            icon: "website",
            group: "work",
        },
        {
            label: "Email",
            href: "mailto:pankaj981966@gmail.com",
            icon: "mail",
            group: "contact",
        },
        {
            label: "Phone",
            href: "tel:+919967917443",
            icon: "phone",
            group: "contact",
        },
        {
            label: "GitHub",
            href: "https://github.com/pankaj-kumar-yadav",
            icon: "github",
            group: "work",
        },
        {
            label: "GitLab",
            href: "https://gitlab.com/pankaj981966",
            icon: "gitlab",
            group: "work",
        },
        {
            label: "LeetCode",
            href: "https://leetcode.com/u/pankaj9967",
            icon: "leetcode",
            group: "practice",
        },
        {
            label: "GeeksforGeeks",
            href: "https://www.geeksforgeeks.org/profile/pankaj981966",
            icon: "geeksforgeeks",
            group: "practice",
        },
        {
            label: "HackerRank",
            href: "https://www.hackerrank.com/profile/Pankaj981966",
            icon: "hackerrank",
            group: "practice",
        },
        {
            label: "LinkedIn",
            href: "https://linkedin.com/in/pankajkumaryadav67",
            icon: "linkedin",
            group: "work",
        },
        {
            label: "Twitter",
            href: "https://x.com/pankaj_yadav_67",
            icon: "twitter",
            group: "work",
        },
    ],

    experience: [
        {
            company: "Techap Solutions",
            website: "https://techapsol.com/",
            icon: "https://www.techapsol.com/logo/android-chrome-512x512.png",
            role: "Junior Software Engineer",
            type: "Remote",
            duration: "Mar 2024 – Present",
            links: [
                {
                    label: "LMS Platform",
                    url: "https://lms.learnxg.com/en",
                    icon: "https://lms.learnxg.com/icon1.png",
                },
                {
                    label: "EXG (ESG Platform)",
                    url: "https://www.exgglobal.com/",
                },
                {
                    label: "Techap Solutions Website",
                    url: "https://techapsol.com/",
                    icon: "https://www.techapsol.com/logo/android-chrome-512x512.png",
                },
                {
                    label: "BotJunior (K–5 EdTech Commerce)",
                    url: "https://www.botjunior.com/",
                    icon: "https://www.botjunior.com/img/logos/botjunior_favicon.png",
                },
                {
                    label: "Continuum / BSafe (React Native)",
                    url: "https://www.continuumenergy.in/",
                    icon: "https://www.continuumenergy.in/img/logo-fav.png",
                },
                {
                    label: "Omooma",
                    url: "https://omooma.com/en/",
                },
            ],
            technologies: [
                "Next.js",
                "React",
                "React Native",
                "Vite",
                "TypeScript",
                "Zustand",
                "Axios",
                "Shadcn UI",
                "Tailwind CSS",
                "Stripe",
                "Razorpay",
            ],
            description:
                "Delivered production-grade web and mobile solutions across **LMS**, **ESG reporting**, **enterprise workflow**, **EdTech commerce**, and **social-health** platforms.",
            achievements: [
                "LMS Platform: Engineered a full-featured learning management system with **SCORM** support, **RBAC**, **progress tracking**, **assessments**, and **certificate generation**, enabling organizations to deliver and manage end-to-end online learning workflows securely.",
                "EXG (ESG Platform): Developed enterprise **BRSR/GRI** reporting modules featuring **schema-driven forms**, **approval workflows**, **KPI dashboards**, and high-performance **TanStack Table** integrations, simplifying regulatory reporting and large-scale data management.",
                "Techap Solutions Website: Engineered the **end-to-end company website** spanning services, solutions, project portfolio, testimonials, FAQ, and inquiry workflows, establishing Techap’s **primary digital presence** for enterprise client acquisition.",
                "BotJunior (K–5 EdTech Commerce): Delivered **JWT-based authentication** and **Razorpay** payment integration supporting single and bundled purchases, **dynamic pricing**, and **secure access control**, enabling a complete digital commerce workflow.",
                "Continuum / BSafe (React Native): Modernized enterprise **permit-to-work** workflows across General, Solar, Shutdown, LOTO, Heavy Equipment, and Substation modules by delivering **reusable components**, **role-based approvals**, notifications, dashboards, and **PDF generation**, improving maintainability and feature consistency.",
                "Omooma: Developed social networking and health-tracking features while integrating **Stripe subscriptions** and **secure billing**, supporting premium membership and **role-based access management**.",
                "Architected reusable frontend infrastructure including **schema-driven forms**, **URL-synchronized tables**, **shared API layers**, and **reusable UI components**, reducing code duplication and accelerating feature delivery across projects.",
                "Established **centralized API communication**, **automated authentication lifecycle** management, and **secure routing** patterns, improving application reliability and developer productivity across multiple production systems.",
                "Engineered scalable applications using **Next.js**, **TypeScript**, **React Native**, **Zustand**, and **Axios**, delivering production-ready solutions across LMS, ESG, EdTech, enterprise workflow, and commerce platforms.",
            ],
        },
    ],

    skills: [
        {
            category: "Languages",
            items: ["JavaScript", "TypeScript", "HTML", "CSS"],
        },
        {
            category: "Frontend",
            items: [
                "React.js",
                "Next.js",
                "Tailwind CSS",
                "Shadcn UI",
                "Material UI",
                "Chakra UI",
                "React Hook Form",
                "Redux",
                "Zustand",
                "Easy-Peasy",
                "Axios",
                "Zod",
            ],
        },
        {
            category: "Backend",
            items: ["Node.js", "Express"],
        },
        {
            category: "Database",
            items: ["MongoDB", "PostgreSQL", "MySQL"],
        },
        {
            category: "Tools",
            items: [
                "Git",
                "GitHub",
                "VS Code",
                "Cursor",
                "Claude",
                "GitHub Copilot",
                "Windsurf",
                "ChatGPT",
            ],
        },
    ],

    projects: [
        {
            name: "Relay – Self-hosted Project Management",
            description:
                "Self-hosted project management platform with issues, cycles, and org-scoped data — Linear-inspired UI with Express API.",
            technologies: ["Next.js", "TypeScript", "Express", "PostgreSQL", "Prisma"],
            achievements: [
                "Implemented organization-scoped workspaces with invite-based membership, issues (status, priority, assignees, comments, attachments), teams, cycles, saved views, and in-app inbox notifications.",
                "Designed a Docker Compose self-hosting stack for web, API, Postgres, and MinIO, with S3-compatible file storage, session auth, and email invites.",
            ],
            additionalTech: ["Turborepo", "TanStack Query"],
            github: "https://github.com/pankaj-kumar-yadav/relay",
            live: "https://relay-web-1.vercel.app",
            featured: true,
        },
        {
            name: "Convert Desk – XLSX to JSON Converter",
            description:
                "Engineered a privacy-first Excel-to-JSON conversion platform that performs all processing within the browser, eliminating server-side data exposure.",
            technologies: ["Next.js", "TypeScript", "Tailwind CSS", "XLSX", "Shadcn UI"],
            achievements: [
                "Implemented multi-sheet parsing, intelligent data transformation, column mapping, manual value insertion, and drag-and-drop workflows, enabling flexible conversion for complex spreadsheets.",
                "Designed conversion history and real-time preview capabilities, improving usability and allowing users to validate and manage transformed data efficiently.",
            ],
            additionalTech: ["Client-side Processing", "Offline Support"],
            github: "https://github.com/pankaj-kumar-yadav/convert-desk",
            live: "https://convert-desk.vercel.app",
            featured: true,
        },
        {
            name: "ReadSpeed – English Reading Speed & Comprehension Test",
            description:
                "Engineered an interactive English reading assessment platform that measures WPM and comprehension through timed passages and MCQ-based testing.",
            technologies: ["Next.js (App Router)", "TypeScript", "Tailwind CSS", "Shadcn UI"],
            achievements: [
                "Implemented accurate WPM calculation with accuracy-weighted scoring and detailed performance breakdowns, ensuring results reflect both reading speed and comprehension quality.",
                "Designed persistent result tracking with JSON-based storage and an educational results experience, helping users monitor reading progress and understand performance metrics over time.",
            ],
            additionalTech: ["WPM Analytics", "JSON Persistence"],
            github: "https://github.com/pankaj-kumar-yadav/speed-test",
            live: "https://speed-test-platform.vercel.app",
            featured: true,
        },
    ],

    education: [
        {
            institution: "Mumbai University",
            location: "Mumbai, India",
            degree: "Bachelor of Commerce",
            duration: "2020 – 2023",
        },
        {
            institution: "R.K. Talreja College",
            location: "Mumbai, India",
            degree: "Higher Secondary Certificate (HSC)",
            duration: "2018 – 2020",
        },
    ],
}

export const EXPERIENCE_WORK: WorkItem[] = RESUME_DATA.experience.map((exp) => ({
    name: exp.company,
    icon: exp.icon,
    summary: [exp.role, exp.type].filter(Boolean).join(" · "),
    outcome: exp.duration,
}));
