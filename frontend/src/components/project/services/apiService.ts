import api from "@/components/util/api";
import { IProjectListItem } from "../interfaces/project";

const BASE_URL: string = "/api/workflow/projects";

export const apiService = {

  getAllProjects: async (groupId:string) => {
    const res = await api.get(`${BASE_URL}/${groupId}`);
    return res.data;
  },

  createProject: async (project: IProjectListItem) => {
    const res = await api.post(BASE_URL,project);
    return res.data;
  },

  deleteProject:async(id:string)=>{
    const res = await api.delete(`${BASE_URL}/${id}`);
    return res.data;
  }
};
