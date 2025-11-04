import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function EntititiesListSkeleton() {
    return (
        <div className="flex flex-col gap-y-4">
            <Card className="gap-1 min-w-[330px]">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                            <Skeleton className="size-7" />
                            <Skeleton className="h-6 w-36" />
                        </div>
                        <Skeleton className="h-8 w-16" />
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-x-2 px-4 bg-secondary/60 p-2 rounded-md">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-7 w-16 rouned-md" />
                        <div className="flex gap-2 items-center ml-auto">
                            <Skeleton className="size-8" />
                            <Skeleton className="size-8" />
                        </div>
                    </div>
                    <div className="flex items-center gap-x-2 px-4 bg-secondary/60 p-2 rounded-md">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-7 w-16 rouned-md" />
                        <div className="flex gap-2 items-center ml-auto">
                            <Skeleton className="size-8" />
                            <Skeleton className="size-8" />
                        </div>
                    </div>
                    <div className="flex items-center gap-x-2 px-4 bg-secondary/60 p-2 rounded-md">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-7 w-16 rouned-md" />
                        <div className="flex gap-2 items-center ml-auto">
                            <Skeleton className="size-8" />
                            <Skeleton className="size-8" />
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className="gap-1 min-w-[330px]">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                            <Skeleton className="size-7" />
                            <Skeleton className="h-6 w-36" />
                        </div>
                        <Skeleton className="h-8 w-16" />
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-x-2 px-4 bg-secondary/60 p-2 rounded-md">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-7 w-16 rouned-md" />
                        <div className="flex gap-2 items-center ml-auto">
                            <Skeleton className="size-8" />
                            <Skeleton className="size-8" />
                        </div>
                    </div>
                    <div className="flex items-center gap-x-2 px-4 bg-secondary/60 p-2 rounded-md">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-7 w-16 rouned-md" />
                        <div className="flex gap-2 items-center ml-auto">
                            <Skeleton className="size-8" />
                            <Skeleton className="size-8" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}