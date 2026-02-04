import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { IAction } from "./interfaces/interfaces";

export const Action = (actionProp: IAction) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <span></span>{actionProp.label ?? 'Actions'}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {
          actionProp?.actions?.map(action => {
            return (
              <DropdownMenuItem onClick={() => action.onClick(actionProp.row)}>
                {action.icon}{action.label}
              </DropdownMenuItem>
            )
          })
        }
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
