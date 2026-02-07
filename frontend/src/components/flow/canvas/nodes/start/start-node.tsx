import { cn } from "@/lib/utils"
import { IconMessageCircleFilled } from "@tabler/icons-react"
import { Handle, Position } from "@xyflow/react"
import * as CONST from "../../../constants";
import { useState } from "react";
import { NodeAction } from "../utils/node-action";
import { EditDialog } from "./edit-dialog";
import { Eye, Pencil } from "lucide-react";
import { INodeAction } from "@/components/flow/interfaces/flow-interface";

// interface StartNodeProps {
//   data: {
//     label: string
//   }
// }

export function StartNode({ id, data }: any) {

  const [showDialog, setShowDialog] = useState<boolean>(false);
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

  const nodeActions:INodeAction[] = [
    {
      label: "Edit",
      icon: <Pencil />,
      onClick: onEdit
    },
    {
      label: "View",
      icon: <Eye />,
      onClick: onView
    }
  ];

  return (
    <div className={cn("p-0 bg-gray-800 border border-gray-700 rounded-lg text-white font-medium w-[200px] h-[150px] text-center",
      data.comments && "relative border-yellow-400"
    )}>
      <div className="flex justify-between p-3 border-b">
        <div className="flex flex-col w-0 flex-1">
          <h4 className="text-sm font-medium truncate" title={data.label}>
            {data.label}
          </h4>
          <p className="text-xs text-muted-foreground truncate" title={data.type}>
          </p>
        </div>
        <NodeAction actions={nodeActions}/>
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
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-indigo-500 border-2 border-white" />
      {data.comments && <div className="absolute -top-5 -right-5 text-yellow-300">
        <IconMessageCircleFilled />
      </div>}
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