import { ProtectedHeader } from "@/components/protected-header";


export default function ProtectedHome() {
    return (
        <div className="flex flex-col flex-1 h-full">
            <ProtectedHeader />
            <p>home</p>
        </div>
    );
}