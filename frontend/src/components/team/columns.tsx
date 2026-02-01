"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { PopoverContent } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { DataTableColumnHeader } from "../shared/data-table/data-table-column-header";

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

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "Role",
    header: "Role",
    cell: ({ row }) => {
      const [selectedRole, setSelectedRole] = useState(
        row.original.role || "owner"
      );
      const [open, setOpen] = useState(false);

      const handleRoleSelect = (roleValue: string) => {
        setSelectedRole(roleValue);
        setOpen(false);
      };

      const currentRole = roles.find((role) => role.value === selectedRole);

      return (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="ml-auto">
              {currentRole?.label}{" "}
              <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0" align="end">
            <Command>
              <CommandInput placeholder="Select new role..." />
              <CommandList>
                <CommandEmpty>No roles found.</CommandEmpty>
                <CommandGroup>
                  {roles.map((role) => (
                    <CommandItem
                      key={role.value}
                      className="flex flex-col items-start px-4 py-2 space-y-1"
                      onSelect={() => handleRoleSelect(role.value)}
                    >
                      <p>{role.label}</p>
                      <p className="text-sm text-muted-foreground">
                        {role.description}
                      </p>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      );
    },
  },
];
