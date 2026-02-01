import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRef } from "react";
import * as CONST from "../../constants";
import { EvidencePopover } from "./evidence-dialog";

export function EditDialog({ mode, icon, data, editContent }: any) {
  const labelRef = useRef(data?.label);
  const contentRef = useRef(data?.prompt);

  const handleSave = () => {
    data.label = labelRef.current.value;
    data.prompt = contentRef.current.value;
    // const nodeInfo = {
    //   label: labelRef.current.value,
    //   evidence
    // };
    editContent(data);
  };

  const setEvidences = (idx: number, value: string[]) => {
    // setEvidence((prev:any)=> {
    //   prev[key] = value
    //   return prev;
    // });
    data.options[idx].evidence = value;
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger
          asChild
          className="w-full bg-yellow-600 hover:bg-yellow-700 text-white text-sm"
        >
          <Button variant="outline">{icon}</Button>
        </DialogTrigger>
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
              <Label htmlFor="username-1">{CONST.PROMPT}</Label>
              <Textarea
                placeholder="Type your message here."
                defaultValue={data?.prompt}
                ref={contentRef}
                disabled={mode === CONST.MODE.VIEW}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">{"Evidence"}</Label>
              <div className="flex">
                <div className="flex">
                  <Label htmlFor="username-1" className="">
                    Yes
                  </Label>
                  <EvidencePopover
                    evidences={data?.options?.[0].evidence}
                    onInput={(val: string[]) => setEvidences(0, val)}
                  />
                </div>
                <div className="px-5 flex">
                  <Label htmlFor="username-1" className="">
                    No
                  </Label>
                  <EvidencePopover
                    evidences={data?.options?.[1].evidence}
                    onInput={(val: string[]) => setEvidences(1, val)}
                  />
                </div>
              </div>
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
