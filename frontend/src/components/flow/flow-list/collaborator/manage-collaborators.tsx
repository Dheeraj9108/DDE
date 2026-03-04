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
import { useEffect, useState } from "react";
import { apiService } from "../../services/crudService";

export default function ManageCollaborators({ open, onOpenChange, project }: any) {

    const [collaborators, setCollaborators] = useState<ICollaborator[]>(project?.collaborators ?? []);
    const [allUsers, setAllUsers] = useState<IUser[]>([]);
    const [collaboratorsSet, setCollaboratorsSet] = useState(new Set());

    useEffect(() => {
        if (!project) return;
        let newSet = new Set<String>(project?.collaborators.map((ele:ICollaborator)=>ele.userId));
        setCollaborators(project?.collaborators);
        setCollaboratorsSet(newSet);
        getAllUsersByGroupId(newSet);
    }, [project]);

    const getAllUsersByGroupId = async (collabSet:Set<String>) => {
        if (project) {
            try {
                let res: IUser[] = await apiService.getAllUsersByGroupId(project?.groupId);
                res = res.filter(user => !collabSet.has(user.id));
                setAllUsers(res);
            } catch (error) {
                console.log(error);
            }
        }
    }

    const addUsers = (users: IUser[]) => {
        setCollaborators((prev) => {
            const newCollaborators: ICollaborator[] = users?.map(user => (
                {
                    ...user,
                    userId: user.id,
                    name: user.username,
                    reviewer: false,
                    roles:["COLLABORATOR"]
                }
            ));
            return [...newCollaborators, ...prev];
        })
    }

    const save = () => {
        const payload = {
            projectId: project?.id,
	        groupId: project?.groupId,
	        collaborators
        }
        apiService.updateCollaborators(payload);
    }

    const onCheckedChange = (id: string, checked: boolean) => {
        setCollaborators((prev) => {
            let collaborator = prev.find(user => user.id == id);
            if (collaborator) {
                collaborator.reviewer = checked;
                collaborator.roles.push("REVIEWER");
            }
            return [...prev]
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
                    <AddCollaborator addUsers={addUsers} allUsers={allUsers} />
                </div>
                <ItemGroup className="max-w-lg h-100 overflow-y-auto gap-2 ">
                    {collaborators?.map((collaborator) => (
                        <Item key={collaborator?.id} variant="outline" className="flex">
                            <ItemContent className="gap-1">
                                <ItemTitle>{collaborator?.name}</ItemTitle>
                                <ItemDescription>{collaborator?.email}</ItemDescription>
                            </ItemContent>
                            <div className="flex-1 flex justify-end items-center gap-1">
                                <Checkbox checked={collaborator?.reviewer} onCheckedChange={(value: boolean) => onCheckedChange(collaborator?.id, value)} /> Reviewer
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