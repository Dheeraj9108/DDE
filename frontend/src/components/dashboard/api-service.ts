import api from "../util/api"

export const apiService = {
    getById:async(id:string)=>{
        const res = await api.get(`/iam/groups/${id}`);
        return res.data;    
    }
}