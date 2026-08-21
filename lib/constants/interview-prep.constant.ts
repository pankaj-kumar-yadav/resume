export const INTERVIEW_PREP_UPDATED_AT = {
    iso: "2026-08-21T12:20:00+05:30",
    display: "21 Aug 2026, 12:20 PM IST",
} as const

export const INTERVIEW_PREP_PATH = "/interview-prep"
export const INTERVIEW_PREP_EXTERNAL_PATH = "/interview-prep-external"

export const INTERVIEW_PREP_NAV = [
    { id: "home", label: "Home", href: "/home" },
    { id: "prep", label: "Interview prep", href: INTERVIEW_PREP_PATH },
    { id: "external", label: "External", href: INTERVIEW_PREP_EXTERNAL_PATH },
] as const

export const INTERVIEW_PREP_UI = {
    lastUpdatedPrefix: "Last updated",
    sourcesHeading: "Sources",
    externalLabel: "external",
    moreBulletBefore: "If a short answer is not enough, go to ",
    moreBulletAfter: " for the in-depth lists.",
} as const

export const INTERVIEW_PREP = {
    title: "Interview prep",
    intro: "100 answers for this stack.",
    bullets: [
        "Say the tradeoff, the failure mode, then the system you shipped.",
    ],
    sections: [
        {
            id: "javascript",
            title: "JavaScript",
            items: [
                {
                    q: "var vs let vs const?",
                    a: "var is function-scoped, hoisted as undefined, and can be redeclared — that's why loops and callbacks leak.",
                    bullets: [
                        "let/const are block-scoped and live in the temporal dead zone until the line runs, so reading them early throws.",
                        "const blocks reassignment, not mutation: a const config object can still have fields overwritten.",
                        "In product code use const by default, let only when you reassign, never var.",
                        "Interview trap: `for (var i…)` in a timeout shares one i; `let` gives each iteration its own binding.",
                    ],
                },
                {
                    q: "What is a closure?",
                    a: "A function that keeps the lexical environment it was created in after the outer function returns.",
                    bullets: [
                        "That's how you get private counters, Axios interceptors that close over a refresh-in-flight flag, and Zustand stores that aren't global variables.",
                        "Cost: the closed-over object can't be GC'd while the function lives — a listener that closes over a huge table row leaks.",
                        "Don't say 'closure is a nested function'; say 'it retains variables from the scope where it was defined, not where it is called'.",
                    ],
                },
                {
                    q: "Explain the event loop.",
                    a: "One call stack. Blocking work (huge JSON.parse on an XLSX sheet, a sync loop) freezes input and paint.",
                    bullets: [
                        "Web APIs run off-stack; when they finish they enqueue a macrotask (timer, I/O, UI event) or a microtask (Promise.then, queueMicrotask, MutationObserver).",
                        "After each macrotask, the engine drains every microtask before paint.",
                        "That's why a chain of `.then` can starve rendering.",
                        "Convert Desk-style file work belongs in chunks or a worker, not one tick on the main thread.",
                    ],
                },
                {
                    q: "Promise vs async/await?",
                    a: "Same primitive. await is `.then` with readable control flow and try/catch.",
                    bullets: [
                        "Don't await independent calls in sequence — `const [a, b] = await Promise.all([loadCourse(), loadProgress()])` for LMS dashboards.",
                        "`allSettled` when you want every result even if one certificate job fails; `all` fails the batch.",
                        "Unhandled rejection in a fire-and-forget `void fetch()` still needs `.catch`.",
                        "async functions always return a Promise — returning a non-Promise just wraps it.",
                    ],
                },
                {
                    q: "microtask vs macrotask?",
                    a: "Microtasks: Promise jobs, queueMicrotask, MutationObserver.",
                    bullets: [
                        "Macrotasks: setTimeout(0), setInterval, I/O, message events.",
                        "Order: run a macrotask → empty the microtask queue → maybe render → next macrotask.",
                        "`setTimeout(fn, 0)` is not 'next line'; it yields.",
                        "`Promise.resolve().then(fn)` runs before that timeout.",
                        "React 18 flushes state updates as microtasks in many paths, which is why two setStates in a Promise still batch.",
                    ],
                },
                {
                    q: "== vs ===?",
                    a: "=== compares type and value.",
                    bullets: [
                        "== coerces: `'' == 0`, `'0' == 0`, `false == 0`.",
                        "Never use == in app code.",
                        "The one idiom interviewers accept: `value == null` is true for both null and undefined, which is useful when an API omits a field vs sending null.",
                        "Don't use `||` to default numbers that can be 0 (Razorpay amount, WPM).",
                        "Use `??`.",
                    ],
                },
                {
                    q: "What is this?",
                    a: "Bound at call time, not definition time (except arrows).",
                    bullets: [
                        "`obj.method()` → this is obj.",
                        "`const fn = obj.method; fn()` → undefined in strict (your modules).",
                        "Arrow functions close over this from the enclosing scope — that's why they're correct in React event handlers and wrong as object methods that need their own this.",
                        "`.bind`, or define the callback as an arrow in the class field / hook.",
                        "Don't hunt this in Server Components; there is no component instance.",
                    ],
                },
                {
                    q: "Prototypal inheritance?",
                    a: "Missing property lookup walks `[[Prototype]]`.",
                    bullets: [
                        "`class` is constructor + prototype methods, not Java-style copies.",
                        "`extends` sets the prototype chain; `super` calls the parent constructor.",
                        "Prefer composition: a PermitForm that takes a schema beats SolarPermit extends BasePermit extends Form.",
                        "Shared methods on the prototype are one function in memory; putting methods on each instance in the constructor duplicates them.",
                        "`Object.create(null)` is a map without Object.prototype keys — useful if you ever key by user input.",
                    ],
                },
                {
                    q: "Debounce vs throttle?",
                    a: "Debounce: run after quiet period — typeahead, ESG filter search, resize.",
                    bullets: [
                        "Throttle: at most once per window — scroll spies, drag.",
                        "Leading vs trailing matters: search usually trailing (wait until they stop); a resize handle may want leading.",
                        "Always clear the timer on unmount or you'll setState on a dead component.",
                        "Don't debounce payments or auth submits.",
                        "Pair with AbortController so the previous LMS search request dies when the next keystroke fires.",
                    ],
                },
                {
                    q: "Event bubbling vs capturing vs delegation?",
                    a: "Capture root→target, bubble target→root.",
                    bullets: [
                        "`addEventListener(type, fn, true)` is capture.",
                        "Delegation: one listener on a parent, `event.target` / `closest('[data-row-id]')`.",
                        "That's how you handle 2k TanStack rows without 2k listeners, and how new rows work without rebinding.",
                        "`stopPropagation` breaks other listeners (analytics, click-outside); prefer checking target.",
                        "`preventDefault` on submit stops navigation — that's forms, not bubbling.",
                    ],
                },
                {
                    q: "Shallow vs deep copy?",
                    a: "Spread copies one level.",
                    bullets: [
                        "Nested `user.roles` is still shared — mutating it in a Zustand set without spreading roles corrupts the previous snapshot and React may not see a change.",
                        "`structuredClone` handles Dates, Maps, Arrays, cyclic-enough structures; it drops functions, DOM nodes, and some class instances.",
                        "`JSON.parse(stringify)` also drops undefined, NaN, and Date type.",
                        "Immer or explicit nested spreads for state.",
                        "For Convert Desk row objects, clone the row you edit, not the whole workbook, unless you need undo of the file.",
                    ],
                },
                {
                    q: "Optional chaining and nullish coalescing?",
                    a: "`a?.b?.c` stops at the first null/undefined and returns undefined — it does not throw, and it does not call methods after a miss.",
                    bullets: [
                        "`?.()` is for optional callbacks.",
                        "`??` defaults only null/undefined; `||` also treats 0, '', false as missing — fatal for amounts, page index, WPM.",
                        "Don't write `data?.items?.map` and then assume items is an array; follow with `?? []`.",
                        "Optional chaining is not a substitute for validating the API payload.",
                    ],
                },
                {
                    q: "Common memory leaks?",
                    a: "Subscriptions without cleanup: socket, ResizeObserver, axios interceptors added per mount, setInterval, document listeners.",
                    bullets: [
                        "Detached DOM that JS still holds.",
                        "Growing caches (conversion history with full sheets).",
                        "Closures in useEffect missing deps that keep the first props forever — or the inverse, an effect that resubscribes every render.",
                        "RN: forgotten AppState listeners.",
                        "Fix: effect return, abort on unmount, interceptor eject, WeakMap if keys are objects.",
                        "Profile with heap snapshots, not guesses.",
                    ],
                },
                {
                    q: "How do you cancel in-flight fetch?",
                    a: "AbortController: pass `signal` to fetch/axios, abort in the effect cleanup or when the query key changes (table filters).",
                    bullets: [
                        "Axios supports the same signal.",
                        "Don't ignore AbortError in Sentry — filter it.",
                        "Race: response from request 1 must not apply after request 2; abort is cleaner than a generation counter, but a counter still helps if a library won't abort.",
                        "Never abort a payment confirm; abort search, not capture.",
                    ],
                },
            ],
        },
        {
            id: "typescript",
            title: "TypeScript",
            items: [
                {
                    q: "any vs unknown vs never?",
                    a: "any turns the checker off — it infects every consumer.",
                    bullets: [
                        "unknown is 'I have a JSON blob from the LMS API'; you must narrow (typeof, in, Zod parse) before field access.",
                        "never is 'this code is unreachable': exhaustive switch on a role union (`admin | instructor | learner`) should assign the leftover to never so a new role fails the build.",
                        "`as any` to silence a form library is a smell; type the resolver.",
                        "Prefer `unknown` at I/O boundaries, inferred types inside the app.",
                    ],
                },
                {
                    q: "interface vs type?",
                    a: "interface: object shapes, declaration merging (bad in app code, useful for lib augmentation).",
                    bullets: [
                        "type: unions, tuples, mapped types, `typeof` constants.",
                        "You cannot union an interface as cleanly as `type Result = Ok | Err`.",
                        "For React props, either works; teams pick one.",
                        "Don't merge interfaces to patch third-party types in five files — wrap once.",
                        "Use `type` for `z.infer<typeof schema>` and for discriminated unions on approval status.",
                    ],
                },
                {
                    q: "What are generics for?",
                    a: "Keep the relationship between input and output without any.",
                    bullets: [
                        "`function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>`.",
                        "Axios wrappers: `api.get<Course[]>(url)`.",
                        "Schema forms: `Form<TSchema>` so field names are keys of the schema, not strings.",
                        "Constraint with `extends` so you can't pass a number where a `{ id: string }` is required.",
                        "Don't generic-everything; if T appears once and isn't used in the return, you wanted a concrete type.",
                    ],
                },
                {
                    q: "How does narrowing work?",
                    a: "Control-flow analysis: typeof, instanceof, `in`, equality, truthiness, and user-defined predicates `function isCourse(x: unknown): x is Course`.",
                    bullets: [
                        "Discriminated unions (`type: 'success' | 'error'`) are the production pattern for API results and workflow states.",
                        "After `if (status === 'rejected')` the comment field exists.",
                        "Don't use non-null `!` after a failed fetch.",
                        "Zod's `.parse` narrows by throwing; `.safeParse` returns a union you switch on.",
                    ],
                },
                {
                    q: "Name key utility types and when you use them.",
                    a: "Partial for patch payloads.",
                    bullets: [
                        "Pick/Omit for table row vs detail.",
                        "Record<Role, Permission[]> for RBAC maps.",
                        "ReturnType / Parameters to stay in sync with a function you don't own.",
                        "Awaited<ReturnType<typeof load>> for server loaders.",
                        "Readonly for props you must not mutate.",
                        "`satisfies` belongs with as-const configs so you check the shape without widening literals.",
                        "Derive from Zod/API types; don't maintain a parallel ManualUser interface.",
                    ],
                },
                {
                    q: "satisfies vs a type annotation?",
                    a: "Annotation `const routes: Routes = {…}` forces the type and can widen `'home'` to string, breaking discriminated usage.",
                    bullets: [
                        "`satisfies Routes` checks assignability and keeps literal types.",
                        "Use it for icon maps, status → color, and section configs.",
                        "If you need the value to be exactly Routes and you will pass it where Routes is required, annotation is fine.",
                        "Don't use satisfies to 'fix' a value that isn't actually assignable — that's a real error.",
                    ],
                },
                {
                    q: "Why avoid enum?",
                    a: "Numeric enums reverse-map and exist as runtime objects; isolatedModules / bundlers make them awkward.",
                    bullets: [
                        "String enums are still a second runtime artifact.",
                        "Prefer `const STATUSES = ['draft','submitted','approved'] as const` plus `type Status = typeof STATUSES[number]`.",
                        "That tree-shakes, serializes cleanly in JSON, and matches what Mongo already stores.",
                        "Use enums only when a generated protobuf/OpenAPI forces them.",
                    ],
                },
                {
                    q: "How do you type API responses?",
                    a: "The wire is unknown. Parse at the boundary with Zod (or similar), then the rest of the app uses `z.infer`.",
                    bullets: [
                        "Don't `as Course[]` after fetch — a missing `progress` field becomes a production UI bug, not a type error.",
                        "Share the same schema with React Hook Form via zodResolver so client validation and server validation don't drift.",
                        "Version BRSR schemas: old submissions keep the schema id they were saved with; don't silently retype historical rows.",
                    ],
                },
            ],
        },
        {
            id: "react",
            title: "React",
            items: [
                {
                    q: "What is reconciliation?",
                    a: "React compares the new element tree to the previous one and commits the diff to the host (DOM or RN).",
                    bullets: [
                        "Same type + same key = update in place; different type = tear down and mount, state dies.",
                        "That's why swapping a `<div>` for a `<section>` resets inputs, and why a list without keys remounts rows.",
                        "Fiber can interrupt this work (concurrent); the commit phase is still synchronous.",
                        "You don't 'speed up reconciliation' with extra memo everywhere — you give it stable keys and smaller trees (virtualize the ESG grid).",
                    ],
                },
                {
                    q: "Why keys, and why not index?",
                    a: "Keys identity a child among siblings.",
                    bullets: [
                        "Index keys look fine until sort, filter, or insert-at-top: local state (expanded row, uncontrolled input) sticks to the index, not the entity.",
                        "Use courseId, permitId, submissionId.",
                        "Never key on Math.random() — remount every render.",
                        "If the list is static and append-only, index is acceptable; say that caveat.",
                        "Duplicate keys warn and produce undefined UI.",
                        "Keys are not for performance 'optimization' first; they are for correctness.",
                    ],
                },
                {
                    q: "Controlled vs uncontrolled inputs?",
                    a: "Controlled: `value` + `onChange`, React owns the source of truth — required for Zod validation, dynamic pricing, schema-driven ESG fields, disabling submit until valid.",
                    bullets: [
                        "Uncontrolled: defaultValue + ref, cheaper, fine for a one-shot file picker (Convert Desk) or an unmanaged search box you read on submit.",
                        "Mixing (`value` without onChange) locks the field.",
                        "For big tables, don't control every cell at the page; control the edited row or use the table's own row state.",
                    ],
                },
                {
                    q: "When does a component re-render?",
                    a: "Its state changed, its parent rendered and passed new props (by default), or context it subscribes to changed.",
                    bullets: [
                        "Render ≠ DOM update; the host commit may bail out.",
                        "`memo` skips the child if props are shallow-equal — useless if you pass a new object/function every time.",
                        "Selectors in Zustand skip if the selected slice is equal.",
                        "The expensive part of an ESG table is usually rendering 10k cells, not 'React being slow'; virtualize and stabilize column defs.",
                    ],
                },
                {
                    q: "useEffect rules of thumb?",
                    a: "Synchronize with something outside React: subscription, imperative widget, logging, non-Abort fetch you must cancel.",
                    bullets: [
                        "If you can compute it during render (filtered rows, derived totals), do that.",
                        "If you're copying props into state 'to keep them in sync', you probably want the prop or a key remount.",
                        "Strict Mode double-invokes effects in dev — your effect must be idempotent.",
                        "Missing deps lie to you; extra object deps retrigger forever.",
                        "Don't fetch in effects in App Router pages when a Server Component can do it.",
                    ],
                },
                {
                    q: "useMemo vs useCallback vs memo?",
                    a: "useMemo caches a value, useCallback caches a function identity, memo skips a component render.",
                    bullets: [
                        "None of them are free: you pay comparison cost.",
                        "Use them when a child is expensive (chart, virtualized table) or when a dep array would churn.",
                        "React Compiler (19) memoizes more automatically — still don't pass inline `columns={[]}` into TanStack without a stable ref.",
                        "Measure with Profiler.",
                        "Never memo a one-line text component 'for best practice'.",
                    ],
                },
                {
                    q: "useRef vs useState?",
                    a: "ref.current mutation does not render.",
                    bullets: [
                        "Use for DOM/RN nodes, AbortController, previous filter string, timer ids, 'isMounted' is usually the wrong fix (abort instead).",
                        "State when the user must see the change.",
                        "Storing a Zustand getState in a ref is fine for a stable callback.",
                        "Don't use state for mouse coordinates at 60fps without throttling; that's a ref or a rAF loop.",
                        "Reading a ref during render for branching is a last resort — it won't be reactive.",
                    ],
                },
                {
                    q: "Lifting state vs context vs store?",
                    a: "Lift to the nearest common parent if two siblings need it (selected course + player).",
                    bullets: [
                        "Context for rare writes: theme, locale, current user snapshot.",
                        "Zustand (or Redux) when many distant trees write often — table UI, multi-step commerce, RN permit drafts — and you need selectors.",
                        "Server state (courses, invoices) is not Zustand; it's fetch/React Query.",
                        "A god context 'AppState' re-renders the world.",
                        "URL is another store: shareable ESG filters belong there, not only in memory.",
                    ],
                },
                {
                    q: "Why not put everything in Context?",
                    a: "Any `value={{user, setUser, flags}}` that is a new object every render notifies all consumers.",
                    bullets: [
                        "Split: AuthContext (user id, rarely changes) vs a store for ephemeral UI.",
                        "`useContext` has no selector in old React; even with `use`, a fat context is a footgun.",
                        "For RBAC, put `can(permission)` behind a hook that reads a stable user; don't put the entire permission matrix in context value if it rebuilds each fetch.",
                        "Profile before you 'optimize' with ten nested providers.",
                    ],
                },
                {
                    q: "What are custom hooks for?",
                    a: "Reuse stateful logic, not markup.",
                    bullets: [
                        "`useAuthSession`, `useRazorpayOrder`, `useTableQuery(searchParams)`.",
                        "Name starts with use, call only at top level, return a boring object.",
                        "One hook, one job — don't return 18 fields from useApp.",
                        "Hide the Axios refresh dance here so screens don't fork it.",
                        "If there's no React state/effect, it shouldn't be a hook; it's a function.",
                        "Test hooks with rendering a harness, not by calling them in Node without a dispatcher.",
                    ],
                },
                {
                    q: "Error boundaries?",
                    a: "They catch render/lifecycle/constructor errors in the subtree and show fallback UI.",
                    bullets: [
                        "They do not catch event handlers, async, Server Component I/O, or the boundary's own render.",
                        "In App Router, `error.tsx` is a boundary per segment — use it for a failed course page without killing the LMS shell.",
                        "Log the error with a correlation id, don't show the stack to learners.",
                        "Retry should reset the boundary (`reset()` in error.tsx), not only setState in a parent that still throws.",
                    ],
                },
                {
                    q: "What is batching?",
                    a: "React 18 batches setState in events, timeouts, and promises into one render.",
                    bullets: [
                        "Two `setPage` + `setRows` in a fetch `.then` = one paint.",
                        "`flushSync` forces a paint — almost only for measuring layout.",
                        "If you need a spinner to show before heavy work, set state, then `startTransition` the heavy update, or yield with setTimeout.",
                        "Don't fight batching with random flushSync in table code; you'll jank.",
                    ],
                },
                {
                    q: "startTransition / useDeferredValue?",
                    a: "Mark a state update as interruptible so typing stays high priority while the ESG grid filters.",
                    bullets: [
                        "`useDeferredValue(query)` keeps showing the old list until the new one is ready.",
                        "Don't wrap payments, auth, or 'delete permit' in a transition — those must commit.",
                        "Concurrent features need React 18+ and a concurrent root (Next App Router has this).",
                        "If the list is virtualized and cheap, you may not need them; if filter is O(n) on 50k rows, you do, or you filter on the server.",
                    ],
                },
                {
                    q: "Portals?",
                    a: "Render into a DOM node outside the parent — dialogs, toasts, dropdowns that would otherwise clip (`overflow: hidden` on a table cell).",
                    bullets: [
                        "Events still bubble through the React tree as if the portal were a child, which is what you want for click-outside that isn't window-level.",
                        "In Next, portal to `document.body` only in a client component after mount (or a known #modal-root in layout).",
                        "RN has no DOM portals; use a modal component.",
                        "Don't portal for layout that should stay in flow.",
                    ],
                },
                {
                    q: "Server vs client components?",
                    a: "RSC run on the server, can await data/secrets, ship zero of their own JS.",
                    bullets: [
                        "They cannot use state, effects, or browser APIs.",
                        "Client components are the `'use client'` subtree — interactivity.",
                        "Pattern: server page fetches courses, passes serializable props into a client table.",
                        "You can pass a Server Component as `children` into a client wrapper.",
                        "Don't `'use client'` the whole route — you throw away the model and bloat the LMS bundle.",
                        "Serialization: Dates, Maps, functions cannot cross the boundary unless you pick a protocol.",
                    ],
                },
                {
                    q: "Suspense?",
                    a: "A child can suspend (Promise) and the nearest fallback shows.",
                    bullets: [
                        "App Router `loading.tsx` is a Suspense boundary around the segment.",
                        "Stream the dashboard shell while KPI widgets resolve.",
                        "Don't suspend a client component on a fetch inside useEffect — that's not Suspense, that's a spinner.",
                        "`use` (React 19) can unwrap a Promise in render and suspend.",
                        "Error boundaries are siblings, not replacements: suspend is 'not ready', error is 'failed'.",
                        "Fallbacks should be sized to avoid CLS on ESG charts.",
                    ],
                },
                {
                    q: "What is hydration?",
                    a: "Client React attaches to server HTML.",
                    bullets: [
                        "Mismatch (invalid HTML, `Date.now()` in render, `window` in render, browser extension mutating DOM) throws hydration errors and can force a client rerender.",
                        "Keep the first client render identical to the server HTML: no `typeof window` branches that change markup, no random IDs without `useId`.",
                        "`suppressHydrationWarning` on a timestamp is a last resort.",
                        "Heavy `'use client'` trees hydrate more JS — another reason to keep the client leaf small.",
                    ],
                },
                {
                    q: "What's new to mention for React 19?",
                    a: "Actions / form `action` for progressive enhancement; `useActionState` for pending/error of a server mutation; `useOptimistic` for UI that assumes success (don't optimistic-charge a card); `use` for reading context or Promises; stable RSC; React Compiler reducing hand-memo.",
                    bullets: [
                        "Interviewers in 2026 use these as a filter.",
                        "Be honest about what you shipped vs what you read.",
                        "Form actions are not Stripe webhooks.",
                        "Compiler doesn't fix a 10k-row table without virtualization.",
                    ],
                },
            ],
        },
        {
            id: "next",
            title: "Next.js",
            items: [
                {
                    q: "App Router vs Pages?",
                    a: "Pages: client-first, `getServerSideProps` / `getStaticProps`, `_app`.",
                    bullets: [
                        "App: nested layouts that don't remount on navigation, RSC default, `loading.tsx`/`error.tsx`, Server Actions.",
                        "New work is App Router.",
                        "Don't recite getStaticProps as if it were current — say 'Pages legacy; App equivalent is a cached Server Component or `generateStaticParams`'.",
                        "Layouts persist: put the LMS chrome in layout, not in every page, so switching courses doesn't remount the nav.",
                    ],
                },
                {
                    q: "Where does data fetching belong?",
                    a: "Default: async Server Components or `fetch` on the server.",
                    bullets: [
                        "Client fetch for highly interactive, user-typed, or realtime data (table search after hydration).",
                        "Don't fetch the same course on the server and again in useEffect.",
                        "Cache tags (`revalidateTag('course-42')`) after a mutation.",
                        "Next 16: nothing is cached unless you opt in with `'use cache'` — don't assume Next 14's implicit fetch cache still exists.",
                        "Pass plain data to client tables; don't pass the fetch function.",
                    ],
                },
                {
                    q: "Next 15/16 caching in one answer?",
                    a: "Next 15: `cookies()`, `headers()`, `params`, `searchParams` are async — that's the breaking change interviews use.",
                    bullets: [
                        "Four older layers: request memoization, data cache, full route cache, router cache.",
                        "Next 16: explicit `'use cache'` / Cache Components; default is dynamic.",
                        "PPR: static shell + streamed holes.",
                        "`cacheTag` + `revalidateTag` for on-demand.",
                        "Never cache user-specific billing or RBAC decisions as a public static page.",
                        "If asked 'why is my page stale?', ask whether they opted into cache and how they invalidate.",
                    ],
                },
                {
                    q: "Route Handlers vs Server Actions?",
                    a: "Route Handlers: real HTTP (webhooks, mobile clients, Razorpay/Stripe callbacks, CORS).",
                    bullets: [
                        "Server Actions: mutations from your React tree, cookies same-origin, not a public API.",
                        "Webhooks must not be Actions — they need raw body + signature on a POST route.",
                        "Actions can still be invoked if the id leaks; still authz on the server.",
                        "Don't use an Action to replace a REST API consumed by React Native.",
                        "Don't use a Route Handler for a form that only your site posts if an Action is simpler.",
                    ],
                },
                {
                    q: "middleware vs proxy.ts?",
                    a: "Edge gate: redirect unauthenticated users, geo, A/B, header rewrites.",
                    bullets: [
                        "Next 16 names this `proxy.ts` (formerly middleware).",
                        "Keep it tiny — JWT verify of a session cookie, not a DB roundtrip per request if you can avoid it.",
                        "Matcher config so static assets skip it.",
                        "It cannot be the only security layer; RSC and Route Handlers still check the user.",
                        "Don't put Razorpay secret work here.",
                        "If it blocks every navigation, your LMS feels broken.",
                    ],
                },
                {
                    q: "next/image why and when not?",
                    a: "Enforces dimensions (CLS), lazy-loads, can optimize remote URLs if `remotePatterns` allow the host.",
                    bullets: [
                        "Missing patterns = broken profile photos.",
                        "Don't use it for tiny SVGs or a 16px favicon — overhead.",
                        "Local static marketing images (Techap site) benefit more than a user-uploaded certificate preview you already sized.",
                        "Always set `sizes` for responsive.",
                        "Priority only on LCP hero, not on every card.",
                    ],
                },
                {
                    q: "How do you do auth in App Router?",
                    a: "HttpOnly Secure SameSite cookie (session id or short JWT).",
                    bullets: [
                        "Read in Server Components / proxy.",
                        "Protect layouts with `redirect`.",
                        "Client only gets a non-sensitive user DTO.",
                        "Refresh: rotate on the server, don't store refresh tokens in localStorage.",
                        "RN apps often use a token in secure storage and hit Route Handlers — that's a different client, same server authz.",
                        "RBAC is a server 403, not a hidden button.",
                        "After login, `revalidate` user-tagged data so the shell isn't stale.",
                    ],
                },
                {
                    q: "streaming and loading.tsx?",
                    a: "The segment wraps in Suspense; the layout can paint while the page awaits.",
                    bullets: [
                        "Instant LMS chrome, then the course body.",
                        "Nested `loading.tsx` for independent widgets.",
                        "Bad fallback: a 40vh skeleton that then jumps (CLS) or a spinner that never yields because you blocked on one giant query.",
                        "Split: stream the table when the count query is ready, don't wait for every KPI.",
                        "Client navigations reuse the layout — that's why layout fetch should be cache-aware.",
                    ],
                },
                {
                    q: "When do you need 'use client'?",
                    a: "Hooks, events, browser APIs, most UI libraries that aren't RSC-ready.",
                    bullets: [
                        "Push it to the leaf: a client `<PaymentButton>` inside a server page, not `'use client'` on `app/checkout/page.tsx`.",
                        "Importing a client component into a server file creates a boundary; importing a server component into a client file is illegal unless it's passed as children.",
                        "A whole-page client component is how you accidentally ship the ESG schema compiler to the browser.",
                    ],
                },
                {
                    q: "Environment variables?",
                    a: "`NEXT_PUBLIC_*` is inlined into the client bundle — assume public.",
                    bullets: [
                        "Stripe/Razorpay secret, JWT secret, DB URI stay server-only.",
                        "Mixing them is a common incident.",
                        "Don't read secrets in a client Payment form; create an order on the server, open checkout with the public key only.",
                        "Restart the server after changing env; client env needs a rebuild.",
                        "Never log env in the browser to 'debug production'.",
                    ],
                },
                {
                    q: "SSR vs SSG vs ISR vs CSR?",
                    a: "SSG: Techap marketing, docs, at build.",
                    bullets: [
                        "ISR: revalidate interval for semi-static course catalogs.",
                        "SSR/dynamic: per-request user dashboards, RBAC.",
                        "CSR: after hydrate, search-as-you-type.",
                        "SEO needs HTML (SSG/SSR).",
                        "Personalization needs cookies → dynamic.",
                        "Don't SSG a page that reads cookies.",
                        "Next 16 PPR tries to give you a static shell with dynamic holes so you don't pick only one mode for a whole dashboard.",
                    ],
                },
                {
                    q: "What is PPR?",
                    a: "Partial Prerendering: send a cached static shell immediately, stream the dynamic parts (user widget, cart, 'your progress') in holes wrapped by Suspense.",
                    bullets: [
                        "In Next 16 this sits with Cache Components rather than a mysterious experimental flag.",
                        "Design the page as chrome + islands.",
                        "If everything is behind one await, PPR can't help.",
                        "Don't put PII in the static shell.",
                        "Good talking point: ESG landing static, logged-in KPI tiles streamed.",
                    ],
                },
            ],
        },
        {
            id: "state-forms",
            title: "State, forms, tables",
            items: [
                {
                    q: "Zustand vs Redux?",
                    a: "Zustand: tiny API, no Provider required, selectors, good default for product UI.",
                    bullets: [
                        "Redux Toolkit: larger ecosystem, DevTools, standardized slices, more ceremony.",
                        "You listed both; say you pick Zustand unless the team already has Redux or needs time-travel across a huge domain.",
                        "Neither replaces server cache.",
                        "Don't put fetched course lists in Zustand 'so it's global' — stale, no revalidate.",
                        "Easy-Peasy is Redux-like; don't run Zustand and Redux for the same slice.",
                    ],
                },
                {
                    q: "Server state vs client state?",
                    a: "Server: courses, invoices, BRSR submissions — has a source of truth on the backend, can go stale, needs revalidation.",
                    bullets: [
                        "Client: modal open, selected row, wizard step, column visibility.",
                        "Mixing them is the classic bug: user pays, Zustand still says 'free', webhook already granted access.",
                        "After mutation, invalidate the server cache; don't only set local state.",
                        "URL state (filters) is shareable client state with a well-known protocol.",
                    ],
                },
                {
                    q: "Why schema-driven forms?",
                    a: "BRSR/GRI fields change by year and framework.",
                    bullets: [
                        "A JSON schema (or equivalent) drives widgets, required rules, and the payload shape so you don't ship 50 one-off screens.",
                        "Pair with Zod for runtime checks and TS types.",
                        "Approval still needs a state machine; the schema doesn't replace RBAC.",
                        "Version the schema id on each submission.",
                        "Trap: over-generic renderer that can't do a special control — escape hatch for a field type, don't fork the whole form.",
                    ],
                },
                {
                    q: "React Hook Form + Zod?",
                    a: "RHF keeps fields mostly uncontrolled, so a 100-field ESG form doesn't re-render on every keystroke.",
                    bullets: [
                        "zodResolver is the single validator for UI and types.",
                        "Validate on submit; onBlur for long enterprise forms if they want early errors.",
                        "`shouldUnregister` matters when fields unmount with schema branches.",
                        "Don't duplicate Yup plus Zod.",
                        "Server must still parse — client Zod is UX.",
                        "Default values from the draft submission, not empty strings that wipe 0.",
                    ],
                },
                {
                    q: "URL-synchronized tables?",
                    a: "page, sort, filters, q in the query string so a manager can share an EXG view and back/forward works.",
                    bullets: [
                        "The table reads URL; it doesn't own a parallel `useState` that drifts.",
                        "Use `nuqs` or Next `searchParams` (async in 15+) plus `router.replace` to avoid history spam on every keystroke (debounce the q param).",
                        "Don't put secrets in the URL.",
                        "Reset page to 1 when filters change or you empty the result set and look broken.",
                    ],
                },
                {
                    q: "TanStack Table — what is it?",
                    a: "Headless: row models, sort, filter, pagination, grouping.",
                    bullets: [
                        "You own markup (Shadcn data-table).",
                        "That's why it's right for EXG — design system stays yours.",
                        "Column defs must be memoized.",
                        "Row ids stable.",
                        "It is not a grid with virtualization built in; add TanStack Virtual or you will mount thousands of DOM nodes.",
                        "Server-side mode: the table asks for page N, you fetch; don't download the whole BRSR dataset 'because the table can filter'.",
                    ],
                },
                {
                    q: "How do you keep tables fast?",
                    a: "Virtualize rows (and columns if wide).",
                    bullets: [
                        "Paginate or window on the server.",
                        "Memo column definitions.",
                        "Don't put the selected row in a context that wraps every cell.",
                        "Avoid anonymous components as cells.",
                        "CSS containment.",
                        "For RN lists, FlatList/FlashList, not ScrollView.",
                        "If INP is bad, the handler is doing too much per click — defer formatting, don't JSON.stringify the row on render.",
                        "Measure with Performance panel, not 'it feels fine on my laptop'.",
                    ],
                },
                {
                    q: "Axios interceptors you actually want?",
                    a: "Request: attach Authorization.",
                    bullets: [
                        "Response: on 401, single-flight refresh, retry the original, logout on fail.",
                        "Normalize error shape so UI doesn't switch on message strings.",
                        "Skip refresh for `/login` and the refresh URL itself (infinite loop).",
                        "Eject on unmount if you add per-app interceptors.",
                        "Shared client across LMS, commerce, RN — that's the 'centralized API layer' on the resume.",
                        "Don't toast every 401 before refresh completes.",
                    ],
                },
            ],
        },
        {
            id: "auth-pay",
            title: "Auth, RBAC, payments",
            items: [
                {
                    q: "JWT vs session cookies?",
                    a: "JWT: self-contained, easy for RN/mobile, harder to revoke (need denylist or short TTL + refresh).",
                    bullets: [
                        "Opaque session cookie: server can kill the session, CSRF to consider, best default for first-party web.",
                        "Hybrid: cookie holds a session id, or a short JWT + rotating refresh.",
                        "Don't use long-lived JWT in localStorage.",
                        "For BotJunior web, cookie session; for a future RN learner app, token in secure storage hitting the same API with authz unchanged.",
                    ],
                },
                {
                    q: "Where do you store tokens?",
                    a: "Web: HttpOnly Secure SameSite=Lax/Strict cookies.",
                    bullets: [
                        "JS cannot read them → XSS can't yoink the session as easily (still can act as the user).",
                        "Mobile: encrypted storage, not AsyncStorage for refresh tokens.",
                        "Memory-only access token + refresh cookie is a common SPA pattern.",
                        "localStorage JWT is the answer that fails the interview in 2026.",
                        "If you must debug, log 'has cookie' not the value.",
                    ],
                },
                {
                    q: "What is RBAC?",
                    a: "Roles map to permissions; users get roles.",
                    bullets: [
                        "Enforce on every Route Handler/Action, not `if (role==='admin')` only in React.",
                        "LMS: admin / instructor / learner.",
                        "Permits: requester / approver / viewer.",
                        "Hide the button and still 403 the API — UI is not security.",
                        "Permission strings (`course:publish`) beat checking role names in twenty components.",
                        "Cache the permission set on the user DTO; don't fetch ACL per cell.",
                        "When a role changes, invalidate that user's tagged data.",
                    ],
                },
                {
                    q: "RBAC vs ABAC?",
                    a: "RBAC: coarse, 'approver can approve'.",
                    bullets: [
                        "ABAC: 'approver can approve permits in their plant / their company'.",
                        "ESG and multi-org LMS need both: role plus resource attributes (orgId, siteId, ownerId).",
                        "Implement as `can(user, action, resource)` on the server using those fields.",
                        "Don't encode plant lists only in the frontend filter — they'll change the orgId in the JSON.",
                        "Start RBAC, add ABAC when the first customer has two sites.",
                    ],
                },
                {
                    q: "Stripe vs Razorpay?",
                    a: "Stripe: global, Billing/subscriptions (Omooma), excellent webhooks.",
                    bullets: [
                        "Razorpay: India (UPI, cards, netbanking), BotJunior checkout, GST-era ops.",
                        "Same design: create order/subscription on the server, checkout with public key, fulfill on webhook after signature verify.",
                        "Don't trust `success` callback in the browser.",
                        "Map gateway status to your entitlement table, not the other way around.",
                        "Refunds and failed webhooks are part of the design, not afterthoughts.",
                    ],
                },
                {
                    q: "How does a payment webhook work?",
                    a: "Gateway POSTs to a Route Handler.",
                    bullets: [
                        "Verify signature (secret, raw body — Next can eat the body if you parse JSON first; use the raw request).",
                        "Idempotency key / event id unique index.",
                        "Then grant SKU or subscription role.",
                        "Return 2xx quickly; do heavy PDF/cert work async if needed, but don't 500 after you've already granted — that's double-grant on retry.",
                        "Client success page is UX; if webhook lags, poll entitlement, don't fake 'paid' from query params.",
                    ],
                },
                {
                    q: "Idempotency in payments?",
                    a: "Gateways retry. Same event must not create two orders or two entitlements.",
                    bullets: [
                        "Unique `gatewayEventId`, unique `orderId`, grant as upsert.",
                        "User double-click on Pay: one order id from the server, disable the button, ignore the second click.",
                        "Bundled SKUs: one payment → N grants in a transaction.",
                        "If grant 2 fails, don't leave grant 1 without a compensating path.",
                        "Say 'exactly-once delivery doesn't exist; exactly-once effect does'.",
                    ],
                },
                {
                    q: "CSRF vs XSS?",
                    a: "XSS: attacker runs JS on your origin (stored comment, vulnerable dep).",
                    bullets: [
                        "Can act as the user; HttpOnly cookies still send.",
                        "Defense: CSP, sanitize, framework auto-escape.",
                        "CSRF: other site triggers a request with the user's cookies.",
                        "Defense: SameSite, CSRF token for state-changing cookie auth, don't use GET for mutations.",
                        "Bearer token in Authorization header is not sent cross-site by browsers the same way.",
                        "XSS is the worse one; CSRF is what people forget on cookie sessions.",
                    ],
                },
            ],
        },
        {
            id: "react-native",
            title: "React Native",
            items: [
                {
                    q: "How is RN different from React DOM?",
                    a: "Same React, different host: native views, Yoga layout, no CSSOM, no URLs by default.",
                    bullets: [
                        "Styling is a subset; no grid, limited overflow.",
                        "Navigation is stacks/tabs (React Navigation), not Next routes.",
                        "Lists must virtualize.",
                        "Text must be in `<Text>`.",
                        "Gestures and keyboards are first-class problems.",
                        "You can share TypeScript types and API clients with web; you usually cannot share Shadcn DOM components.",
                        "That's why BSafe is RN modules, not a WebView of the ESG app.",
                    ],
                },
                {
                    q: "Why FlatList, not ScrollView + map?",
                    a: "ScrollView renders every child.",
                    bullets: [
                        "Hundreds of permits, equipment rows, or notification items will jank and blow memory.",
                        "FlatList/FlashList window.",
                        "Need `keyExtractor` stable, `getItemLayout` if heights are fixed, `windowSize` tuned.",
                        "ExtraData if you mutate item fields without changing reference.",
                        "Don't put a FlatList inside a ScrollView without nested-scroll work.",
                        "Same idea as TanStack Virtual on web — say that parallel.",
                    ],
                },
                {
                    q: "Bridge / JSI in one paragraph?",
                    a: "Old architecture: async serialized bridge; too many passes = list jank.",
                    bullets: [
                        "New architecture: JSI, Fabric, TurboModules — less copy, more sync native calls.",
                        "You don't implement JSI in product code; you avoid chatty native roundtrips (don't read 50 native constants per row).",
                        "Heavy PDF or image work: native module or a dedicated thread, not a JS loop.",
                        "If they ask 'why is our list slow', first FlatList, then JS thread busywork, then bridge chatter.",
                    ],
                },
                {
                    q: "How do you share UI across permit modules?",
                    a: "One design system: form field, section, approval timeline, attachment, signature, PDF footer.",
                    bullets: [
                        "General / Solar / Shutdown / LOTO / Heavy Equipment / Substation become config + fields + workflow graph, not six apps.",
                        "That's the Continuum/BSafe story: reusable components, role-based approvals, notifications, dashboards.",
                        "When a new permit type arrives, you add schema + copy, not a new navigator tree.",
                        "Escape hatch for a truly unique screen, then extract on the second copy.",
                    ],
                },
                {
                    q: "Push notifications pitfalls?",
                    a: "Permissions, iOS vs Android channels, token rotation, killed state.",
                    bullets: [
                        "Payload should contain permit id, not only a message string.",
                        "Tap → navigate to the record; cold start needs a pending-navigation store.",
                        "Don't assume JS is running in background.",
                        "Deduplicate by notification id.",
                        "Server still sends; client still authz when opening the permit — a leaked id in a notification is not access.",
                        "Test on a real device, not only the simulator.",
                    ],
                },
                {
                    q: "PDF generation on device vs server?",
                    a: "Device: works offline, data stays on phone, fonts/layout drift per OS.",
                    bullets: [
                        "Server: consistent branding, email, easier legal archive.",
                        "Permits often need a snapshot at approval time — generate once, store URL, don't regenerate from mutable state later.",
                        "Don't block the JS thread on a 20-page PDF; native or server job + spinner.",
                        "Same lesson as LMS certificates: idempotent, tamper-evident id, template vs data split.",
                    ],
                },
            ],
        },
        {
            id: "backend",
            title: "Node, APIs, Mongo",
            items: [
                {
                    q: "REST status codes you actually use?",
                    a: "200/201 success, 204 no body.",
                    bullets: [
                        "400 validation (Zod flatten).",
                        "401 no/invalid session.",
                        "403 session ok, not allowed (learner publishing a course).",
                        "404 missing id.",
                        "409 duplicate payment event or unique index.",
                        "422 if you distinguish semantic vs syntax (optional).",
                        "429 rate limit.",
                        "500 unexpected — log id, don't leak stacks.",
                        "Don't 200 `{ error: true }`.",
                        "Don't 401 when you meant 403 — the client refresh loop will go insane.",
                    ],
                },
                {
                    q: "Where should validation live?",
                    a: "Client: UX. Server: truth.",
                    bullets: [
                        "Same Zod schema imported in the Route Handler.",
                        "Never skip server checks because RHF already validated — attackers don't use your form.",
                        "Coerce types at the boundary (`z.coerce.number()` for query page).",
                        "Strip unknown keys so extra `role: 'admin'` in JSON dies.",
                        "For file uploads, validate MIME and size on the server, not only the input accept attribute.",
                    ],
                },
                {
                    q: "MongoDB embed vs reference?",
                    a: "Embed what you always load together and that has a bounded size (form answers on a submission).",
                    bullets: [
                        "Reference what is shared or grows without bound (users, course catalog, KPI definitions).",
                        "Don't nest unbounded comment arrays on a course.",
                        "ESG submissions: embed answers, reference the schema version and org.",
                        "Transactions when you grant multiple entitlements.",
                        "Indexes on the fields you actually filter.",
                    ],
                },
                {
                    q: "Indexes?",
                    a: "Compound index left-prefix: `{ orgId: 1, createdAt: -1 }` for org dashboards.",
                    bullets: [
                        "Unique on `gatewayEventId`.",
                        "Don't index every field 'just in case' — write cost.",
                        "Explain collection scans on reporting queries: EXG tables die without orgId + status + period.",
                        "`explain('executionStats')` before guessing.",
                        "TTL indexes for refresh tokens or OTPs.",
                        "Be honest if your role is frontend-heavy: you still know why the list endpoint is slow.",
                    ],
                },
                {
                    q: "N+1 on the frontend?",
                    a: "A table that fetches `/users/:id` per row is N+1.",
                    bullets: [
                        "Batch: `?ids=` or GraphQL dataloader on the server, include author on the list payload.",
                        "TanStack Table should not fire Axios in a cell renderer.",
                        "For LMS: course list with progress should be one endpoint, not progress-per-course.",
                        "If you already shipped it, say how you'd fix: join in the list API, cache, virtualize so you at least don't fetch offscreen rows.",
                    ],
                },
                {
                    q: "How do you structure a shared API layer?",
                    a: "One client: base URL, interceptors, typed methods `api.courses.list(params)`.",
                    bullets: [
                        "Feature screens don't see Axios.",
                        "Errors become a Result type or thrown AppError with code.",
                        "RN and Next import the same package or a thin fork for storage.",
                        "That's the resume line about centralized API communication.",
                        "Version the API (`/v1`) when you break payloads; don't silently change a field meaning under the ESG app.",
                    ],
                },
            ],
        },
        {
            id: "architecture",
            title: "Architecture",
            items: [
                {
                    q: "How would you design the LMS frontend?",
                    a: "Layout + RBAC routes. Catalog, player, assessments, progress, certificates as features with their own data hooks.",
                    bullets: [
                        "SCORM runtime isolated behind a `ScormPlayer` that talks CMI; the rest of the app never pokes the iframe internals.",
                        "Progress API is the source of truth, not the content package.",
                        "Shared auth interceptor.",
                        "Stream the shell.",
                        "Don't load the player JS on the catalog route (dynamic import).",
                        "Multi-tenant: org in the token, never a client-side org switcher that only filters UI.",
                    ],
                },
                {
                    q: "What is SCORM, practically?",
                    a: "A zip (content) plus a JS runtime API the LMS player must implement: initialize, get/set CMI values (progress, score, suspend data), commit, terminate.",
                    bullets: [
                        "The package is a black box; you persist CMI against registration/attempt.",
                        "Completion → then certificate job.",
                        "Pitfalls: popup blockers, multiple SCO, commit frequency, offline.",
                        "Don't parse the zip in the browser unless you know why.",
                        "Interview: 'I treat SCORM as an integration boundary, not as HTML we restyle'.",
                    ],
                },
                {
                    q: "Certificate generation — pitfalls?",
                    a: "One cert per completion (unique index).",
                    bullets: [
                        "Generate after LMS marks complete, server-side PDF, store immutably.",
                        "Client 'Print diploma' is not a credential.",
                        "Include verification id.",
                        "Template vs data: name, course, date, org logo.",
                        "Regenerating after a name change is a product decision — usually issue a replacement with an audit row, don't silently mutate.",
                        "Same idempotency lesson as payments.",
                    ],
                },
                {
                    q: "ESG/BRSR reporting UI?",
                    a: "Schema per framework version, draft → submit → review → approve, audit trail, KPI dashboards, huge tables.",
                    bullets: [
                        "Historical submissions stay valid against the schema they used.",
                        "URL-synced filters for auditors sharing a view.",
                        "Don't compute regulatory totals only in the browser for the official number — server or a locked snapshot.",
                        "TanStack + virtualization.",
                        "Role: preparer vs approver vs auditor.",
                        "GRI vs BRSR are different schemas, same workflow engine.",
                    ],
                },
                {
                    q: "Approval workflows?",
                    a: "Explicit state machine: draft, submitted, approved, rejected, recalled.",
                    bullets: [
                        "Transitions are permissioned (`approver` cannot edit answers, can reject with comment).",
                        "Persist actor, timestamp, from, to.",
                        "UI is a timeline; the graph lives on the server so RN and web stay consistent.",
                        "Don't use a boolean `isApproved`.",
                        "Parallel approvers need a policy (all vs any).",
                        "Timeouts and reminders are jobs, not useEffect.",
                    ],
                },
                {
                    q: "Convert Desk — why all in the browser?",
                    a: "XLSX never leaves the machine — that's the product, not a constraint you apologize for.",
                    bullets: [
                        "Tradeoff: RAM/CPU limits, no huge server jobs, no collaborative history in the cloud.",
                        "History can be local (IndexedDB) with a cap.",
                        "Workers for parse so the UI doesn't freeze.",
                        "Don't quietly upload 'for processing'.",
                        "If they ask how you'd add accounts later: optional cloud is a different product with a threat model; keep a local mode.",
                    ],
                },
                {
                    q: "ReadSpeed — what must you get right?",
                    a: "Timer from a single clock, WPM = words / minutes, comprehension scored separately so speed-without-understanding doesn't win.",
                    bullets: [
                        "Don't inflate WPM if they skip.",
                        "Randomize passages.",
                        "Persist results (JSON/local) so they can see trend.",
                        "Accessibility: pause, font size.",
                        "Cheating is a product choice; for a test, hide the passage when MCQs start if that's the spec.",
                        "Keep scoring logic in one module you can unit test without rendering React.",
                    ],
                },
                {
                    q: "Multi-tenant frontend?",
                    a: "Tenant in the session, not a query param the user edits.",
                    bullets: [
                        "Client cache keyed by tenant (React Query `queryKey: [orgId, 'courses']`).",
                        "Theming/config is data.",
                        "Never show org A's rows because the list endpoint forgot `orgId` in the filter — that's a backend bug you still design for.",
                        "Subdomain vs path vs header: pick one, document it.",
                        "After org switch, dump the client cache; don't reuse Zustand from the previous tenant.",
                    ],
                },
            ],
        },
        {
            id: "css-perf",
            title: "CSS & performance",
            items: [
                {
                    q: "Tailwind vs CSS-in-JS vs modules?",
                    a: "Tailwind: utilities, tiny runtime, fast iteration, Shadcn sits on it.",
                    bullets: [
                        "CSS-in-JS: dynamic theming, runtime cost and often FOUC.",
                        "Modules: local names, no utility soup.",
                        "You listed Tailwind, MUI, Chakra — say you wouldn't ship two kits.",
                        "MUI/Chakra win when the org already has that design system; Shadcn wins when you own the primitives.",
                        "Don't fight Tailwind by writing huge `@apply` components that recreate CSS-in-JS.",
                    ],
                },
                {
                    q: "Why Shadcn over MUI/Chakra?",
                    a: "You copy source into the repo; you can change the button.",
                    bullets: [
                        "MUI is faster to start, heavier, and theming fights you on enterprise tables.",
                        "Chakra is nicer DX, still a black-box runtime.",
                        "For dashboards: Shadcn + TanStack.",
                        "For a design-system company: maybe MUI.",
                        "Don't customize MUI `sx` on every cell — that's why the ESG grid feels slow.",
                        "Consistency: pick one Button, one Input, one Dialog.",
                    ],
                },
                {
                    q: "LCP, CLS, INP?",
                    a: "LCP: largest paint — hero, dashboard header; use priority image, don't block on a 2MB table.",
                    bullets: [
                        "CLS: reserve space for images, don't inject banners, skeleton with real height.",
                        "INP (replaces FID): time from interaction to next paint — heavy click handlers, huge re-renders, layout thrashing.",
                        "ESG tables fail INP first.",
                        "Don't animate layout.",
                        "Field tools: Web Vitals, Lighthouse, Performance panel.",
                        "A 98 Lighthouse on `/home` means nothing if `/reports` is the product.",
                    ],
                },
                {
                    q: "Bundle cost — how do you talk about it?",
                    a: "dynamic `import()` for xlsx, charts, SCORM player, PDF libs.",
                    bullets: [
                        "Keep `'use client'` leaves small.",
                        "Don't ship moment, lodash-full, and three UI kits.",
                        "`@next/bundle-analyzer`.",
                        "Server Components are a bundle tool: code that only runs on the server never ships.",
                        "If Convert Desk must parse XLSX, that's a deliberate download on that route, not on `/home`.",
                        "Measure before/after; don't quote blog percentages.",
                    ],
                },
                {
                    q: "Accessibility non-negotiables?",
                    a: "Keyboard: table, dialog, select.",
                    bullets: [
                        "Labels on every input (schema forms must generate them).",
                        "Focus trap in modals, restore focus on close.",
                        "Don't use divs as buttons.",
                        "Status not by color alone (approval states).",
                        "`useId` for ids.",
                        "Reduced motion: keep opacity, drop movement.",
                        "Screen reader: live region for 'payment failed', not only a toast they might miss.",
                        "You don't need to be an a11y specialist; you need to not ship an unusable RBAC admin.",
                    ],
                },
                {
                    q: "What should you animate?",
                    a: "transform and opacity, under ~200ms, ease-out.",
                    bullets: [
                        "Frequent actions (tabs you click 100×/day) get little or no motion — your section nav already uses a short clip-path, which is the right budget.",
                        "Don't animate height of a 100-row list.",
                        "`prefers-reduced-motion`.",
                        "Press feedback `scale(0.97)` is enough for buttons.",
                        "If they ask for a 'wow' animation on a dashboard, that's a product smell; spend the time on INP.",
                    ],
                },
            ],
        },
        {
            id: "behavioral",
            title: "Behavioral",
            items: [
                {
                    q: "Tell me about yourself.",
                    a: "Software engineer in Mumbai at Techap since Mar 2024.",
                    bullets: [
                        "I ship production web and mobile: LMS (SCORM, RBAC, certificates), EXG ESG reporting (schema forms, approvals, TanStack tables), BotJunior commerce (JWT, Razorpay), Omooma (Stripe subscriptions), Continuum/BSafe RN permit workflows.",
                        "I care about reusable frontend infrastructure — API layer, auth lifecycle, schema-driven UI — so the next product isn't a fork.",
                        "Close with what you want next: ownership of data-heavy UI and the auth/payments spine.",
                    ],
                },
                {
                    q: "A hard technical problem you solved.",
                    a: "EXG: regulatory modules were heading toward one-off screens per framework.",
                    bullets: [
                        "Schema-driven forms plus URL-synced TanStack tables meant BRSR/GRI could share workflow, filters, and performance work.",
                        "Call out the hard parts: schema versioning so old filings don't break, virtualization, not putting server data in a client store.",
                        "Result: faster delivery, shareable auditor views.",
                        "Don't claim you invented tables; claim you made the reporting surface maintainable.",
                    ],
                },
                {
                    q: "A time you reduced duplication.",
                    a: "Shared Axios layer + auth refresh, schema form primitives, table patterns, RN module kit.",
                    bullets: [
                        "LMS, EXG, BotJunior, and permit types stopped forking interceptors and buttons.",
                        "Concrete: one JWT lifecycle, one payment 'create order on server, fulfill on webhook' shape for Razorpay and Stripe.",
                        "That's how you talk 'reusable architecture' without saying DRY as a slogan.",
                        "Mention the extract-on-the-second-copy rule so you don't sound like you over-abstracted day one.",
                    ],
                },
                {
                    q: "A production incident / mistake.",
                    a: "Use a real one. Structure: impact, what you missed, the fix, then the guardrail.",
                    bullets: [
                        "Impact (users, money, data), miss (webhook retry double-grant, cache serving stale entitlements, RBAC only in UI, hydration bug), fix (unique event id, revalidateTag, server 403, stable render), guardrail (test, monitor, runbook).",
                        "If you don't have a dramatic outage, a silent bug (certificates generated twice) is enough.",
                        "Never blame 'the backend' as the whole story if you owned the client contract.",
                    ],
                },
                {
                    q: "How do you handle conflicting product asks?",
                    a: "Name the user and the constraint (compliance, launch date, security).",
                    bullets: [
                        "Propose a slice: JWT + one Razorpay SKU before coupons, bundles, and every GST edge.",
                        "Write down what you're not doing.",
                        "For ESG, ship one framework schema well rather than half of five.",
                        "Escalate when they want the client to 'just trust paid=true'.",
                        "You're junior in title; you can still own the sequencing conversation.",
                    ],
                },
                {
                    q: "Why this company / this role?",
                    a: "Map their product to something you shipped: learning, reporting, India payments, mobile workflows, dashboards.",
                    bullets: [
                        "Be specific — 'I built RBAC + webhook fulfillment' not 'I like React'.",
                        "If it's a Next.js shop, talk App Router and where you'd put auth.",
                        "Ask what the worst table in prod is.",
                        "You're not desperate; you're choosing a place where those problems exist at a larger scale.",
                    ],
                },
            ],
        },
    ],
} as const

export function getNumberedInterviewPrepSections() {
    let n = 0
    return INTERVIEW_PREP.sections.map((section) => ({
        ...section,
        items: section.items.map((item) => {
            n += 1
            return { ...item, n }
        }),
    }))
}
