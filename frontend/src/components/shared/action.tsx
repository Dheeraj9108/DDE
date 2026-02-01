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
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
export const Action = ({
  handleNavigate,
  handleDelete,
}: {
  handleNavigate: () => void;
  handleDelete: () => void;
}) => {
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
          <span></span>Actions
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <IconEdit /> Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleNavigate()}>
          <IconEye />
          View
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDelete()}>
          <IconTrash />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
