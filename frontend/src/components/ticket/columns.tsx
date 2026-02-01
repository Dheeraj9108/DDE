"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../shared/data-table/data-table-column-header";
import { Action } from "../shared/action";
import { useNavigate } from "react-router-dom";

export type FlowItem = {
  id: string;
  status: string;
  priority: string;
  type: string;
  title: string;
  context: string;
  createdBy: string;
  lastModified: string;
};

export const columns = (
): ColumnDef<FlowItem>[] => [
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
      <DataTableColumnHeader column={column} title="title" />
    ),
  },
  {
    accessorKey: "context",
    size: 20,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="context" />
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
        <Action handleNavigate={handleNavigation} handleDelete={()=>{}} />
      );
    },
  },
];
