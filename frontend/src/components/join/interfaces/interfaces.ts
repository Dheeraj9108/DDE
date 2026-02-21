export interface IGroup{
    id:string,
    name:string,
    owner:IUser
}

export interface IUser{
    id:string
}

export interface IJoinGroup{
    code :string;
}