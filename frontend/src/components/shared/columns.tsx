import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table/data-table-column-header";
import { GenericColumn, IActionItem } from "./interfaces/interfaces";
import { Action } from "./action";

export const generateColumns = <T extends Record<string, any>>(
  columns: GenericColumn[],
  actions: IActionItem[]
): ColumnDef<T>[] => {
  return columns.map(col => ({
    accessorKey: col.key as string,
    size: col.size,
    header: ({ column }) => <DataTableColumnHeader column={column} title={col.title} />,
    cell: ({ row }) => col.key === 'actions' ? <Action actions={actions} row={row.original} /> : row.original[col.key]
  }));
};