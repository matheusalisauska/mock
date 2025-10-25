import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function ProtectedHeader() {

    return (
        <header className="flex bg-sidebar w-full px-4 py-3">
            <strong>Good afternoon, Alisauska!</strong>
            <div className="flex items-center gap-4 ml-auto">
                <Bell size={18} />
                <Avatar>
                    <AvatarImage src="https://github.com/matheusalisauska.png" />
                    <AvatarFallback>M</AvatarFallback>
                </Avatar>
            </div>
        </header>
    );
}