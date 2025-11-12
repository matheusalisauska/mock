import { EntityHeader } from "@/components/entity-component";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function ProjectHeader() {
    return (
        <EntityHeader path={<ProjectBreadcrumb />} />
    );
}

function ProjectBreadcrumb() {
    return (
        <Breadcrumb >
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage><strong>Project Details</strong></BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}