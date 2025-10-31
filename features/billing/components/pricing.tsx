"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { orpc } from "@/lib/orpc";
import { useMutation } from "@tanstack/react-query";
import { CircleCheck, CircleX } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PixPaymentModal } from "./pix-payment-modal";


export function Pricing() {
    const [showModal, setShowModal] = useState(false);
    const [base64QrCode, setBase64QrCode] = useState("");

    const createProjectMutation = useMutation(orpc.billing.createPix.mutationOptions({
        onSuccess: ({ data }) => {
            setBase64QrCode(data?.brCodeBase64 || "");
            setShowModal(true);
        },
        onError: (error) => {
            console.log(error);
            toast.error("Failed to create project. Please try again.");
        }
    }));

    const handleCreateBilling = () => {
        createProjectMutation.mutate();
    };

    return (
        <div className="flex flex-col gap-8 w-full h-full items-center mt-16">
            <div className="flex flex-col items-center">
                <h1 className="text-4xl font-bold">Pricing</h1>
                <p className="text-lg">Upgrade to premium for more features</p>
            </div>
            <div className="flex gap-8">
                <Card className="min-w-[280px]">
                    <CardHeader>
                        <CardTitle>Free</CardTitle>
                        <CardDescription>
                            Basic features for testing
                        </CardDescription>
                        <p className="font-semibold text-2xl">$0 <span className="font-light">/month</span></p>
                    </CardHeader>
                    <CardContent>
                        <Separator />
                        <div className="flex flex-col gap-2 mt-4">
                            <div className="flex items-center gap-1">
                                <CircleCheck size={15} />
                                <p className="text-sm">1 project</p>
                            </div>
                            <div className="flex items-center gap-1">
                                <CircleCheck size={15} />
                                <p className="text-sm">3 entities</p>
                            </div>
                            <div className="flex items-center gap-1">
                                <CircleCheck size={15} />
                                <p className="text-sm">10 fields</p>
                            </div>
                            <div className="flex items-center gap-1">
                                <CircleX size={15} />
                                <p className="text-sm">No custom response</p>
                            </div>
                            <div className="flex items-center gap-1">
                                <CircleX size={15} />
                                <p className="text-sm">No generate data with AI</p>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="mx-auto mt-4">
                        <Button variant={"outline"} disabled className="px-8">Current plan</Button>
                    </CardFooter>
                </Card>
                <Card className="min-w-[280px]">
                    <CardHeader>
                        <CardTitle>Premium Plan</CardTitle>
                        <CardDescription>
                            Get access to all premium features
                        </CardDescription>
                        <p className="font-semibold text-2xl">$5 <span className="font-light">/month</span></p>
                    </CardHeader>
                    <CardContent>
                        <Separator />
                        <div className="flex flex-col gap-2 mt-4">
                            <div className="flex items-center gap-1">
                                <CircleCheck size={15} />
                                <p className="text-sm">Unlimited projects</p>
                            </div>
                            <div className="flex items-center gap-1">
                                <CircleCheck size={15} />
                                <p className="text-sm">50 entities</p>
                            </div>
                            <div className="flex items-center gap-1">
                                <CircleCheck size={15} />
                                <p className="text-sm">100 fields</p>
                            </div>
                            <div className="flex items-center gap-1">
                                <CircleCheck size={15} />
                                <p className="text-sm">Custom response</p>
                            </div>
                            <div className="flex items-center gap-1">
                                <CircleCheck size={15} />
                                <p className="text-sm">Generate data with AI</p>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="mx-auto mt-4">
                        {showModal ?
                            <PixPaymentModal isOpen={showModal} setIsOpen={setShowModal} base64QrCode={base64QrCode} />
                            :
                            <Button
                                disabled={createProjectMutation.isPending}
                                onClick={handleCreateBilling}
                                className="px-8">
                                {createProjectMutation.isPending ? "Processing..." : "Purchase"}
                            </Button>
                        }
                    </CardFooter>
                </Card>
            </div>
        </div >
    );
}