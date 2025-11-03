"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { env } from "@/lib/env";
import { orpc } from "@/lib/orpc";
import { useSuspenseQuery } from "@tanstack/react-query";

export function ProjectDetails({ id }: { id: string }) {
    const { data: project } = useSuspenseQuery(orpc.projects.getOne.queryOptions({ input: { id } }));

    return (
        <Card className="gap-1 w-fit h-fit">
            <CardHeader>
                <CardTitle className="text-lg">
                    {project.name}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sky-500">{env.BASE_URL}/api/mock/{project.id}/<span className="text-primary bg-[#ffedd5] rounded-md py-0.5 font-semibold">:entity</span></p>
            </CardContent>
        </Card>
    );
}