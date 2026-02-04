import { IconMessageCircleFilled } from "@tabler/icons-react"
import { Handle, Position } from "@xyflow/react"


interface StartNodeProps {
  data: {
    label: string
  }
}

export function StartNode({ data }: any) {
  return (
    <div className="p-0 bg-gray-800 border border-gray-700 rounded-lg text-white font-medium w-[200px] h-[150px] text-center relative border-yellow-400">
      <div className="flex justify-between p-3 border-b">
        <div className="flex flex-col w-0 flex-1">
          <h4 className="text-sm font-medium truncate" title={data.label}>
            {data.label}
          </h4>
          <p className="text-xs text-muted-foreground truncate" title={data.type}>
          </p>
        </div>
      </div>
      <div className="p-3">
        <div className="break-all multiline-truncate">{data.description}</div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-indigo-500 border-2 border-white" />
      <div className="absolute -top-5 -right-5 text-yellow-300">
        <IconMessageCircleFilled />
      </div>
    </div>
  )
}

// <div
    //   className={cn(
    //     "h-36 w-[200px] rounded-lg border bg-[#272429]/60 backdrop-blur-sm text-white font-medium flex flex-col p-0",
    //     "ring-2 ring-primary",
    //     hasReviews && "border-yellow-400"
    //   )}
    // >
    //   <div className="flex justify-between p-3 border-b">
    //     <div className="flex flex-col w-0 flex-1">
    //       <h4 className="text-sm font-medium truncate" title={data.label}>
    //         {data.label} aaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    //       </h4>
    //       <p className="text-xs text-muted-foreground truncate" title={data.type}>
    //         {data.type}
    //       </p>
    //     </div>

    //     <MoreVertical className="h-4 w-4 text-muted-foreground" />
    //   </div>

    //   <div
    //     className="p-3 text-xs flex-1 overflow-hidden"
    //     style={{
    //       display: "-webkit-box",
    //       WebkitLineClamp: 4,  // Adjust this number depending on how many lines fit
    //       WebkitBoxOrient: "vertical",
    //     }}
    //     title={data.summary}
    //   >
    //     {data.summary} aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    //   </div>
    // </div>

    {/* <div className="flex justify-end gap-1 p-2 border-t">
    <Button variant="ghost" size="icon">
      <Eye className="h-4 w-4" />
    </Button>
    <Button variant="ghost" size="icon">
      <Pencil className="h-4 w-4" />
    </Button>
  </div> */}