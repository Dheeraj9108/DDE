import { Handle, Position } from "@xyflow/react";
import { EndDialog } from "./end-dialog";
import { IconEdit } from "@tabler/icons-react";
import { IEndNode } from "../../interfaces/flow-interface";

export function EndNode({ id, data }: IEndNode) {
  const handleEdit = (nodeInfo: any) => {
    data.onEdit(id, nodeInfo);
  };
  return (
    <div className="px-6 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white font-medium w-[200px] text-center">
      {data.label}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-indigo-500 border-2 border-white"
      />
      <div className="flex items-end justify-between mb-2">
        <EndDialog
          icon={<IconEdit></IconEdit>}
          data={data}
          editContent={handleEdit}
        ></EndDialog>
      </div>
    </div>
  );
}
