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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import * as CONST from "../constants";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";

export default function ReviewDialog({ open, onClose, flow, requestReview}: any) {

    const labelRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);
    const [reviewer, setReviewer] = useState<String>();

    const onSubmit = () => {
        const payload = {
            flowId:flow.id,
            title: labelRef.current?.value,
            description: contentRef.current?.value,
            reviewer
        };
        requestReview(payload);
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <form>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Request Review</DialogTitle>
                        <DialogDescription>
                            Fill out the fields below to request a review from a team member
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">{CONST.TITLE}</Label>
                            <Input
                                id="label"
                                name="label"
                                ref={labelRef}
                            // disabled={mode === CONST.MODE.VIEW}
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="username-1">{CONST.DESCRIPTION}</Label>
                            <Textarea
                                placeholder="Type your message here."
                                ref={contentRef}
                            // disabled={mode === CONST.MODE.VIEW}
                            />
                        </div>
                    </div>
                    <div className="grid gap-4">
                        <Label htmlFor="" className="col-span-12 md:col-span-2" >
                            Reviewer
                        </Label>
                        <Select
                            onValueChange={(value) => setReviewer(value)}
                        >
                            <SelectTrigger className="w-full col-span-12 md:col-span-2 pr-2">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="Dheeraj">Dheeraj</SelectItem>
                                    <SelectItem value="John">John</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">{CONST.CANCEL}</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button
                                type="submit"
                                onClick={onSubmit}
                            // disabled={mode === "VIEW"}
                            >
                                {CONST.SUBMIT}
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}