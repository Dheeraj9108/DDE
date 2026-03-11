"use client";

import { ColumnDef } from "@tanstack/react-table";
// import { Button } from "@/components/ui/button";
// import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
// import { PopoverContent } from "../ui/popover";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "../ui/command";
// import { ChevronDown } from "lucide-react";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { DataTableColumnHeader } from "../shared/data-table/data-table-column-header";
import { IActionItem } from "../shared/interfaces/interfaces";
import { Action } from "../shared/action";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";
import { IUser } from "./interface";

export type FlowItem = {
  id: string;
  flowName: string;
  flowVersion: number;
  flowDescription: string;
  createdBy: string;
  status: "Checked-IN" | "Checked-OUT";
};

const roles = [
  {
    value: "viewer",
    label: "Viewer",
    description: "Can view."
  },
  {
    value: "developer", 
    label: "Developer",
    description: "Can view and edit."
  },
  {
    value: "Admin",
    label: "Admin",
    description: "Admin-level access to all resources."
  }
]

export const columns=(actions: IActionItem[], onUpdate:(user:IUser)=>void): ColumnDef<any>[] => [
  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "Role",
    header: "Roles & Permissions",
    cell: ({ row }) => {
      const [ selectedRoles, setSelectedRoles] = useState<string[]>(row?.original?.roles ?? []);
      const [ showCheckbox, setShowCheckbox] = useState<boolean>();

      useEffect(()=>{
        if(selectedRoles.includes("Flow Creator")) setShowCheckbox(true);
        else setShowCheckbox(false);
      },[selectedRoles]);

      const roles = [
        "Admin",
        "Flow Creator",
        "Flow Executor"
      ] as const;

      const handleRemoveRole=(role:string)=>{
        setSelectedRoles((prev)=>{
          let newRoles = prev.filter(r=>r!==role);; 
          row.original.roles = newRoles;
          return newRoles;
        });
        onUpdate(row.original);
      }

      const onRoleChange=(roles:string[])=>{
        row.original.roles = roles;
        setSelectedRoles(roles);
        onUpdate(row.original);
      }
      
      const onChecked=(checked:boolean)=>{
        row.original.projectOwner = checked;
        onUpdate(row.original);
      }

      return (
        <div className="gap-3">
          <div className="mb-2">
            {
              selectedRoles?.map(role=>(
                <Badge variant="secondary" className="mr-1">
                  {role}
                  <span className="cursor-pointer">
                    <X className="text-red-500" size={14} onClick={()=>handleRemoveRole(role)}/>
                  </span>
                </Badge>
              ))
            }
          </div>
          <Combobox multiple autoHighlight items={roles} value={selectedRoles} onValueChange={(roles)=>onRoleChange(roles)}>
            <ComboboxInput placeholder="Select a Role" className="w-50"/>
            <ComboboxContent className="bg-gray-900">
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
          {
            showCheckbox &&
              <div className="flex-1 flex items-center gap-1 mt-2">
                <Checkbox checked={row.original?.projectOwner} onCheckedChange={(value: boolean) => onChecked(value)}/> Project Owner
              </div>
          }
        </div>
      );
    },
  },
  {
      header: "Actions",
      id: "actions",
      size: 5,
      cell: ({ row }) => {
        return (
          <Action actions={actions} row={row.original} />);
      },
    },
];
