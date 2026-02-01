import { Handle, Position } from "@xyflow/react"

interface StartNodeProps {
  data: {
    label: string
  }
}

export function StartNode({ data }: StartNodeProps) {
  return (
    <div className="px-6 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white font-medium w-[200px] text-center">
      {/* {"P0300_Diagjbsfn aksjfnm"} */}
      {data.label}

      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-indigo-500 border-2 border-white" />
    </div>
  )
}
