import { Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface NodeSelectorProps {
  onSelect: (type: "conditional" | "action" | "end") => void;
}

export function NodeSelector({ onSelect }: NodeSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Button className="w-8 h-8 p-0 bg-purple-600 hover:bg-purple-700 border-2 border-purple-500 rounded-full transition-colors">
          <Plus className="w-4 h-4 text-white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Nodes</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onSelect("conditional")}>
          Conditional
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSelect("action")}>
          Action
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSelect("end")}>End</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
