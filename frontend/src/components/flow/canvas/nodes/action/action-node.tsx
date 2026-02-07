"use client";

import { Handle, Position } from "@xyflow/react";
import { ActionDialog } from "./action-dialog";
import * as CONST from "../../../constants";
import { IActionNodeProps, INodeAction } from "../../../interfaces/flow-interface";
import { NodeAction } from "../utils/node-action";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils";
import { IconMessageCircleFilled } from "@tabler/icons-react";
import { Eye, Pencil, Trash } from "lucide-react";

export function ActionNode({ id, data }: IActionNodeProps) {

  const [showDialog, setShowDialog] = useState<Boolean>(false);
  const [mode, setMode] = useState<String>(CONST.MODE.VIEW);

  const addResultNode = (arr: any[]) => {
    data.onAddOutput(arr);
  };

  const handleEdit = (nodeInfo: any) => {
    switch (nodeInfo.actionType) {
      case CONST.ACTION_TYPE.BOOLEAN:
        addResultNode([{ label: "True" }, { label: "False" }]);
        break;
      case CONST.ACTION_TYPE.OPTION:
        addResultNode(nodeInfo.options);
        break;
      case CONST.ACTION_TYPE.RANGE:
        addResultNode(nodeInfo.ranges);
        break;
      default:
        break;
    }
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
      <div className="flex justify-between p-2 border-b">
        <div className="flex flex-col w-0 flex-1">
          <h4 className="text-sm font-medium truncate" title={data.label}>
            <div className="flex items-center gap-2 ">
              <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-sm" />
              </div>
              <div>
                <div className="text-white font-medium text-sm">{data.label}</div>
                <div className="text-gray-400 text-xs">{CONST.ACTION}</div>
              </div>
            </div>
          </h4>
          {/* <p className="text-xs text-muted-foreground truncate" title={data.type}>
            {data.type}
          </p> */}
        </div>
        <NodeAction actions={nodeActions} />
      </div>

      <Tooltip>
        <TooltipTrigger>
          <div className="p-3">
            <div className="break-all multiline-truncate">{data.content}</div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="right" className="w-50 break-all bg-[#272429]/60 backdrop-blur-sm">
          {data.content} 
        </TooltipContent>
      </Tooltip>

      <ActionDialog
        open={showDialog}
        onClose={closeDialog}
        mode={mode}
        data={data}
        editContent={(nodeInfo: any) => handleEdit(nodeInfo)}
      ></ActionDialog>

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-orange-500"
      />

      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-blue-500"
      />
      {data.comments && <div className="absolute -top-5 -right-5 text-yellow-300">
        <IconMessageCircleFilled />
      </div>}
    </div>
  );
}
