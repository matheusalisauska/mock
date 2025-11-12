"use client";

import { env } from "@/lib/env";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect } from "react";

export function PHProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        if (typeof window !== "undefined") {
            posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
                api_host: env.NEXT_PUBLIC_POSTHOG_HOST || "/ingest",
                person_profiles: "identified_only",
                capture_pageview: false, // We'll handle this manually
                capture_pageleave: true,
            });
        }
    }, []);

    return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}