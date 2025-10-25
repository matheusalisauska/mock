import { ProtectedHeader } from "@/components/protected-header";
import { ProjectListView } from "@/features/projects/views/project-list-view";



export default function ProjectsPage() {
    return (
        <div className="flex flex-col">
            <ProtectedHeader />
            <ProjectListView />
        </div>
    );
}
