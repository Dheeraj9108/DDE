import { DataTableColumnHeader } from "@/components/shared/data-table/data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";
import { ICollaborator } from "../../interfaces/flow-interface";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

export const columns = (): ColumnDef<ICollaborator>[] => [
    {
        accessorKey: "user",
        size: 20,
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="User" />
        ),
        cell:({row})=>{
            return (
                <div className="flex flex-col">
                    <div>
                        {row.original.name}
                    </div>
                    <div>
                        {row.original.email}
                    </div>
                </div>
            )
        }
    },
    {
        accessorKey: "isReviewer",
        size: 20,
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Is Reviewer"/>
        ),
        cell:({row})=>{
            const [checked, setChecked] = useState<boolean>(row.original.isReviewer);
            const onStatusChange=(value:boolean)=>{
                setChecked(value);
                row.original.isReviewer = value;
            }
            return <Checkbox checked={checked} onCheckedChange={(value:boolean)=>onStatusChange(value)} />
        }
    },
];