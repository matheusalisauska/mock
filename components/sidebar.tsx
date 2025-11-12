"use client";

import { cn } from "@/lib/utils";
import { Boxes, HomeIcon, Wallet } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItemProps {
    title: string;
    icon: React.ReactNode;
    href: string;
}

function SidebarItem({ title, icon, href, }: SidebarItemProps) {
    const pathname = usePathname();

    const isActive = pathname.startsWith(href);
    return (
        <Link
            href={href}
            className={cn("flex items-center gap-2 p-2 rounded-md ",
                isActive ? "bg-primary text-white" : "hover:bg-[#ebe8e5] hover:dark:bg-sidebar-accent")}>
            {icon}
            <span>{title}</span>
        </Link>
    );
}

export default function SidebarComponent() {
    return (
        <aside className="bg-sidebar hidden h-full w-56 flex-col gap-y-8 p-4 lg:flex">
            <div className="flex items-center gap-2">
                <div className="size-7 rounded-full bg-gray-500"></div>
                <strong>Mock</strong>
            </div>
            <div className="flex flex-col gap-2">
                <SidebarItem title="Home" icon={<HomeIcon size={18} />} href="/home" />
                <SidebarItem title="Projects" icon={<Boxes size={18} />} href="/projects" />
                <SidebarItem title="Billing" icon={<Wallet size={18} />} href="/billing" />
            </div>
        </aside>
    );
}
