"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../shared/data-table/data-table-column-header";
import { Action } from "../shared/action";
import { useNavigate } from "react-router-dom";
import { IActionItem } from "../shared/interfaces/interfaces";

export type TicketItem = {
  id: string;
  status: string;
  priority: string;
  type: string;
  title: string;
  createdBy: string;
  lastModified: string;
};

export const columns = (allActions: IActionItem[]): ColumnDef<TicketItem>[] => [
  {
    accessorKey: "status",
    size: 20,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
  },
  {
    accessorKey: "priority",
    size: 20,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
  },
  {
    accessorKey: "type",
    size: 20,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
  },
  {
    accessorKey: "title",
    size: 20,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
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
    accessorKey: "assignedTo",
    size: 20,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assigned To" />
    ),
  },
  {
    accessorKey: "lastModified",
    size: 20,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Modified" />
    ),
  },
  {
    header: "Actions",
    id: "actions",
    size: 5,
    cell: ({ row }) => {
      const navigate = useNavigate();
      const handleNavigation = () => {
        navigate("/ticketInfo");
      };
      return (
        <Action actions={allActions} row={row.original} />
      );
    },
  },
];
