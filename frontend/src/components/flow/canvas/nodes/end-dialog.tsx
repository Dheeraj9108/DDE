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
import * as CONST from "../../constants";
import Confidence from "./slider";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BulletInput } from "./bullet-input";

export function EndDialog({ icon, data, editContent }: any) {
  return (
    <Dialog>
      <form>
        <DialogTrigger
          asChild
          className="w-full bg-yellow-600 hover:bg-yellow-700 text-white text-sm"
        >
          <Button variant="outline">{icon}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>{CONST.EDIT_NODE}</DialogTitle>
            <DialogDescription>
              {CONST.EDIT_DIALOG_DESCRIPTION}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Issue</Label>
              <Input
                id="label"
                name="label"
                defaultValue={data?.label}
                onChange={(e) => {
                  data.label = e.target.value;
                  data.issue = e.target.value;
                }}
                // disabled={mode === CONST.MODE.VIEW}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Summary</Label>
              <Textarea
                placeholder="Type description here."
                defaultValue={data?.summary}
                onChange={(e) => {
                  data.summary = e.target.value;
                }}
                // disabled={mode === CONST.MODE.VIEW}
              />
            </div>
            <div className="">
              <Label htmlFor="username-1">Status</Label>
              <Select
                onValueChange={(val) => (data.status = val)}
                value={data?.status}
              >
                <SelectTrigger className="w-full mt-3">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="In Convenienet">
                      In Convenienet
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid ">
            <Confidence
              confidence={data?.confidence}
              onConfidenceChange={(confidence) =>
                (data.confidence = confidence)
              }
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="username-1">Recommended Next Steps</Label>
            <BulletInput
              list={data?.recommendedSteps}
              onInput={(steps: string[]) => (data.recommendedSteps = steps)}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">{CONST.CANCEL}</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type="submit"
                onClick={() => editContent(data)}
                //   disabled={mode === "VIEW"}
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
