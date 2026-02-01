import { IProjectListItem } from "../interfaces/project";

const BASE_URL: string = "http://localhost:8080/projects";

const HEADERS = { "Content-Type": "application/json" };

export const CRUDService = {

  getAllProjects: async () => {
    try {
      const res = await fetch(BASE_URL, {
        method: "GET",
        headers: HEADERS,
      });
      return await res.json();
    } catch (error) {
      throw error;
    }
  },

  createProject: async (project: IProjectListItem) => {
    try {
        const res = await fetch(BASE_URL,{
            method:"POST",
            headers:HEADERS,
            body:JSON.stringify(project)         
        });
        return await res.json();
    } catch (error) {

    }
  },

  deleteProject:async(id:string)=>{
    try {
        const res = await fetch(`${BASE_URL}/${id}`,{
            method:"DELETE",
            headers:HEADERS
        });
        return await res.json();
    } catch (error) {
    }
  }
};
