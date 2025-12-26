import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PropsWithChildren } from "react";
import { EntitiesWithFields } from "../server/entities-procedures";
import { Separator } from "@/components/ui/separator";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { CircleX, Clock, Copy, Lock } from "lucide-react";
import { MOCK_API_BASE_URL } from "@/config/constants";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";


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
                <div className="flex flex-col gap-8">
                    <div className="flex gap-8">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-1">
                                <Lock size={15} />
                                <Label>Require Auth</Label>
                            </div>
                            <Switch />
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-1">
                                <CircleX size={15} />
                                <Label>Throw Error</Label>
                            </div>
                            <Switch />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <Clock size={15} />
                            <Label>Response Time: <span className="text-sm">~1 second</span></Label>
                        </div>
                        <Slider defaultValue={[33]} max={100} step={1} />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}