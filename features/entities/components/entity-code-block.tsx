"use client";

import { CopyButton } from "@/components/copy-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EntityCodeBlockSkeleton } from "@/features/projects/components/skeletons/entity-code-block-skeleton";
import { FieldConfig, generateMockResponse } from "@/lib/mock/generateMockItem";
import { orpc } from "@/lib/orpc";
import { toOptions } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { TextQuote } from "lucide-react";
import { useState } from "react";

interface EntityCodeBlockProps {
    projectId: string;
}

export function EntityCodeBlock({ projectId }: EntityCodeBlockProps) {
    const [selectedEntity, setSelectedEntity] = useState<string>();

    const {
        data: entities,
        isLoading,
    } = useQuery(orpc.entities.getManyWithFields.queryOptions({
        input: {
            projectId: projectId,
            includeFields: true
        }
    }));

    const { data: fields } = useQuery(
        orpc.fields.getMany.queryOptions({
            input: {
                entityId: selectedEntity || entities?.items[0]?.id,
            },
            enabled: !!selectedEntity || !!entities?.items[0]?.id,
        })
    );

    if (isLoading) {
        return <EntityCodeBlockSkeleton />;
    }

    const entitiesOptions = toOptions(entities?.items || [], "name", "id");

    const fieldConfigs: FieldConfig[] = fields?.items?.map((field) => ({
        name: field.name,
        baseType: field.type,
        fakerGenerator: field.fakerGenerator || undefined,
        fakerArgs: Array.isArray(field.fakerArgs) ? field.fakerArgs : undefined,
        enumValues: undefined,
    })) ?? [];

    const mockData = generateMockResponse(fieldConfigs, 1);

    const jsonData = JSON.stringify(mockData, null, 2);



    return (
        <Card className="h-fit w-full max-w-[500px] gap-4">
            <CardHeader className="flex items-start justify-between">
                <CardTitle className="flex items-center gap-1 text-lg">
                    <TextQuote size={18} />
                    Endpoint Response
                </CardTitle>
                <Select value={selectedEntity} onValueChange={(e) => setSelectedEntity(e)} defaultValue={entitiesOptions[0]?.value}>
                    <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Select Entity" />
                    </SelectTrigger>
                    <SelectContent>
                        {entitiesOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                <div className="flex w-full flex-col overflow-x-auto rounded-md bg-gray-100 p-4">
                    <CopyButton textToCopy={jsonData} />
                    <pre >
                        <code>
                            {jsonData}
                        </code>
                    </pre>
                </div>
            </CardContent>
        </Card >
    );
}
