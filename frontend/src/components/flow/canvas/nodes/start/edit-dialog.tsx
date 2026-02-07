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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRef } from "react";
import * as CONST from "../../../constants";

export function EditDialog({ open, onClose, mode, data, editContent }: any) {
    const labelRef = useRef(data?.label);
    const contentRef = useRef(data?.content);

    const handleSave = () => {
        data.label = labelRef.current.value;
        data.content = contentRef.current.value;
        editContent(data);
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <form>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{CONST.EDIT_NODE}</DialogTitle>
                        <DialogDescription>
                            {CONST.EDIT_DIALOG_DESCRIPTION}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">{CONST.LABEL}</Label>
                            <Input
                                id="label"
                                name="label"
                                defaultValue={data?.label}
                                ref={labelRef}
                                disabled={mode === CONST.MODE.VIEW}
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="username-1">{CONST.DESCRIPTION}</Label>
                            <Textarea
                                placeholder="Type your message here."
                                defaultValue={data?.content}
                                ref={contentRef}
                                disabled={mode === CONST.MODE.VIEW}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">{CONST.CANCEL}</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button
                                type="submit"
                                onClick={handleSave}
                                disabled={mode === "VIEW"}
                            >
                                {CONST.SAVE_CHANGES}
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}
