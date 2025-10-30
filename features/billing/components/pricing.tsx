"use client";

import { Button } from "@/components/ui/button";
import { orpc } from "@/lib/orpc";
import { isDefinedError } from "@orpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";


export function Pricing() {

    const createProjectMutation = useMutation(orpc.billing.createPix.mutationOptions({
        onSuccess: (data) => {
            console.log(data);
            toast.success(
                "Pix created successfully"
            );
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
        <div>
            <p>PREMIUM</p>
            <Button onClick={handleCreateBilling}>buy</Button>
        </div>
    );
}