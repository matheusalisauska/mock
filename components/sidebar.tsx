"use client";

import { cn } from "@/lib/utils";
import { Boxes, HomeIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItemProps {
    title: string;
    icon: React.ReactNode;
    href: string;
}

function SidebarItem({ title, icon, href, }: SidebarItemProps) {
    const pathname = usePathname();

    const isActive = pathname === href;
    return (
        <Link
            href={href}
            className={cn("flex items-center gap-2 p-2 rounded-md ",
                isActive ? "bg-primary text-white" : "hover:bg-[#ebe8e5]")}>
            {icon}
            <span>{title}</span>
        </Link>
    );
}

export default function SidebarComponent() {
    return (
        <aside className="flex flex-col gap-y-8 w-56 h-full bg-sidebar p-4">
            <div className="flex gap-2 items-center">
                <div className="size-7 bg-gray-500 rounded-full"></div>
                <strong>Mock</strong>
            </div>
            <div className="flex flex-col gap-2">
                <SidebarItem title="Home" icon={<HomeIcon size={18} />} href="/home" />
                <SidebarItem title="Projects" icon={<Boxes size={18} />} href="/projects" />
            </div>
        </aside>
    );
}
