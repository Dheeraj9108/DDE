import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemGroup,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item";
import { IconPlus } from "@tabler/icons-react";
import { PlusIcon, X } from "lucide-react";
import { useState } from "react";
import { IUser } from "../../interfaces/flow-interface";

export default function AddCollaborator({ open, onOpenChange }: any) {

    const people:IUser[] = [
        {
            username: "shadcn",
            email: "shadcn@vercel.com",
        },
        {
            username: "maxleiter",
            email: "maxleiter@vercel.com",
        },
        {
            username: "evilrabbit",
            email: "evilrabbit@vercel.com",
        },
    ];

    const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]);

    const addUser = (user: any) => {
        setSelectedUsers((prev: any) => [...prev, user]);
    }

    const removeSelectedUser = () => {

    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button className="ml-2"><IconPlus />Add User</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] sm:max-h-[525px]">
                <DialogHeader>
                    <DialogTitle>Add Collaborators</DialogTitle>
                </DialogHeader>
                <div className="flex flex-wrap">
                    <div>Selected Users :</div>
                    {
                        selectedUsers?.map((user:any,idx:number) => (
                            <Badge key={idx} variant="secondary" className="flex items-center gap-1">
                                {user.username}
                                <button
                                    type="button"
                                    className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    onClick={() => removeSelectedUser}
                                >
                                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                                </button>
                            </Badge>
                        ))
                    }
                </div>
                <ItemGroup className="max-w-sm gap-4">
                    {people.map((person, index) => (
                        <Item key={person.username} variant="outline">
                            <ItemContent className="gap-1">
                                <ItemTitle>{person.username}</ItemTitle>
                                <ItemDescription>{person.email}</ItemDescription>
                            </ItemContent>
                            <ItemActions>
                                <Button variant="ghost" size="icon" className="rounded-full" onClick={() => addUser(person)}>
                                    <PlusIcon />
                                </Button>
                            </ItemActions>
                        </Item>
                    ))}
                </ItemGroup>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" >Add</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}