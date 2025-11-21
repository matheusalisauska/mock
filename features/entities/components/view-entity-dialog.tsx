import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PropsWithChildren } from "react";
import { EntitiesWithFields } from "../server/entities-procedures";
import { Separator } from "@/components/ui/separator";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Copy } from "lucide-react";
import { MOCK_API_BASE_URL } from "@/config/constants";


interface ViewEntityDialogProps extends PropsWithChildren {
    entity: EntitiesWithFields;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ViewEntityDialog({ entity, isOpen, onOpenChange, children }: ViewEntityDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogTrigger>
                {children}
            </DialogTrigger>
            <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>
                        View Entity
                    </DialogTitle>
                    <DialogDescription>Details of the selected entity.</DialogDescription>
                </DialogHeader>
                <div>
                    <InputGroup>
                        <InputGroupInput readOnly defaultValue={`${MOCK_API_BASE_URL}/${entity.projectId}/${entity.name}`} />
                        <InputGroupAddon align="inline-end">
                            <Copy />
                        </InputGroupAddon>
                    </InputGroup>
                </div>
            </DialogContent>
        </Dialog>
    );
}