export type CaseStudySlug = "lms" | "exg" | "techap"

export type CaseStudyFigure = {
    src: string
    alt: string
    caption: string
    /** true when real anonymized crop is not available yet */
    placeholder?: boolean
}

export type CaseStudyDecision = {
    title: string
    body: string
}

export type CaseStudyHighlight = {
    title: string
    body: string
}

export type CaseStudyProblem = {
    title: string
    points: string[]
}

export type CaseStudy = {
    slug: CaseStudySlug
    name: string
    outcome: string
    role: string
    company: string
    contextLabel: string
    liveUrl: string
    liveLabel: string
    /** Optional product logo URL; FaviconSquircle falls back to liveUrl favicon when omitted */
    icon?: string
    stack: string[]
    impact: string[]
    context: string
    problem: CaseStudyProblem[]
    owned: string
    notOwned?: string
    approach: CaseStudyDecision[]
    highlights: CaseStudyHighlight[]
    figures: CaseStudyFigure[]
    outcomeDetail: string
    quote?: { text: string; attribution: string }
    reflection: string
    talkTracks: string[]
}

const CASE_STUDIES: Record<CaseStudySlug, CaseStudy> = {
    lms: {
        slug: "lms",
        name: "LMS Platform",
        outcome: "End-to-end learning workflows",
        role: "Frontend engineer — owned roles, progress tracking, and certificates on the learning product surface",
        company: "Techap Solutions",
        contextLabel: "Enterprise / institutional LMS",
        liveUrl: "https://lms.learnxg.com/en",
        liveLabel: "Open LearnXG",
        icon: "https://lms.learnxg.com/icon1.png",
        stack: [
            "Next.js",
            "TypeScript",
            "RBAC",
            "SCORM player boundary",
            "Progress APIs",
            "PDF certificates",
        ],
        impact: [
            "Shipped production RBAC, progress, and certificate flows for organizational learning",
            "Kept SCORM runtime isolated so the rest of the app stayed maintainable",
            "Tickets marked done passed review without rework — edge cases handled before QA",
        ],
        context:
            "LearnXG is an enterprise learning platform that helps institutions and corporate training teams assign courses, track progress across SCORM and native content, and issue certificates.",
        problem: [
            {
                title: "Roles that leak",
                points: [
                    "Multi-role access spans admin, author, and learner surfaces",
                    "UI-only hiding turns every screen into a permission special-case",
                    "Forbidden areas must fail closed on routes and server responses",
                ],
            },
            {
                title: "Progress and credentials that break trust",
                points: [
                    "Industry SCORM packages bring legacy resume and completion quirks",
                    "Dashboards disagree with what learners actually finished",
                    "Certificate UX had to feel automatic without going opaque on failure",
                    "Retries must not mint duplicates — ops should not print certificates",
                ],
            },
        ],
        owned:
            "Independently owned the product surfaces for roles (RBAC), learner progress tracking, and certificate generation/verification flows — taking them through to production.",
        notOwned:
            "Broader platform infra and other Techap products were shared or parallel work; this study focuses on the LMS learning lifecycle surfaces above.",
        approach: [
            {
                title: "Layout chrome + RBAC-gated routes",
                body: "Kept shell navigation in the layout so course switches did not remount the whole app. Permission checks lived on routes and server responses — not only as hidden buttons — so forbidden areas failed closed.",
            },
            {
                title: "SCORM player behind a boundary",
                body: "Isolated the SCORM runtime behind a player module that speaks CMI. The catalog, progress, and certificate features never poked iframe internals, which contained legacy quirks to one place.",
            },
            {
                title: "Progress and certificates as feature modules",
                body: "Treated progress and certificates as their own data hooks and UI, not as afterthoughts on the player page. Certificate generation stayed idempotent and template-driven so retries did not mint duplicates.",
            },
        ],
        highlights: [
            {
                title: "Role surfaces that match real orgs",
                body: "Modeled Super Admin / Admin / Author / Learner paths so authors could build and assign without inheriting full tenant power, and learners only saw assigned work.",
            },
            {
                title: "Progress correctness under messy content",
                body: "Handled resume-video and SCORM completion edge cases so dashboards reflected what learners actually finished — the failure mode that breaks trust fastest.",
            },
            {
                title: "Certificates without a support ticket",
                body: "Automated PDF certificates with a clear success/failure path and verification-minded identifiers so ops was not the certificate printer.",
            },
        ],
        figures: [
            {
                src: "/case-studies/lms/roles.svg",
                alt: "Placeholder for anonymized LMS roles UI",
                caption: "RBAC: role-appropriate navigation and actions",
                placeholder: true,
            },
            {
                src: "/case-studies/lms/progress.svg",
                alt: "Placeholder for anonymized LMS progress UI",
                caption: "Progress tracking across assigned courses",
                placeholder: true,
            },
            {
                src: "/case-studies/lms/certificate.svg",
                alt: "Placeholder for anonymized certificate UI",
                caption: "Certificate generation and verification path",
                placeholder: true,
            },
        ],
        outcomeDetail:
            "Organizations can run assign → learn → assess → certify on a production LMS with secure role boundaries. The learning lifecycle surfaces I owned shipped and stayed review-clean under QA.",
        quote: {
            text: "On the LMS, he independently owned roles, progress tracking, and certificates.",
            attribution: "Sushant Ipte, Lead Software Engineer",
        },
        reflection:
            "I would keep the SCORM boundary and feature-module split on the next LMS. The reusable lesson is treating credentials and progress as products with their own failure modes, not footer features on a player.",
        talkTracks: [
            "RBAC vs hiding buttons",
            "Isolating SCORM/CMI from App Router UI",
            "Idempotent certificate generation",
            "Progress APIs that avoid N+1 course fetches",
        ],
    },
    exg: {
        slug: "exg",
        name: "EXG",
        outcome: "ESG reporting at enterprise scale",
        role: "Frontend engineer — schema-driven reporting modules, approvals, KPI dashboards, and high-performance tables",
        company: "Techap Solutions",
        contextLabel: "ESG compliance & BRSR/GRI reporting",
        liveUrl: "https://www.exgglobal.com/",
        liveLabel: "Open EXG",
        stack: [
            "Next.js",
            "TypeScript",
            "TanStack Table",
            "Schema-driven forms",
            "Approval workflows",
            "KPI dashboards",
        ],
        impact: [
            "Shipped BRSR/GRI reporting modules with schema-driven forms",
            "Built approval workflows that made resubmit/reject explicit",
            "Integrated TanStack Table for large compliance datasets without melting the UI",
        ],
        context:
            "EXG is an ESG reporting platform that helps companies collect environmental, social, and governance data across sites and produce framework-aligned reports such as BRSR and GRI.",
        problem: [
            {
                title: "Schemas and tables that don't scale",
                points: [
                    "BRSR/GRI definitions shift year to year",
                    "One-off form pages collapse under framework updates",
                    "Compliance grids get wide and dense as row counts grow",
                    "Naive tables stop being usable for auditors and analysts",
                ],
            },
            {
                title: "Approval as a boolean",
                points: [
                    "Submit, approve, reject, and resubmit is a real state machine",
                    "A single flag hides the loop contributors and reviewers need",
                    "Rejection must be actionable without side channels",
                ],
            },
        ],
        owned:
            "Developed enterprise BRSR/GRI reporting modules: schema-driven forms, approval workflows, KPI dashboards, and TanStack Table integrations for large-scale data management.",
        notOwned:
            "Backend data lakes, IoT device firmware, and customer-specific consulting delivery were outside this frontend ownership scope.",
        approach: [
            {
                title: "Schema-driven forms over one-off pages",
                body: "Rendered reporting fields from schema so framework updates did not require a new page per disclosure. Validation and layout stayed data-driven.",
            },
            {
                title: "Tables built for volume",
                body: "Used TanStack Table patterns suited to wide, dense compliance grids so filtering and scrolling stayed usable as row counts grew.",
            },
            {
                title: "Approvals as explicit state",
                body: "Modeled submit / approve / reject / resubmit in the UI so contributors and reviewers shared the same mental model — not a hidden button that only admins understood.",
            },
        ],
        highlights: [
            {
                title: "Schema and versioning UX",
                body: "Kept form rendering resilient when disclosure definitions shifted between reporting cycles.",
            },
            {
                title: "Large-table performance",
                body: "Focused on interaction cost for dense ESG grids — the surface auditors and analysts live in daily.",
            },
            {
                title: "Approval / resubmit loop",
                body: "Made rejection actionable: contributors could see what to fix and re-enter the workflow without side channels.",
            },
        ],
        figures: [
            {
                src: "/case-studies/exg/forms.svg",
                alt: "Placeholder for anonymized schema form UI",
                caption: "Schema-driven disclosure forms",
                placeholder: true,
            },
            {
                src: "/case-studies/exg/table.svg",
                alt: "Placeholder for anonymized table UI",
                caption: "High-density reporting tables",
                placeholder: true,
            },
            {
                src: "/case-studies/exg/approvals.svg",
                alt: "Placeholder for anonymized approvals UI",
                caption: "Approval and resubmit workflow",
                placeholder: true,
            },
        ],
        outcomeDetail:
            "Reporting teams can capture framework-aligned data, move it through approvals, and manage large tables from KPI-oriented dashboards — simplifying regulatory reporting operations.",
        reflection:
            "Schema-first UI and honest approval states transfer to any compliance-heavy product. I would invest even earlier in empty/error states for rejected submissions.",
        talkTracks: [
            "Schema-driven forms vs hand-built pages",
            "TanStack Table for wide compliance grids",
            "Approval state machines in UI",
            "RBAC plus resource attributes for multi-site orgs",
        ],
    },
    techap: {
        slug: "techap",
        name: "Techap website",
        outcome: "Company presence for client acquisition",
        role: "Frontend engineer — end-to-end company site: services, solutions, portfolio, social proof, and inquiry flows",
        company: "Techap Solutions",
        contextLabel: "Marketing & company presence",
        liveUrl: "https://techapsol.com/",
        liveLabel: "Open techapsol.com",
        icon: "https://www.techapsol.com/logo/android-chrome-512x512.png",
        stack: [
            "Next.js",
            "TypeScript",
            "Marketing pages",
            "Project portfolio",
            "Inquiry workflows",
        ],
        impact: [
            "Shipped the end-to-end company website as Techap’s primary digital presence",
            "Covered services, solutions, project portfolio, testimonials, FAQ, and inquiry flows",
            "Gave enterprise prospects a clear path from capability story to contact",
        ],
        context:
            "The Techap website is the company’s public site that helps enterprise prospects understand services and solutions, review shipped work, and start an inquiry.",
        problem: [
            {
                title: "Buyer journey that dead-ends",
                points: [
                    "Polished marketing often fails the path from story to contact",
                    "Weak portfolio structure buries proof of shipped work",
                    "Inquiry paths get lost behind capability pages",
                ],
            },
            {
                title: "Marketing that fights the product stack",
                points: [
                    "Heavy surfaces undermine SEO, discovery, and load speed",
                    "Enterprise prospects notice slow marketing immediately",
                    "Site had to stay fast and maintainable in the same Next.js stack",
                    "Marketing defaults differ from authenticated product dashboards",
                ],
            },
        ],
        owned:
            "Engineered the end-to-end company website spanning services, solutions, project portfolio, testimonials, FAQ, and inquiry workflows.",
        notOwned:
            "Brand identity and long-form sales content strategy sat with the business; this study focuses on the frontend product that carries that story.",
        approach: [
            {
                title: "Route-per-intent marketing structure",
                body: "Organized the site around buyer questions — what we do, what we’ve shipped, proof, and how to reach us — instead of a single scrolling dump. Project pages (including LMS and EXG) sit in a clear portfolio model.",
            },
            {
                title: "Static-friendly performance defaults",
                body: "Treated marketing surfaces as mostly static where possible so imagery and content load predictably. Local assets and sensible image handling matter more here than on authenticated product dashboards.",
            },
            {
                title: "Inquiry as a first-class flow",
                body: "Kept contact and inquiry paths obvious from the main journeys so the site ends in a conversation, not a dead-end about page.",
            },
        ],
        highlights: [
            {
                title: "Services and solutions narrative",
                body: "Structured capability pages so prospects can scan offerings without hunting through product jargon.",
            },
            {
                title: "Project portfolio that mirrors real work",
                body: "Surfaced shipped products like LMS and EXG in a portfolio format that supports credibility in enterprise sales conversations.",
            },
            {
                title: "Social proof and FAQ near conversion",
                body: "Paired testimonials and FAQ with inquiry so common objections and trust signals sit next to the ask.",
            },
        ],
        figures: [
            {
                src: "/case-studies/techap/home.svg",
                alt: "Placeholder for Techap home UI",
                caption: "Home — enterprise positioning and primary CTAs",
                placeholder: true,
            },
            {
                src: "/case-studies/techap/portfolio.svg",
                alt: "Placeholder for Techap portfolio UI",
                caption: "Projects — portfolio of shipped client work",
                placeholder: true,
            },
            {
                src: "/case-studies/techap/inquiry.svg",
                alt: "Placeholder for Techap inquiry UI",
                caption: "Contact — inquiry flow for client acquisition",
                placeholder: true,
            },
        ],
        outcomeDetail:
            "Techap has a production marketing site that carries services, portfolio, and inquiry — the primary digital presence used for enterprise client acquisition.",
        reflection:
            "Marketing sites earn trust when structure matches the sales conversation. I would invest even earlier in measurable CTA paths and content that stays easy for non-engineers to update.",
        talkTracks: [
            "SSG vs dynamic for marketing vs product apps",
            "Portfolio IA for agency / product studios",
            "Inquiry UX and conversion paths",
            "Image and performance defaults on marketing Next.js sites",
        ],
    },
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
    if (slug in CASE_STUDIES) return CASE_STUDIES[slug as CaseStudySlug]
    return undefined
}

export function getCaseStudySlugs(): CaseStudySlug[] {
    return ["lms", "exg", "techap"]
}
