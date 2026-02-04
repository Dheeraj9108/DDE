import { DataTable } from "../shared/data-table/data-table";
import { Header } from "../shared/header";
import { useEffect, useState } from "react";
import { CRUDService } from "./services/crudService";
import { toast } from "sonner";
import { IFlowListItem } from "./interfaces/flow-interface";
import { useNavigate, useParams } from "react-router-dom";
import { IActionItem } from "../shared/interfaces/interfaces";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { MdOutlineAssignmentInd } from "react-icons/md";
import { generateColumns } from "../shared/columns";
import * as CONST from "./constants";
import ReviewDialog from "./review-dialog";

export function Flow() {
  const [flows, setFlows] = useState<IFlowListItem[]>([]);
  const { projectId } = useParams();
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
    console.log(row);
    await CRUDService.deleteFlow(row.id);
    toast.success("Flow deleted Successfully");
    fetchFlows();
  };

  const handleEdit = (row: IFlowListItem) => {

  }

  const handleView = (row: IFlowListItem) => {
    navigate(`/projects/${projectId}/flows/${row.id}`);
  }

  const handleReview = () => {
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
      label: "Review",
      icon: <MdOutlineAssignmentInd />,
      onClick: () => handleReview()
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

  return (
    <>
      <Header breadcrumbs={breadcrumbItems} />
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <DataTable
            columns={generateColumns(CONST.FLOW_LIST_COLUMNS, actions)}
            data={flows}
            showCreate={true}
            filterKey="name"
            onCreate={createFlow}
          />
        </div>
      </div>
      <ReviewDialog/>
    </>
  );
}
