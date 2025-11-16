"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { env } from "@/lib/env";
import { orpc } from "@/lib/orpc";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Boxes, CircleX, Clock, Lock } from "lucide-react";

export function ProjectDetails({ id }: { id: string }) {
    const { data: project } = useSuspenseQuery(orpc.projects.getOne.queryOptions({ input: { id } }));

    return (
        <Card className="h-fit w-fit gap-1">
            <CardHeader>
                <CardTitle className="flex items-center gap-1 text-lg">
                    <Boxes size={18} />
                    {project.name}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
                <p className="text-sky-500">{env.BASE_URL}/api/mock/{project.id}/<span className="text-primary dark:bg-accent ml-1 rounded-md bg-[#ffedd5] px-2 py-px font-semibold dark:text-amber-500">:entity</span></p>
                <div className="flex flex-col gap-8">
                    <div className="flex gap-8">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-1">
                                <Lock size={15} />
                                <Label>Require Auth</Label>
                            </div>
                            <Switch />
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-1">
                                <CircleX size={15} />
                                <Label>Throw Error</Label>
                            </div>
                            <Switch />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <Clock size={15} />
                            <Label>Response Time: <span className="text-sm">~1 second</span></Label>
                        </div>
                        <Slider defaultValue={[33]} max={100} step={1} />
                    </div>
                </div>
            </CardContent>
        </Card >
    );
}