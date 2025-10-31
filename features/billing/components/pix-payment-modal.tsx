import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";

interface Props {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    base64QrCode: string;
}

export function PixPaymentModal({ isOpen, setIsOpen, base64QrCode }: Props) {
    const imageSrc = base64QrCode.startsWith("data:image")
        ? base64QrCode
        : `data:image/png;base64,${base64QrCode}`;
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="px-8">View QRCode</Button>
            </DialogTrigger>
            <DialogContent className="lg:max-w-[350px]">
                <DialogHeader className="items-center">
                    <DialogTitle className="text-2xl">Scan QR Code</DialogTitle>
                    <DialogDescription>Scan this code to complete your payment</DialogDescription>
                </DialogHeader>
                <div className="flex justify-center">
                    {base64QrCode ? (
                        <Image
                            src={imageSrc}
                            alt="QR Code"
                            width={250}
                            height={250}
                            className="rounded-md"
                        />
                    ) : (
                        <p>No QR Code available</p>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}