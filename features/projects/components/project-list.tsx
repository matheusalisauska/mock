import { ProjectCard } from "./project-card";

export function ProjectList() {
    return (
        <div className="grid grid-cols-5 gap-4 w-full">
            <ProjectCard />
        </div>
    );
}