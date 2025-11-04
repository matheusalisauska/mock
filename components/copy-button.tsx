import { useState } from "react";
import { Button } from "./ui/button";
import { Copy, CopyCheck } from "lucide-react";


interface Props {
    textToCopy: string;
}

export function CopyButton({ textToCopy }: Props) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Button disabled={copied} onClick={handleCopy} variant={"secondary"} className="ml-auto" size={"icon-sm"}>
            {copied ? <CopyCheck /> : <Copy />}
        </Button>
    );
}