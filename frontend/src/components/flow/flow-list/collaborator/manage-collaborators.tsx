import { DataTable } from "@/components/shared/data-table/data-table";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { columns } from "./columns";
import { ICollaborator } from "../../interfaces/flow-interface";
import AddCollaborator from "./add-collaborator";

export default function ManageCollaborators({ open, onOpenChange }: any) {

    const users: ICollaborator[] = [
        {
            name: "Dheeraj",
            email: "dhe@gamil.com",
            isReviewer: true
        },
        {
            name: "Jhon",
            email: "jhon@gamil.com",
            isReviewer: false
        },
        {
            name: "Jhon",
            email: "jhon@gamil.com",
            isReviewer: false
        },
        {
            name: "Jhon",
            email: "jhon@gamil.com",
            isReviewer: false
        },
    ];

    const addUser = () => {

    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[725px] sm:max-h-[525px]">
                <DialogHeader>
                    <DialogTitle>Manage Collaborators</DialogTitle>
                </DialogHeader>
                <DataTable
                    columns={columns()}
                    data={users}
                    showCreate={false}
                    filterKey="name">
                    <AddCollaborator />
                </DataTable>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" >Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}