import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function EntityCodeBlockSkeleton() {
    return (
        <Card className="h-fit w-full max-w-[500px] gap-4">
            <CardHeader className="flex items-start justify-between">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-8 w-32" />
            </CardHeader>
            <CardContent>
                <div className="flex w-full flex-col gap-2 overflow-x-auto rounded-md bg-gray-100 p-4">
                    <Skeleton className="ml-auto size-7" />
                    <div className="space-y-2">
                        <Skeleton className="h-7 w-full" />
                        <Skeleton className="h-7 w-[60%]" />
                        <Skeleton className="h-7 w-[75%]" />
                        <Skeleton className="h-7 w-full" />
                    </div>
                </div>
            </CardContent>
        </Card >
    );
}