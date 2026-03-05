import api from "@/components/util/api";
import { IGroup, IJoinGroup } from "../interfaces/interfaces";

export const apiService = {

    createGroup:async(payload:IGroup)=>{
        const res = await api.post("/iam/groups/",payload);
        return res.data;
    },

    joinGroup:async(payload:IJoinGroup)=>{
        const res = await api.post("/iam/groups/join",payload);
        return res.data;
    }
}