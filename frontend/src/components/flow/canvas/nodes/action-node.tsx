"use client";

import { Handle, Position } from "@xyflow/react";
import { ActionDialog } from "./action-dialog";
import * as CONST from "../../constants";
import { IActionNodeProps } from "../../interfaces/flow-interface";

export function ActionNode({ id, data }: IActionNodeProps) {

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

  return (
    <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 min-w-[200px] shadow-lg">
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-blue-500"
      />

      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
          <div className="w-3 h-3 bg-white rounded-sm" />
        </div>
        <div>
          <div className="text-white font-medium text-sm">{data.label}</div>
          <div className="text-gray-400 text-xs">{CONST.ACTION}</div>
        </div>
      </div>

      <ActionDialog
        mode={CONST.MODE.EDIT}
        data={data}
        editContent={(nodeInfo: any) => handleEdit(nodeInfo)}
      ></ActionDialog>

      <div className="flex justify-center mt-4 gap-4">
        <Handle
          type="source"
          position={Position.Bottom}
          className="w-3 h-3 bg-orange-500"
        />
      </div>
    </div>
  );
}
