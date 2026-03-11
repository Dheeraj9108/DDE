import api from "../util/api"
import { IUser } from "./interface";

export const apiService = {
    getAllUserByGroupId:async(groupId:string)=>{
        const res = await api.get(`/iam/groups/getAllUsers/${groupId}`);
        return res.data;
    },

    updateRolesAndPermission:async(users:IUser[], groupId:string)=>{
        const res = await api.post(`/iam/groups/${groupId}/roles-permissions`,users);
        return res.data;
    }
}