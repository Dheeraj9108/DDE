import { IFlowPayLoad } from "../interfaces/flow-interface";

const BASE_URL: string = "http://localhost:8085/flows";

const HEADERS = { "Content-Type": "application/json" };

export const CRUDService = {
  getAllFlows: async (projectId: string) => {
    try {
      const res = await fetch(`${BASE_URL}?projectId=${projectId}`, {
        method: "GET",
        headers: HEADERS,
      });
      return await res.json();
    } catch (error) {
      throw error;
    }
  },

  createFlow: async (data: any) => {
    try {
      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch (error) {
      throw error;
    }
  },

  deleteFlow: async (id: string) => {
    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
        headers: HEADERS,
      });
      return await res.json();
    } catch (error) {}
  },

  updateFlow: async (data: IFlowPayLoad) => {
    try {
      const res = await fetch(`${BASE_URL}`, {
        method: "PATCH",
        headers: HEADERS,
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch (error) {
      throw error;
    }
  },

  getFlowById: async (id: string) => {
    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "GET",
        headers: HEADERS,
      });
      return await res.json();
    } catch (error) {
      throw error;
    }
  },

  startReview: async (id: string) => {
    try {
      const res = await fetch(`${BASE_URL}/${id}/startReview`,{
        headers:HEADERS,
        method:"POST"
      });
      return await res.json();
    } catch (error) {
      throw error;
    }
  },

  requestReview:async(payload:any)=>{
    try {
      const res = await fetch(`${BASE_URL}/requestReview`,{
        headers:HEADERS,
        method:"POST",
        body:JSON.stringify(payload)
      });
      return await res.json();
    } catch (error) {
      throw error;
    }
  }
};
