"use client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ProjectCard } from "./project-card";
import { orpc } from "@/lib/orpc";

export function ProjectList() {
    const { data: { projects } } = useSuspenseQuery(orpc.projects.list.queryOptions());

    return (
        <div className="grid grid-cols-5 gap-4 w-full">
            {projects.map((project, index) => (
                <ProjectCard key={index} name={project.name} entities={project.entities} />
            ))}
        </div>
    );
}