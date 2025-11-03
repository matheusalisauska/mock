"use client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ProjectCard } from "./project-card";
import { orpc } from "@/lib/orpc";
import { useProjectParams } from "../hooks/use-project-params";

export function ProjectList() {
    const [params] = useProjectParams();
    const { data: { items } } = useSuspenseQuery(orpc.projects.getMany.queryOptions({ input: params }));

    return (
        <div className="flex fle-col lg:grid lg:grid-cols-5 gap-4 w-full">
            {items.map((project, index) => (
                <ProjectCard key={index} project={project} />
            ))}
        </div>
    );
}