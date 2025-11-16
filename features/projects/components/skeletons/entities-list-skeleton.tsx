import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function EntititiesListSkeleton() {
    return (
        <div className="flex flex-col gap-y-4">
            <Card className="min-w-[330px] gap-1">
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
                    <div className="bg-secondary/60 dark:bg-accent/20 flex items-center gap-x-2 rounded-md p-2 px-4">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="rouned-md h-7 w-16" />
                        <div className="ml-auto flex items-center gap-2">
                            <Skeleton className="size-8" />
                            <Skeleton className="size-8" />
                        </div>
                    </div>
                    <div className="bg-secondary/60 dark:bg-accent/20  flex items-center gap-x-2 rounded-md p-2 px-4">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="rouned-md h-7 w-16" />
                        <div className="ml-auto flex items-center gap-2">
                            <Skeleton className="size-8" />
                            <Skeleton className="size-8" />
                        </div>
                    </div>
                    <div className="bg-secondary/60 dark:bg-accent/20  flex items-center gap-x-2 rounded-md p-2 px-4">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="rouned-md h-7 w-16" />
                        <div className="ml-auto flex items-center gap-2">
                            <Skeleton className="size-8" />
                            <Skeleton className="size-8" />
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className="min-w-[330px] gap-1">
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
                    <div className="bg-secondary/60 dark:bg-accent/20  flex items-center gap-x-2 rounded-md p-2 px-4">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="rouned-md h-7 w-16" />
                        <div className="ml-auto flex items-center gap-2">
                            <Skeleton className="size-8" />
                            <Skeleton className="size-8" />
                        </div>
                    </div>
                    <div className="bg-secondary/60 dark:bg-accent/20  flex items-center gap-x-2 rounded-md p-2 px-4">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="rouned-md h-7 w-16" />
                        <div className="ml-auto flex items-center gap-2">
                            <Skeleton className="size-8" />
                            <Skeleton className="size-8" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}