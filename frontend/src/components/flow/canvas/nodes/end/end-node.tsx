import { Handle, Position } from "@xyflow/react";
import { EndDialog } from "./end-dialog";
import { IEndNode, INodeAction } from "../../../interfaces/flow-interface";
import { NodeAction } from "../utils/node-action";
import { useState } from "react";
import * as CONST from "../../../constants";
import { IconMessageCircleFilled } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Eye, Pencil, Trash } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function EndNode({ id, data }: IEndNode) {

  const [showDialog, setShowDialog] = useState(false);
  const [mode, setMode] = useState<String>(CONST.MODE.VIEW);

  const handleEdit = (nodeInfo: any) => {
    data.onEdit(id, nodeInfo);
  };

  const onEdit = () => {
    setShowDialog(true);
    setMode(CONST.MODE.EDIT);
  }

  const onView = () => {
    setShowDialog(true);
    setMode(CONST.MODE.VIEW);
  }

  const closeDialog = () => {
    setShowDialog(false);
  }

  const onDelete = () => {
    data.onDelete(id);
  }

  const nodeActions: INodeAction[] = [
    {
      label: "Edit",
      icon: <Pencil />,
      onClick: onEdit
    },
    {
      label: "View",
      icon: <Eye />,
      onClick: onView
    },
    {
      label: "Delete",
      icon: <Trash />,
      onClick: onDelete
    }
  ];

  return (
    <div className={cn("bg-gray-800 border border-gray-700 rounded-lg p-0 w-[200px] h-[150px] text-white",
      data.comments && "relative border-yellow-400"
    )}>
      <div className="flex justify-between p-3 border-b">
        <div className="flex flex-col w-0 flex-1">
          <h4 className="text-sm font-medium truncate" title={data.label}>
            {data.label}
          </h4>
          {/* <p className="text-xs text-muted-foreground truncate" title={data.type}>
          </p> */}
        </div>
        <NodeAction actions={nodeActions} />
      </div>

      <Tooltip>
        <TooltipTrigger>
          <div className="p-3">
            <div className="break-all multiline-truncate">{data.summary}</div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="right" className="w-50 break-all bg-[#272429]/60 backdrop-blur-sm">
          {data.summary} 
        </TooltipContent>
      </Tooltip>

      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-indigo-500 border-2 border-white"
      />

      <EndDialog
        open={showDialog}
        onClose={closeDialog}
        data={data}
        editContent={handleEdit}
      ></EndDialog>

      {data.comments && <div className="absolute -top-5 -right-5 text-yellow-300">
        <IconMessageCircleFilled />
      </div>}
    </div>
  );
}
