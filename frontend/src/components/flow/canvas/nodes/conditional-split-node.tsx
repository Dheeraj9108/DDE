import { Handle, Position } from "@xyflow/react";
import { GitBranch } from "lucide-react";
import { EditDialog } from "./edit-dialog";
import { DeleteAlertDialog } from "./delete-alert-dialog";
import { IconEdit, IconEye } from "@tabler/icons-react";
import * as CONST from "../../constants";
import { IConditionalSplitNodeProps } from "../../interfaces/flow-interface";

export function ConditionalSplitNode({ id, data }: IConditionalSplitNodeProps) {
  const handleEdit = (nodeInfo: any) => {
    data.onEdit(id, nodeInfo);
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 w-[200px] text-white">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-indigo-400" />
          <span className="font-medium">{data.label}</span>
        </div>
        <DeleteAlertDialog></DeleteAlertDialog>
      </div>

      <div className="">{data.prompt}</div>
      <div className="flex items-end justify-between mb-2">
        <EditDialog
          icon={<IconEdit></IconEdit>}
          data={data}
          editContent={(nodeInfo: any) => handleEdit(nodeInfo)}
          mode={CONST.MODE.EDIT}
        ></EditDialog>
        <EditDialog
          icon={<IconEye></IconEye>}
          data={data}
          editContent={(nodeInfo: any) => handleEdit(nodeInfo)}
          mode={CONST.MODE.VIEW}
        ></EditDialog>
      </div>

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
    </div>
  );
}

// '{"label":"Add Button"}'::jsonb