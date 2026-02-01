"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../shared/data-table/data-table-column-header";
import { Action } from "../shared/action";
import { useNavigate } from "react-router-dom";
import { IFlowListItem } from "./interfaces/flow-interface";

export const columns = (
  projectId: string,
  handleDelete: (id: string) => void
): ColumnDef<IFlowListItem>[] => [
  {
    accessorKey: "name",
    size: 20,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Flow Name" />
    ),
  },
  {
    accessorKey: "version",
    size: 20,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Flow Version" />
    ),
  },
  {
    accessorKey: "description",
    size: 100,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Flow Description" />
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
  },
  {
    header: "Actions",
    id: "actions",
    size: 5,
    cell: ({ row }) => {
      const navigate = useNavigate();
      const handleNavigation = () => {
        navigate(`/projects/${projectId}/flows/${row.original.id}`);
      };
      const onDelete = () => {
        handleDelete(row.original.id);
      };
      return (
        <Action handleNavigate={handleNavigation} handleDelete={onDelete} />
      );
    },
  },
];
