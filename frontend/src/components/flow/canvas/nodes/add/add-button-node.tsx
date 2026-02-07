"use client";

import { Handle, Position, useReactFlow } from "@xyflow/react";
import { NodeSelector } from "../utils/node-selector";

interface AddButtonNodeProps {
  id: string;
  data: {
    onAdd?: (id: string, nodeType: "conditional" | "action" | "end") => void;
  };
}

export function AddButtonNode({ id, data }: AddButtonNodeProps) {
  const { getNode } = useReactFlow();

  const handleNodeSelect = (nodeType: "conditional" | "action" | "end") => {
    const node = getNode(id);
    if (node && data.onAdd) {
      data.onAdd(id, nodeType);
    }
  };

  return (
    <>
      <div className="bg-transparent rounded-lg w-[200px] text-white">
        <div className="flex items-start justify-center">
          <NodeSelector onSelect={handleNodeSelect} />
          <Handle
            type="target"
            position={Position.Top}
            className="w-3 h-3 bg-indigo-500 border-2 border-white opacity-0"
          />
        </div>
      </div>
    </>
  );
}
