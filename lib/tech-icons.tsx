import type { IconType } from "react-icons"
import {
    SiAxios,
    SiChakraui,
    SiClaude,
    SiCss,
    SiCursor,
    SiExpress,
    SiGit,
    SiGithub,
    SiGithubcopilot,
    SiHtml5,
    SiJavascript,
    SiMongodb,
    SiMui,
    SiNextdotjs,
    SiNodedotjs,
    SiRazorpay,
    SiReact,
    SiReacthookform,
    SiRedux,
    SiShadcnui,
    SiStripe,
    SiTailwindcss,
    SiTypescript,
    SiVite,
    SiWindsurf,
    SiZod,
} from "react-icons/si"
import { TbBrandOpenai, TbBrandVscode } from "react-icons/tb"

type TechIconEntry = {
    icon: IconType
    color?: string
}

const TECH_ICONS: Record<string, TechIconEntry> = {
    JavaScript: { icon: SiJavascript, color: "#F7DF1E" },
    TypeScript: { icon: SiTypescript, color: "#3178C6" },
    "React.js": { icon: SiReact, color: "#61DAFB" },
    React: { icon: SiReact, color: "#61DAFB" },
    "Next.js": { icon: SiNextdotjs },
    "Next.js (App Router)": { icon: SiNextdotjs },
    HTML: { icon: SiHtml5, color: "#E34F26" },
    CSS: { icon: SiCss, color: "#1572B6" },
    "Tailwind CSS": { icon: SiTailwindcss, color: "#06B6D4" },
    "Shadcn UI": { icon: SiShadcnui },
    "Material UI": { icon: SiMui, color: "#007FFF" },
    "Chakra UI": { icon: SiChakraui, color: "#319795" },
    Redux: { icon: SiRedux, color: "#764ABC" },
    "React Hook Form": { icon: SiReacthookform, color: "#EC5990" },
    "Node.js": { icon: SiNodedotjs, color: "#339933" },
    Express: { icon: SiExpress },
    MongoDB: { icon: SiMongodb, color: "#47A248" },
    "Git & GitHub": { icon: SiGithub },
    Git: { icon: SiGit, color: "#F05032" },
    GitHub: { icon: SiGithub },
    Vite: { icon: SiVite, color: "#646CFF" },
    "React Native": { icon: SiReact, color: "#61DAFB" },
    Axios: { icon: SiAxios, color: "#5A29E4" },
    Zod: { icon: SiZod, color: "#3E67B1" },
    "VS Code": { icon: TbBrandVscode, color: "#007ACC" },
    Stripe: { icon: SiStripe, color: "#635BFF" },
    Razorpay: { icon: SiRazorpay, color: "#0C2451" },
    Cursor: { icon: SiCursor },
    Claude: { icon: SiClaude, color: "#D97757" },
    "GitHub Copilot": { icon: SiGithubcopilot },
    Windsurf: { icon: SiWindsurf, color: "#0FBF9F" },
    ChatGPT: { icon: TbBrandOpenai, color: "#10A37F" },
}

export function getTechIcon(name: string): TechIconEntry | undefined {
    return TECH_ICONS[name]
}
