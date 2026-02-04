import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, MoreVertical, Pencil, Trash } from "lucide-react";
import { NodeActionProp } from "../../interfaces/flow-interface";

export function NodeAction({ onEdit, onView, onDelete }: NodeActionProp) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <MoreVertical className="h-4 w-4 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={onEdit}><Pencil />Edit</DropdownMenuItem>
                    <DropdownMenuItem onClick={onView}><Eye />View</DropdownMenuItem>
                    <DropdownMenuItem onClick={onDelete}><Trash />Delete</DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}