import { Header } from "../shared/header";
import { DataTable } from "../shared/data-table/data-table";
import { columns } from "./columns";
import { useEffect, useState } from "react";
import { IProjectListItem } from "./interfaces/project";
import { CRUDService } from "./services/crudService";
import { toast } from "sonner";
import * as CONST from "./constants";
import * as URL_CONST from "../shared/constants/urlConstants";

export function Projects() {
  const [projects, setProjects] = useState<IProjectListItem[]>([]);
  let breadcrumbItems: any = [];

  useEffect(() => {
    fetchProjects();
    setBreadcrumb();
  }, []);

  const setBreadcrumb = () => {
    breadcrumbItems = [
      {
        item: CONST.HOME,
        url: URL_CONST.HOME,
      },
      {
        item: CONST.PROJECTS,
        url: URL_CONST.PROJECTS,
      },
    ];
  };

  const fetchProjects = async () => {
    try {
      const res = await CRUDService.getAllProjects();
      setProjects(res);
    } catch (error) {}
  };

  const createProject = async (data: IProjectListItem) => {
    await CRUDService.createProject(data);
    toast.success(CONST.CREATE_SUCCESS);
    fetchProjects();
  };

  const handleDelete = async (id: string) => {
    await CRUDService.deleteProject(id);
    toast.success(CONST.DELETE_SUCCESS);
    fetchProjects();
  };

  return (
    <>
      <Header breadcrumbs={breadcrumbItems} />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <DataTable
          columns={columns(handleDelete)}
          data={projects}
          showCreate={true}
          filterKey="name"
          onCreate={createProject}
        />
      </div>
    </>
  );
}
