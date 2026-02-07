"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../../shared/data-table/data-table-column-header";
import { Action } from "../../shared/action";
import { IFlowListItem } from "../interfaces/flow-interface";
import { IActionItem } from "@/components/shared/interfaces/interfaces";
import { Badge } from "@/components/ui/badge";
import { AlertTriangleIcon, CheckIcon, PencilIcon, SearchIcon, UploadIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

const statusMap = {
  "Draft": { icon: PencilIcon, className: "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300" },
  "Submitted": { variant: 'secondary', icon: UploadIcon, className: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300" },
  "Under Review": { variant: 'secondary', icon: SearchIcon, className: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300" },
  "Approved": { variant: 'secondary', icon: CheckIcon, className: "bg-green-100 text-green-700 bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300" },
  "Requested Changes": { variant: 'secondary', icon: AlertTriangleIcon, className: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300" }
} as const

export const columns = (allActions: IActionItem[]): ColumnDef<IFlowListItem>[] => [
  {
    accessorKey: "name",
    size: 20,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "version",
    size: 20,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Version" />
    ),
  },
  {
    accessorKey: "description",
    size: 100,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
  },
  {
    accessorKey: "createdBy",
    size: 20,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created By" />
    ),
  },
  {
    accessorKey: "status",
    size: 20,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }: { row: Row<IFlowListItem> }) => {
      const { icon: Icon, className } = statusMap[row.original.status];
      return (
        <Badge variant="secondary" className={className}>
          {/* <Icon /> */}
          {row.original.status}
        </Badge>
      )
    }
  },
  {
    header: "Actions",
    id: "actions",
    size: 5,
    cell: ({ row }) => {
      let actions = allActions;
      switch (row.original.status) {
        case "Draft":
          actions = allActions;
          break;
        case "Approved":
          actions = allActions.filter(action => ["View"].includes(action.label));
          break;
        case "Requested Changes":
          actions = allActions.filter(action => ["Edit", "View"].includes(action.label));
          break;
        case "Submitted":
        case "Under Review":
        default:
          actions = allActions.filter(action => ["View"].includes(action.label));
      }
      return (
        <Action actions={actions} row={row.original} />);
    },
  },
];
