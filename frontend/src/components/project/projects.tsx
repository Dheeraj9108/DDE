import { Header } from "../shared/header";
import { DataTable } from "../shared/data-table/data-table";
import { useEffect, useState } from "react";
import { IProjectListItem } from "./interfaces/project";
import { CRUDService } from "./services/crudService";
import { toast } from "sonner";
import * as CONST from "./constants";
import * as URL_CONST from "../shared/constants/urlConstants";
import { generateColumns } from "../shared/columns";
import { IActionItem } from "../shared/interfaces/interfaces";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export function Projects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<IProjectListItem[]>([]);
  let breadcrumbItems: any = [];

  useEffect(() => {
    fetchProjects();
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
  setBreadcrumb();

  const fetchProjects = async () => {
    try {
      const res = await CRUDService.getAllProjects();
      setProjects(res);
    } catch (error) { }
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

  const handleView = (row: IProjectListItem) => {
    navigate(`/projects/${row.id}/flows`);
  }

  const actions: IActionItem[] = [
    {
      label: "Edit",
      icon: <IconEdit />,
      onClick: () => { }
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
    }
  ];

  return (
    <>
      <Header breadcrumbs={breadcrumbItems} />
      <div className="container mx-auto max-w-6xl p-2 mt-2">
        <div className="text-2xl font-bold mb-1 ">Projects</div>
        <DataTable
          columns={generateColumns(CONST.PROJECT_LIST_COLUMNS, actions)}
          data={projects}
          showCreate={true}
          filterKey="name"
          onCreate={createProject}
        />
      </div>
    </>
  );
}
