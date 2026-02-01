import { Handle, Position } from "@xyflow/react"

interface ResultNodeProps {
  data: {
    label: string
  }
}

export function ResultNode({ data }: ResultNodeProps) {
  return (
    <div className="p-3 bg-gray-800 border border-gray-700 rounded-lg text-white font-medium w-[200px] text-center">
      {data.label}
      <Handle
          type="target"
          position={Position.Top}
          className="w-3 h-3 bg-indigo-500 border-2 border-white"
        />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-indigo-500 border-2 border-white" />
    </div>
  )
}
