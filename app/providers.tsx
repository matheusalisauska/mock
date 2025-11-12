"use client";

import { Toaster } from "@/components/ui/sonner";
import { QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { useState } from "react";
import { createQueryClient } from "../lib/query/client";
import { PHProvider } from "./ph-provider";
import { ThemeProvider } from "@/components/theme-provider";

export function Providers(props: { children: React.ReactNode }) {
    const [queryClient] = useState(() => createQueryClient());

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <QueryClientProvider client={queryClient}>
                <PHProvider>
                    <NuqsAdapter>
                        {props.children}
                    </NuqsAdapter>
                    <Toaster richColors />
                </PHProvider>
            </QueryClientProvider>
        </ThemeProvider>
    );
}