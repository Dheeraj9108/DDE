import { DataTable } from "../../shared/data-table/data-table";
import { Header } from "../../shared/header";
import { useEffect, useState } from "react";
import { CRUDService } from "../services/crudService";
import { toast } from "sonner";
import { IFlowListItem } from "../interfaces/flow-interface";
import { useNavigate, useParams } from "react-router-dom";
import { IActionItem } from "../../shared/interfaces/interfaces";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { MdOutlineAssignmentInd } from "react-icons/md";
import { generateColumns } from "../../shared/columns";
import * as CONST from "../constants";
import ReviewDialog from "./review-dialog";
import { columns } from "./columns";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { RiTeamFill } from "react-icons/ri";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { PlusIcon } from "lucide-react";

export function Flow() {
  const [flows, setFlows] = useState<IFlowListItem[]>([]);
  const [showDialog, setShowDialog] = useState<boolean>();
  const { projectId } = useParams();
  const [flow, setFlow] = useState<IFlowListItem>();
  const navigate = useNavigate();

  useEffect(() => {
    fetchFlows();
  }, []);

  let breadcrumbItems: any = [];
  const setBreadcrumb = () => {
    breadcrumbItems = [
      {
        item: "Home",
        url: "/",
      },
      {
        item: "Projects",
        url: "/projects",
      },
      {
        item: "Flows",
        url: "/flows",
      },
    ];
  };

  const handleDelete = async (row: IFlowListItem) => {
    await CRUDService.deleteFlow(row.id);
    toast.success("Flow deleted Successfully");
    fetchFlows();
  };

  const handleEdit = (row: IFlowListItem) => {

  }

  const handleView = (row: IFlowListItem) => {
    navigate(`/projects/${projectId}/flows/${row.id}`);
  }

  const handleReview = (row: IFlowListItem) => {
    setShowDialog(true);
    setFlow(row);
  }

  const actions: IActionItem[] = [
    {
      label: "Edit",
      icon: <IconEdit />,
      onClick: handleEdit
    },
    {
      label: "View",
      icon: <IconEye />,
      onClick: handleView
    },
    {
      label: "Delete",
      icon: <IconTrash />,
      onClick: handleDelete
    },
    {
      label: "Request Review",
      icon: <MdOutlineAssignmentInd />,
      onClick: handleReview
    }
  ];

  setBreadcrumb();

  const createFlow = async (data: { name: string; description?: string }) => {
    const payload = {
      name: data.name,
      description: data.description,
      projectId
    }
    await CRUDService.createFlow(payload);
    toast.success("Flow created Successfully");
    fetchFlows();
  };

  const fetchFlows = async () => {
    const data: IFlowListItem[] = await CRUDService.getAllFlows(projectId!);
    setFlows(data);
  };

  const requestReview = async (payload: any) => {
    await CRUDService.requestReview(payload);
    toast.success("Review Requested");
    fetchFlows();
  }

  return (
    <>
      <Header breadcrumbs={breadcrumbItems} />
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-[70%_30%] border-b  py-5">
          <div className="space-y-2 ">
            <div className="text-2xl font-bold mb-1 ">Engine</div>
            <div className="text-sm text-gray-500 mb-2 pb-2 ">
              Diagnostic Engine Project for issue Identification
            </div>
            <div className="flex justify-between text-s text-gray-500">
              <div>
                Owner : Dheeraj
              </div>
              <div>
                Created At : 07-02-2026
              </div>
            </div>
            <div className="flex flex-col text-blue-400/75 space-y-2">
              <div className="flex">
                <RiTeamFill className="mt-1 mr-1"/> Collaborators
              </div>
              <div className="flex flex-wrap gap-1">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
                  <AvatarFallback>LR</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/evilrabbit.png"
                    alt="@evilrabbit"
                  />
                  <AvatarFallback>ER</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
          <div className="flex justify-end items-start">
            <Badge
              className="bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300"
            >
              In Progress
            </Badge>
          </div>
        </div>
        <div className="flex flex-1 flex-col">
          <div className="text-xl font-bold mb-1 text-gray-300 mt-4">Flows</div>
          <DataTable
            // columns={generateColumns(CONST.FLOW_LIST_COLUMNS, actions, getActionsForRow)}
            columns={columns(actions)}
            data={flows}
            showCreate={true}
            filterKey="name"
            onCreate={createFlow}
          />
        </div>
      </div>
      <ReviewDialog open={showDialog} flow={flow} onClose={() => setShowDialog(false)} requestReview={requestReview} />
    </>
  );
}
