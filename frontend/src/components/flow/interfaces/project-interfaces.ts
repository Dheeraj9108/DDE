import { ICollaborator } from "./flow-interface";

export interface IProject {
    id:string;
    name:string;
    groupId:string;
    description:string;
    createdAt:string;
    collaborators:ICollaborator[]
}