import { columns } from "./columns";
import { DataTable } from "../shared/data-table/data-table";
import { Header } from "../shared/header";
import { useEffect, useState } from "react";
import { CRUDService } from "./services/crudService";
import { toast } from "sonner";
import { IFlowListItem } from "./interfaces/flow-interface";
import { useParams } from "react-router-dom";

export function Flow() {
  const [flows, setFlows] = useState<IFlowListItem[]>([]);
  const { projectId } = useParams();
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
  setBreadcrumb();

  const createFlow = async (data: { name: string; description?: string }) => {
    const payload = {
      name:data.name,
      description:data.description,
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

  const handleDelete = async (id: string) => {
    await CRUDService.deleteFlow(id);
    toast.success("Flow deleted Successfully");
    fetchFlows();
  };

  return (
    <>
      <Header breadcrumbs={breadcrumbItems} />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <DataTable
          columns={columns(projectId!, handleDelete)}
          data={flows}
          showCreate={true}
          filterKey="name"
          onCreate={createFlow}
        />
      </div>
    </>
  );
}
