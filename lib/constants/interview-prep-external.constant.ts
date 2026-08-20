const GFE_JS =
    "https://www.greatfrontend.com/blog/50-must-know-javascript-interview-questions-by-ex-interviewers"
const GFE_REACT_100 =
    "https://www.greatfrontend.com/blog/100-react-interview-questions-straight-from-ex-interviewers"
const GFE_NEXT =
    "https://www.greatfrontend.com/blog/nextjs-interview-questions-for-freshers"
const STACK_NEXT =
    "https://stackinterview.dev/guides/nextjs-interview-questions-and-answers"
const GFE_REACT_GITHUB =
    "https://github.com/greatfrontend/top-reactjs-interview-questions"

function gfeQuiz(slug: string) {
    return `https://www.greatfrontend.com/questions/quiz/${slug}?framework=react&tab=quiz`
}

export const INTERVIEW_PREP_EXTERNAL_UPDATED_AT = {
    iso: "2026-08-20T21:46:00+05:30",
    display: "20 Aug 2026, 9:46 PM IST",
} as const

export const INTERVIEW_PREP_EXTERNAL = {
    title: "Prep lists",
    intro: "Popular and latest questions from GreatFrontEnd (updated 2026, including React 19 and ES2025) and StackInterview. Answers live on their pages — open the full URL.",
    sources: [
        {
            label: "100+ React interview questions",
            href: GFE_REACT_100,
            description: "GreatFrontEnd · May 2026 · React 19 Actions, use, RSC, Compiler",
        },
        {
            label: "Top React.js interview questions",
            href: GFE_REACT_GITHUB,
            description: "GreatFrontEnd GitHub · updated 2026",
        },
        {
            label: "50+ JavaScript interview questions",
            href: GFE_JS,
            description: "GreatFrontEnd · 2026 · ES2025 Set methods, structuredClone, immutable arrays",
        },
        {
            label: "Next.js interview questions for freshers",
            href: GFE_NEXT,
            description: "GreatFrontEnd · 2026 · App Router, Proxy, Server Actions",
        },
        {
            label: "Top 25 Next.js interview questions",
            href: STACK_NEXT,
            description: "StackInterview · 2026 · use cache, PPR, Next.js 15 async APIs",
        },
        {
            label: "React quiz",
            href: "https://www.greatfrontend.com/questions/quiz/react-interview-questions",
            description: "GreatFrontEnd · Jul 2026 questions added",
        },
    ],
    sections: [
        {
            id: "javascript",
            title: "JavaScript",
            blurb: "GreatFrontEnd 50+ JS (2026). Classic asks first, then the May 2026 ES2020+ set.",
            items: [
                { q: "What are the differences between let, var, and const?", href: GFE_JS },
                { q: "Explain the difference between == and ===", href: GFE_JS },
                { q: "Understanding the Event Loop in JavaScript", href: GFE_JS },
                { q: "What is Event Delegation in JavaScript?", href: GFE_JS },
                { q: "How this works in JavaScript", href: GFE_JS },
                { q: "What's the difference between null and undefined?", href: GFE_JS },
                { q: "What's the difference between .call() vs .apply()?", href: GFE_JS },
                { q: "How does Function.prototype.bind work?", href: GFE_JS },
                { q: "How does prototypal inheritance work?", href: GFE_JS },
                { q: "What's the difference between synchronous and asynchronous functions?", href: GFE_JS },
                { q: "What are the differences between XMLHttpRequest and fetch()?", href: GFE_JS },
                { q: "What is debouncing and throttling?", href: GFE_JS },
                { q: "What does optional chaining (?.) do, and where does it short-circuit?", href: GFE_JS },
                { q: "What is nullish coalescing (??) and how does it differ from ||?", href: GFE_JS },
                { q: "How does Promise.allSettled() differ from Promise.all()?", href: GFE_JS },
                { q: "What is Promise.any() and how does it handle rejections?", href: GFE_JS },
                { q: "How do you cancel a fetch request with AbortController?", href: GFE_JS },
                { q: "What's the difference between async/await and raw Promises?", href: GFE_JS },
                { q: "What are the immutable array methods (toSorted, toReversed, toSpliced, with)?", href: GFE_JS },
                { q: "What is Object.groupBy() / Map.groupBy()?", href: GFE_JS },
                { q: "What are the new Set methods (union, intersection, difference)?", href: GFE_JS },
                { q: "What is structuredClone() and how is it different from JSON.parse(JSON.stringify(...))?", href: GFE_JS },
                { q: "What are private class fields (#field)?", href: GFE_JS },
                { q: "ES Modules vs CommonJS: what's the difference?", href: GFE_JS },
                { q: "What is dynamic import() and when would you use it?", href: GFE_JS },
            ],
        },
        {
            id: "react",
            title: "React",
            blurb: "GreatFrontEnd top 50 (2026) plus the May 2026 React 19 set.",
            items: [
                { q: "What is React? Describe the benefits of React", href: gfeQuiz("what-is-react-describe-the-benefits-of-react") },
                { q: "What is the difference between React Node, React Element, and a React Component?", href: gfeQuiz("what-is-the-difference-between-react-node-react-element-and-a-react-component") },
                { q: "What is JSX and how does it work?", href: gfeQuiz("what-is-jsx-and-how-does-it-work") },
                { q: "What is the difference between state and props in React?", href: gfeQuiz("what-is-the-difference-between-state-and-props-in-react") },
                { q: "What is the purpose of the key prop in React?", href: gfeQuiz("what-is-the-purpose-of-the-key-prop-in-react") },
                { q: "What is the consequence of using array indices as keys?", href: gfeQuiz("what-is-the-consequence-of-using-array-indices-as-the-value-for-keys-in-react") },
                { q: "What is the difference between controlled and uncontrolled React Components?", href: gfeQuiz("what-is-the-difference-between-controlled-and-uncontrolled-react-components") },
                { q: "What are some pitfalls about using context in React?", href: gfeQuiz("what-are-some-pitfalls-about-using-context-in-react") },
                { q: "What are the benefits of using hooks in React?", href: gfeQuiz("what-are-the-benefits-of-using-hooks-in-react") },
                { q: "What are the rules of React hooks?", href: gfeQuiz("what-are-the-rules-of-react-hooks") },
                { q: "What is the difference between useEffect and useLayoutEffect?", href: gfeQuiz("what-is-the-difference-between-useeffect-and-uselayouteffect-in-react") },
                { q: "What does the dependency array of useEffect affect?", href: gfeQuiz("what-does-the-dependency-array-of-useeffect-affect") },
                { q: "What is the useRef hook and when should it be used?", href: gfeQuiz("what-is-the-useref-hook-in-react-and-when-should-it-be-used") },
                { q: "What is the useCallback hook and when should it be used?", href: gfeQuiz("what-is-the-usecallback-hook-in-react-and-when-should-it-be-used") },
                { q: "What is the useMemo hook and when should it be used?", href: gfeQuiz("what-is-the-usememo-hook-in-react-and-when-should-it-be-used") },
                { q: "What is the useReducer hook and when should it be used?", href: gfeQuiz("what-is-the-usereducer-hook-in-react-and-when-should-it-be-used") },
                { q: "What does re-rendering mean in React?", href: gfeQuiz("what-does-re-rendering-mean-in-react") },
                { q: "Why does React recommend against mutating state?", href: gfeQuiz("why-does-react-recommend-against-mutating-state") },
                { q: "What are error boundaries in React for?", href: gfeQuiz("what-are-error-boundaries-in-react-for") },
                { q: "Explain what React hydration is", href: gfeQuiz("explain-what-react-hydration-is") },
                { q: "What are React Portals used for?", href: gfeQuiz("what-are-react-portals-used-for") },
                { q: "What is code splitting in a React application?", href: gfeQuiz("what-is-code-splitting-in-a-react-application") },
                { q: "How would one optimize the performance of React contexts to reduce rerenders?", href: gfeQuiz("how-would-one-optimize-the-performance-of-react-contexts-to-reduce-rerenders") },
                { q: "How do you decide between using React state, context, and external state managers?", href: gfeQuiz("how-do-you-decide-between-using-react-state-context-and-external-state-managers") },
                { q: "What is virtual DOM in React?", href: gfeQuiz("what-is-virtual-dom-in-react") },
                { q: "What is React Fiber and how is it an improvement over the previous approach?", href: gfeQuiz("what-is-react-fiber-and-how-is-it-an-improvement-over-the-previous-approach") },
                { q: "What is reconciliation in React?", href: gfeQuiz("what-is-reconciliation-in-react") },
                { q: "What is React Suspense and what does it enable?", href: gfeQuiz("what-is-react-suspense-and-what-does-it-enable") },
                { q: "What's new in React 19?", href: GFE_REACT_100 },
                { q: "What are Actions in React 19?", href: GFE_REACT_100 },
                { q: "What does the useActionState hook do?", href: GFE_REACT_100 },
                { q: "What does useOptimistic do?", href: GFE_REACT_100 },
                { q: "What is the use hook and how is it different from useEffect + fetch?", href: GFE_REACT_100 },
                { q: "What are React Server Components?", href: GFE_REACT_100 },
                { q: "What's the difference between Server Components and Client Components?", href: GFE_REACT_100 },
                { q: "What is the React Compiler?", href: GFE_REACT_100 },
                { q: "What's the difference between useTransition and useDeferredValue?", href: GFE_REACT_100 },
                { q: "How does the new form action prop work in React 19?", href: GFE_REACT_100 },
            ],
        },
        {
            id: "nextjs",
            title: "Next.js",
            blurb: "GreatFrontEnd 2026 (App Router, Proxy) plus StackInterview 2026 (use cache, PPR, Next.js 15).",
            items: [
                { q: "What is Next.js?", href: GFE_NEXT },
                { q: "How is Next.js different from React?", href: GFE_NEXT },
                { q: "What is the App Router?", href: GFE_NEXT },
                { q: "What is the difference between page.tsx, layout.tsx, and template.tsx?", href: GFE_NEXT },
                { q: "What are dynamic routes in Next.js?", href: GFE_NEXT },
                { q: "What are Server Components?", href: GFE_NEXT },
                { q: "What are Client Components?", href: GFE_NEXT },
                { q: "When should you use \"use client\"?", href: GFE_NEXT },
                { q: "Can a Server Component import a Client Component?", href: GFE_NEXT },
                { q: "How do you fetch data in the App Router?", href: GFE_NEXT },
                { q: "What is the difference between static rendering and dynamic rendering?", href: GFE_NEXT },
                { q: "What is ISR?", href: GFE_NEXT },
                { q: "What are Server Functions and Server Actions?", href: GFE_NEXT },
                { q: "What is the difference between a Route Handler and a Server Action?", href: GFE_NEXT },
                { q: "What is the difference between SSR, SSG, CSR, and ISR?", href: GFE_NEXT },
                { q: "What is hydration?", href: GFE_NEXT },
                { q: "What causes hydration errors?", href: GFE_NEXT },
                { q: "What is Proxy in Next.js?", href: GFE_NEXT },
                { q: "How do environment variables work in Next.js?", href: GFE_NEXT },
                { q: "How do you handle authentication in a Next.js app?", href: GFE_NEXT },
                { q: "What is the difference between the Pages Router and the App Router?", href: STACK_NEXT },
                { q: "What is the difference between revalidatePath and revalidateTag?", href: STACK_NEXT },
                { q: "What are the four caching layers in the App Router?", href: STACK_NEXT },
                { q: "What changed in Next.js 15?", href: STACK_NEXT },
                { q: "What is the \"use cache\" directive?", href: STACK_NEXT },
                { q: "What are Parallel Routes and Intercepting Routes?", href: STACK_NEXT },
                { q: "What is Turbopack?", href: STACK_NEXT },
                { q: "What is Partial Prerendering (PPR)?", href: STACK_NEXT },
            ],
        },
    ],
} as const
