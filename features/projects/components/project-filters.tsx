import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput
} from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";


export function ProjectFilters() {
    return (
        <div className="flex">
            <InputGroup className="w-fit">
                <InputGroupInput placeholder="Search..." />
                <InputGroupAddon>
                    <SearchIcon />
                </InputGroupAddon>
            </InputGroup>
        </div>
    );
}