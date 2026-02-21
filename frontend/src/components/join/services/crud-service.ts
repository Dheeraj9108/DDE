import api from "@/components/util/api";
import { IGroup, IJoinGroup } from "../interfaces/interfaces";

const BSER_URL = "http://localhost:8083/groups/"

const HEADERS = { "Content-Type": "application/json" };

export const CRUDService = {

    createGroup:async(payload:IGroup)=>{
        const res = await fetch(BSER_URL,{
            headers:HEADERS,
            method:"POST",
            body: JSON.stringify(payload)
        });
        return await res.json();
    },

    joinGroup:async(payload:IJoinGroup)=>{
        const res = await api.post("/iam/groups/join",payload);
        return res.data;
    }
}