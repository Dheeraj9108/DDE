export interface IGroup{
    id:string;
    name:string;
    inviteCode:string;
    owner:IMembers;
    members:IMembers[];
    createdAt:string;
}

export interface IMembers{
    username:string;
}