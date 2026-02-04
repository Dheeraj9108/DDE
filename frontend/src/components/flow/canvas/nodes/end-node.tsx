import { Handle, Position } from "@xyflow/react";
import { EndDialog } from "./end-dialog";
import { IEndNode } from "../../interfaces/flow-interface";
import { NodeAction } from "./node-action";
import { useState } from "react";
import * as CONST from "../../constants";

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

  }

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-0 w-[200px] h-[150px] text-white">
      <div className="flex justify-between p-3 border-b">
        <div className="flex flex-col w-0 flex-1">
          <h4 className="text-sm font-medium truncate" title={data.label}>
            {data.label}
          </h4>
          {/* <p className="text-xs text-muted-foreground truncate" title={data.type}>
          </p> */}
        </div>
        <NodeAction onEdit={onEdit} onView={onView} onDelete={onDelete} />
      </div>
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
    </div>
  );
}
