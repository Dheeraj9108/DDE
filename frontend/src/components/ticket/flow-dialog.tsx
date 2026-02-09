import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { TicketItem } from "./columns";

export default function FlowDialog() {
    const [projects, setProjects] = useState();

    useEffect(() => {
        // get projects
    }, []);

    const data: TicketItem[] = [
        {
            id: "728ed52f",
            status: "Pending",
            priority: "High",
            type: "Review",
            title: "Review: Test Diagnostic Flow",
            createdBy: "Dheeraj",
            lastModified: "Updated 2h ago By Dheeraj"
        },
    ];

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Select</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Project Panel</DialogTitle>

                </DialogHeader>
                <div className="no-scrollbar -mx-4 max-h-[50vh] overflow-y-auto px-4">

                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}