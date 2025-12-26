"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { env } from "@/lib/env";
import { orpc } from "@/lib/orpc";
import { useSuspenseQuery } from "@tanstack/react-query";

export function ProjectDetails({ id }: { id: string }) {
    const { data: project } = useSuspenseQuery(orpc.projects.getOne.queryOptions({ input: { id } }));

    return (
        <Card className="h-fit w-fit min-w-[600px] gap-1">
            <CardHeader>
                <CardTitle className="flex items-center gap-1 text-lg">
                    {project.name}
                </CardTitle>
                <CardDescription>
                    Manage the settings for your project
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
                <p className="text-sky-500">{env.BASE_URL}/api/mock/{project.id}/<span className="text-primary dark:bg-accent ml-1 rounded-md bg-[#ffedd5] px-2 py-px font-semibold dark:text-amber-500">:entity</span></p>

            </CardContent>
        </Card >
    );
}