import SidebarComponent from "@/components/sidebar";


export default function ProtectedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex h-full">
            <SidebarComponent />
            <div className="flex flex-col flex-1">
                {children}
            </div>
        </div>
    );
}
