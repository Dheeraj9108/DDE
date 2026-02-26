import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { ICollaborator, IUser } from "../../interfaces/flow-interface";
import AddCollaborator from "./add-collaborator";
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemGroup,
    ItemTitle,
} from "@/components/ui/item";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon, Trash2Icon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

export default function ManageCollaborators({ open, onOpenChange }: any) {

    const [collaborators, setCollaborators] = useState<ICollaborator[]>([
        {
            id: "1",
            name: "Dheeraj",
            email: "dhe@gamil.com",
            isReviewer: true
        },
        {
            id: "2",
            name: "Jhon",
            email: "jhon@gamil.com",
            isReviewer: false
        },
    ]);

    const addUsers = (users: IUser[]) => {

        setCollaborators((prev) => {
            const newCollaborators: ICollaborator[] = users.map(user => (
                {
                    ...user,
                    name: user.username,
                    isReviewer: false
                }
            ));
            return [...newCollaborators, ...prev];
        })
    }

    const save = () => {
        console.log(collaborators);
    }

    const onCheckedChange=(id:string, checked:boolean)=>{
        setCollaborators((prev) => {
            const newList = prev.filter(user=>user.id!== id);
            let collaborator = prev.find(user=>user.id == id);
            if(collaborator){
                collaborator.isReviewer = checked;
                return [...newList, collaborator];
            }
            return [...newList]
        })
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="!w-3xl max-h-[85vh] overflow-auto">
                <DialogHeader>
                    <DialogTitle>Manage Collaborators</DialogTitle>
                </DialogHeader>
                <div className="flex">
                    <InputGroup>
                        <InputGroupInput placeholder="Search..." />
                        <InputGroupAddon>
                            <SearchIcon />
                        </InputGroupAddon>
                    </InputGroup>
                    <AddCollaborator addUsers={addUsers} />
                </div>
                <ItemGroup className="max-w-lg h-100 overflow-y-auto gap-2 ">
                    {collaborators.map((collaborator) => (
                        <Item key={collaborator?.id} variant="outline" className="flex">
                            <ItemContent className="gap-1">
                                <ItemTitle>{collaborator?.name}</ItemTitle>
                                <ItemDescription>{collaborator?.email}</ItemDescription>
                            </ItemContent>
                            <div className="flex-1 flex justify-end items-center gap-1">
                                <Checkbox checked={collaborator?.isReviewer} onCheckedChange={(value:boolean)=>onCheckedChange(collaborator?.id,value)} /> Reviewer
                            </div>
                            <ItemActions className="flex-1 justify-end">
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <Trash2Icon />
                                </Button>
                            </ItemActions>
                        </Item>
                    ))}
                </ItemGroup>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" onClick={save}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}