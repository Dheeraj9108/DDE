import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical} from "lucide-react";
import { NodeActionProp } from "../../../interfaces/flow-interface";

export function NodeAction({ actions }: NodeActionProp) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <MoreVertical className="h-4 w-4 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    {actions.map(action => (
                        <DropdownMenuItem onClick={action.onClick}>
                            {action.icon}{action.label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}