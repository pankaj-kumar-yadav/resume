"use client";

import { useEffect } from "react";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

type Props = {
    children: React.ReactNode;
};

export function PHProvider(props: Props) {
    const { children } = props;

    useEffect(() => {
        // Prevent initializing during SSR
        if (typeof window === "undefined") return;

        posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
            api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
            capture_pageview: true, // automatically track page views
            persistence: "localStorage",
        });
    }, []);

    return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}