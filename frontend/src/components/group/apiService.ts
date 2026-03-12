import api from "../util/api";

export const apiService = {
    getAllUsers:async()=>{
        const res = await api.get("/iam/groups");
        return res.data;
    },

    getUserDetails:async(groupId:string)=>{
        const response = await api.get(`/iam/users/me/${groupId}`);
        return response?.data;
    }
}