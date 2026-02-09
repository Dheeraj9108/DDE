export interface ITicket{
    id:string;
	type:string;
	status:string;
	priority:string;
	title:string;
	description:string;
	createdBy:IUser;
	assignedTo:IUser;
    details:ITicketDetail;
	comments:IComment[];
}

export interface IUser{
    id:string,
    name:string
}

export interface IComment{
    id:string;
    comment:string;
}

export interface ITicketDetail{

}

export interface ITicketDialog{
    open:boolean;
    onOpenChange:()=>void,
    ticket?:ITicket
}