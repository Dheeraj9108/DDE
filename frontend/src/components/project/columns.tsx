import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../shared/data-table/data-table-column-header";
import { Action } from "../shared/action";
import { useNavigate } from "react-router-dom";

export const columns=(
  handleDelete:(id:string)=>void
) :ColumnDef<any>[] => [
  {
    accessorKey: "name",
    size: 20,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
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
    accessorKey: "createdAt",
    size: 20,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),cell: ({ row }) => {
    const value = row.getValue("createdAt") as string

    return (
      <span>
        {new Date(value).toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
    )
  },
  },
  {
    header: "Actions",
    id: "actions",
    size: 5,
    cell: ({ row }) => {
      const navigate = useNavigate();
      const handleNavigation = () => {
        navigate(`/projects/${row.original.id}/flows`);
      };
      const onDelete = () => {
        handleDelete(row.original.id);
      };
      return <Action handleNavigate={handleNavigation}  handleDelete={onDelete}/>;
    },
  },
];



// CREATE OR REPLACE FUNCTION create_flow_with_defaults(
//     project_id UUID 
//     flow_name TEXT,
//     flow_description TEXT
// ) RETURNS UUID AS $$
// DECLARE
//     new_flow_id UUID;
// BEGIN
//     -- 1. Insert the flow and get its UUID
//     INSERT INTO flow(id,name,description,project_id)
//     VALUES (gen_random_uuid(),flow_name,flow_description,project_id)
//     RETURNING id INTO new_flow_id;

//     -- 2. Insert default nodes
//     INSERT INTO node(node_id,ui_id, type, flow_id, data)
//     VALUES 
//       (gen_random_uuid(),'1','startNode', new_flow_id, '{"label":"Start"}'::jsonb),
//       (gen_random_uuid(),'2','addButton', new_flow_id, '{"label":"Add Button"}'::jsonb);

//     -- 3. Insert default edge
//     INSERT INTO edge(edge_id,ui_id, source, target, flow_id, style)
//     VALUES (
//       gen_random_uuid(),
// 	    'e1-2',
//      '1',
//      '2',
//       new_flow_id,
//       '{"stroke":"#6366f1","strokeWidth":2}'::jsonb
//     );

//     -- 4. Return the flow UUID
//     RETURN new_flow_id;
// END;
// $$ LANGUAGE plpgsql;
