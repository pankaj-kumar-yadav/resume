export const RESUME_PDF_URL =
    "https://s09ykw6qje.ufs.sh/f/ml9JKQ59IhvzxOuXixw8i3EfyeKtgjGuJrMLRq5sYawPFThN"

export const RESUME_DATA = {
    name: "Pankaj Kumar Yadav",
    title: "Software Engineer",
    subtitle: "Build scalable, production-grade web and mobile applications.",
    location: "Mumbai, India",
    email: "pankaj981966@gmail.com",
    phone: "+91 99679 17443",
    about: [
        "Build scalable web and mobile applications with Next.js, React, and TypeScript—from authentication and payments to data-heavy dashboards and role-based workflows.",
        "Ship production software across LMS, ESG reporting, enterprise workflows, EdTech commerce, and social-health platforms, with a focus on reusable architecture, secure integrations, and maintainable interfaces.",
    ],
    profileImage:
        "https://s09ykw6qje.ufs.sh/f/ml9JKQ59IhvzPN7amQJoyQ8w7BS2mYk1dpcNabOi9RfWVguF",

    socials: [
        {
            label: "Website",
            href: "https://pankaj-kumar-yadav.vercel.app",
            icon: "website",
        },
        {
            label: "Email",
            href: "mailto:pankaj981966@gmail.com",
            icon: "mail",
        },
        {
            label: "Phone",
            href: "tel:+919967917443",
            icon: "phone",
        },
        {
            label: "GitHub",
            href: "https://github.com/pankaj-kumar-yadav",
            icon: "github",
        },
        {
            label: "LinkedIn",
            href: "https://linkedin.com/in/pankajkumaryadav67",
            icon: "linkedin",
        },
        {
            label: "Twitter",
            href: "https://x.com/pankaj_yadav_67",
            icon: "twitter",
        },
    ],

    experience: [
        {
            company: "Techap Solutions",
            role: "Junior Software Engineer",
            type: "Remote",
            duration: "Mar 2024 – Present",
            links: [
                {
                    label: "LMS Platform",
                    url: "https://lms.learnxg.com/",
                },
                {
                    label: "EXG (ESG Platform)",
                    url: "https://www.exgglobal.com/",
                },
                {
                    label: "Techap Solutions Website",
                    url: "https://techapsol.com/",
                },
                {
                    label: "BotJunior (K–5 EdTech Commerce)",
                    url: "https://www.botjunior.com/",
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
                "Delivered production-grade web and mobile solutions across LMS, ESG reporting, enterprise workflow, EdTech commerce, and social-health platforms.",
            achievements: [
                "LMS Platform: Engineered a full-featured learning management system with SCORM support, RBAC, progress tracking, assessments, and certificate generation, enabling organizations to deliver and manage end-to-end online learning workflows securely.",
                "EXG (ESG Platform): Developed enterprise BRSR/GRI reporting modules featuring schema-driven forms, approval workflows, KPI dashboards, and high-performance TanStack Table integrations, simplifying regulatory reporting and large-scale data management.",
                "Techap Solutions Website: Engineered the end-to-end company website spanning services, solutions, project portfolio, testimonials, FAQ, and inquiry workflows, establishing Techap’s primary digital presence for enterprise client acquisition.",
                "Continuum / BSafe (React Native): Modernized enterprise permit-to-work workflows across General, Solar, Shutdown, LOTO, Heavy Equipment, and Substation modules by delivering reusable components, role-based approvals, notifications, dashboards, and PDF generation, improving maintainability and feature consistency.",
                "BotJunior (K–5 EdTech Commerce): Delivered JWT-based authentication and Razorpay payment integration supporting single and bundled purchases, dynamic pricing, and secure access control, enabling a complete digital commerce workflow.",
                "Omooma: Developed social networking and health-tracking features while integrating Stripe subscriptions and secure billing, supporting premium membership and role-based access management.",
                "Architected reusable frontend infrastructure including schema-driven forms, URL-synchronized tables, shared API layers, and reusable UI components, reducing code duplication and accelerating feature delivery across projects.",
                "Established centralized API communication, automated authentication lifecycle management, and secure routing patterns, improving application reliability and developer productivity across multiple production systems.",
                "Engineered scalable applications using Next.js, TypeScript, React Native, Zustand, and Axios, delivering production-ready solutions across LMS, ESG, EdTech, enterprise workflow, and commerce platforms.",
            ],
        },
    ],

    skills: [
        {
            category: "Languages",
            items: ["JavaScript", "TypeScript", "HTML", "CSS"],
        },
        {
            category: "Frameworks & libraries",
            items: [
                "React.js",
                "Next.js",
                "Tailwind CSS",
                "Shadcn UI",
                "Material UI",
                "Chakra UI",
                "Zustand",
                "Redux",
                "Easy-Peasy",
                "Express",
            ],
        },
        {
            category: "Technology",
            items: ["Node.js", "MongoDB"],
        },
        {
            category: "Developer Tools",
            items: ["Git", "GitHub"],
        },
        {
            category: "AI Tools",
            items: ["Cursor", "Claude", "GitHub Copilot", "Windsurf", "ChatGPT"],
        },
    ],

    projects: [
        {
            name: "Convert Desk – XLSX to JSON Converter",
            description:
                "Engineered a privacy-first Excel-to-JSON conversion platform that performs all processing within the browser, eliminating server-side data exposure.",
            technologies: ["Next.js", "TypeScript", "Tailwind CSS", "XLSX", "Shadcn UI"],
            achievements: [
                "Engineered a privacy-first Excel-to-JSON conversion platform that performs all processing within the browser, eliminating server-side data exposure while ensuring secure file handling.",
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
                "Engineered an interactive English reading assessment platform with timed passages, randomized curated content, and MCQ comprehension questions, enabling users to measure reading fluency and understanding in a single session.",
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
};
