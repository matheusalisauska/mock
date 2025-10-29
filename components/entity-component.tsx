import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { PropsWithChildren } from "react";

interface EntityHeaderProps {
    path: React.ReactNode;
}

export const EntityHeader = ({ path }: EntityHeaderProps) => {
    return (
        <header className="flex bg-sidebar w-full py-3">
            {path}
            <div className="flex items-center gap-4 ml-auto">
                <Bell size={18} />
                <Avatar>
                    <AvatarImage src="https://github.com/matheusalisauska.png" />
                    <AvatarFallback>M</AvatarFallback>
                </Avatar>
            </div>
        </header>
    );
};

interface EntityContainerProps extends PropsWithChildren {
    header?: React.ReactNode;
    filters?: React.ReactNode;
    create?: React.ReactNode;
}

export const EntityContainer = ({ children, header, filters, create }: EntityContainerProps) => {
    return (
        <div className="flex flex-col gap-4 p-4">
            {header}
            <div className="flex items-center justify-between">
                {filters}
                {create}
            </div>
            {children}
        </div>
    );
};
