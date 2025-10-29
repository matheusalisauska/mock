"use client";

import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput
} from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";
import { useProjectParams } from "../hooks/use-project-params";


export function ProjectFilters() {
    const [params, setParams] = useProjectParams();

    return (
        <div className="flex">
            <InputGroup className="w-fit">
                <InputGroupInput value={params.search} onChange={(e) => setParams({ search: e.target.value })} placeholder="Search..." />
                <InputGroupAddon>
                    <SearchIcon />
                </InputGroupAddon>
            </InputGroup>
        </div>
    );
}