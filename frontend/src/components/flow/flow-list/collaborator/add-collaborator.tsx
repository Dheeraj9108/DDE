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
    ItemTitle,
} from "@/components/ui/item";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { IconPlus } from "@tabler/icons-react";
import { PlusIcon, SearchIcon, X } from "lucide-react";
import { useState } from "react";
import { IUser } from "../../interfaces/flow-interface";

export default function AddCollaborator({ addUsers }: any) {

    const [users, setUsers] = useState<IUser[]>([
        {
            id: "1",
            username: "shadcn",
            email: "shadcn@vercel.com",
        },
        {
            id: "2",
            username: "maxleiter",
            email: "maxleiter@vercel.com",
        },
        {
            id: "3",
            username: "evilrabbit",
            email: "evilrabbit@vercel.com",
        },
    ]);
    const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]);

    const selectUser = (user: IUser) => {
        setUsers((prev) => prev.filter(prevUser => prevUser.id !== user.id));
        setSelectedUsers((prev: any) => [...prev, user]);
    }

    const removeSelectedUser = () => {

    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="ml-2"><IconPlus />Add User</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px] sm:max-h-[625px]">
                <DialogHeader>
                    <DialogTitle>Add Collaborators</DialogTitle>
                </DialogHeader>
                <InputGroup>
                    <InputGroupInput placeholder="Search..." />
                    <InputGroupAddon>
                        <SearchIcon />
                    </InputGroupAddon>
                </InputGroup>

                <ItemGroup className="max-w-lg max-h-[50vh] overflow-y-auto gap-4">
                    {users.map((user, index) => (
                        <Item key={user?.id} variant="outline">
                            <ItemContent className="gap-1">
                                <ItemTitle>{user?.username}</ItemTitle>
                                <ItemDescription>{user?.email}</ItemDescription>
                            </ItemContent>
                            <ItemActions>
                                <Button variant="ghost" size="icon" className="rounded-full" onClick={() => selectUser(user)}>
                                    <PlusIcon />
                                </Button>
                            </ItemActions>
                        </Item>
                    ))}
                </ItemGroup>
                <div className="flex flex-wrap overflow-auto max-h-16">
                    <div>Selected Users :</div>
                    {
                        selectedUsers?.map((user: any, idx: number) => (
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
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button type="submit" onClick={() => addUsers(selectedUsers)}>Add</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}