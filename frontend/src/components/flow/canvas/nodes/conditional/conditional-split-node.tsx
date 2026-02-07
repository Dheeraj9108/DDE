import { Handle, Position } from "@xyflow/react";
import { Eye, GitBranch, Pencil, Trash } from "lucide-react";
import { EditDialog } from "./edit-dialog";
import * as CONST from "../../../constants";
import { NodeAction } from "../utils/node-action";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { IconMessageCircleFilled } from "@tabler/icons-react";
import { INodeAction } from "@/components/flow/interfaces/flow-interface";

export function ConditionalSplitNode({ id, data }: any) {

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
            <div className="flex justify-start items-center gap-2">
              <GitBranch className="w-4 h-4 text-indigo-400" />
              <span className="font-medium">{data.label}</span>
            </div>
          </h4>
          <p className="text-xs text-muted-foreground truncate" title={data.type}>
            {/* {data.type} */}
          </p>
        </div>
        <NodeAction actions={nodeActions} />
      </div>

      <div className="p-3">
        <div className="break-all multiline-truncate">{data.content}</div>
      </div>

      <EditDialog
        open={showDialog}
        onClose={closeDialog}
        data={data}
        editContent={(nodeInfo: any) => handleEdit(nodeInfo)}
        mode={mode}
      ></EditDialog>

      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-indigo-500 border-2 border-white"
      />

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-green-500 border-2 border-white"
      />
      {data.comments && <div className="absolute -top-5 -right-5 text-yellow-300">
        <IconMessageCircleFilled />
      </div>}
    </div>
  );
}