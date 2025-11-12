import SidebarComponent from "@/components/sidebar";


export default function ProtectedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex h-full">
            <SidebarComponent />
            <div className="flex flex-1 flex-col">
                {children}
            </div>
        </div>
    );
}
