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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import * as CONST from "../../constants";
import { IOption, IRange } from "../../interfaces/flow-interface";
import { EvidencePopover } from "./evidence-dialog";

export function ActionDialog({open, onClose, mode, data, editContent }: any) {
  const labelRef = useRef(data.label);
  const contentRef = useRef(data.prompt);
  const [actionType, setActionType] = useState(data.actionType);
  const [options, setOptions] = useState<IOption[]>(data.options || []);
  const [ranges, setRanges] = useState<IRange[]>(
    data.ranges ?? [
      {
        label: "if",
        rop1: "",
        rop1Value: "",
        lop: "",
        rop2: "",
        rop2Value: "",
      },
    ],
  );

  const handleSave = () => {
    const label = labelRef.current.value;
    const updatedRangeList = ranges?.map((range) => ({
      ...range,
      label: `${range.label} ( ${label} ${range.rop1} ${range.rop1Value} ${range.lop} ${label} ${range.rop2} ${range.rop2Value} )`,
    }));
    data.label = label;
    data.prompt = contentRef.current.value;
    data.actionType = actionType;
    data.options = options;
    data.ranges = updatedRangeList;
    editContent(data);
  };

  const onDropdownValueChage = (value: string) => {
    setActionType(value);
  };

  const addInputField = () => {
    setOptions([...options, {} as IOption]);
  };

  const updateOptions = (idx: number, value: string) => {
    setOptions((prev) => {
      prev[idx].label = value;
      prev[idx].value = value;
      return [...prev];
    });
  };

  const addRange = () => {
    setRanges([
      ...ranges,
      {
        label: "else if",
        rop1: "",
        rop1Value: "",
        lop: "",
        rop2: "",
        rop2Value: "",
      },
    ]);
  };

  const updateRange = (idx: number, field: string, value: string | number) => {
    setRanges((prev) =>
      prev.map((range, i) =>
        i === idx ? { ...range, [field]: value } : range,
      ),
    );
  };

  const deleteRange = (idx: number) => {
    setRanges((prev) => prev.filter((_, i) => i !== idx));
  };

  const updateEvidence = (idx: number, value: string[], type: string) => {
    if (type === CONST.ACTION_TYPE.OPTION) {
      setOptions((prev) => {
        prev[idx].evidence = value;
        return [...prev];
      });
    } else if (type === CONST.ACTION_TYPE.RANGE) {
      setRanges((prev) => {
        prev[idx].evidence = value;
        return [...prev];
      });
    }
  };

  const renderDynamicContent = () => {
    switch (actionType) {
      case CONST.ACTION_TYPE.RANGE:
        return (
          <>
            <Button variant="outline" onClick={addRange}>
              {CONST.ADD} <Plus className="w-3 h-3 text-white" />
            </Button>
            {ranges.map((range, idx) => (
              <div className="grid grid-cols-12">
                <div className="grid col-span-12 md:col-span-11 gap-3">
                  <div className="grid grid-cols-12">
                    <Label htmlFor="" className="col-span-12 md:col-span-2">
                      {range.label}
                    </Label>
                    <Select
                      onValueChange={(value) => updateRange(idx, "rop1", value)}
                      value={range.rop1}
                    >
                      <SelectTrigger className="w-full col-span-12 md:col-span-2 pr-2">
                        <SelectValue placeholder="ROP" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="<">{"<"}</SelectItem>
                          <SelectItem value="<=">{"<="}</SelectItem>
                          <SelectItem value=">">{">"}</SelectItem>
                          <SelectItem value=">=">{">="}</SelectItem>
                          <SelectItem value="==">{"=="}</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <Input
                      className="col-spn-12 md:col-span-2"
                      type="number"
                      defaultValue={range.rop1Value}
                      onChange={(e) =>
                        updateRange(idx, "rop1Value", e.target.value)
                      }
                    />
                    <Select
                      onValueChange={(value) => updateRange(idx, "lop", value)}
                      value={range.lop}
                    >
                      <SelectTrigger className="w-full col-span-12 md:col-span-2">
                        <SelectValue placeholder="LOP" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {CONST.LOP_DROPDOWN_OPTIONS.map((lop) => (
                            <SelectItem value={lop.value}>
                              {lop.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <Select
                      onValueChange={(value) => updateRange(idx, "rop2", value)}
                      value={range.rop2}
                    >
                      <SelectTrigger className="w-full col-span-12 md:col-span-2">
                        <SelectValue placeholder="ROP" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {CONST.ROP_DROPDOWN_OPTIONS.map((rop) => (
                            <SelectItem value={rop.value}>
                              {rop.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <Input
                      className="col-spn-12 md:col-span-2"
                      type="number"
                      defaultValue={range.rop2Value}
                      onChange={(e) =>
                        updateRange(idx, "rop2Value", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="col-span-12 md:col-span-1 flex justify-end">
                  <Trash2
                    className="h-full text-white"
                    onClick={() => deleteRange(idx)}
                  />
                  <EvidencePopover
                    evidences={range?.evidence || []}
                    onInput={(val: string[]) =>
                      updateEvidence(idx, val, CONST.ACTION_TYPE.RANGE)
                    }
                  />
                </div>
              </div>
            ))}
          </>
        );
      case CONST.ACTION_TYPE.OPTION:
        return (
          <>
            <Button variant="outline" onClick={addInputField}>
              {CONST.ADD} <Plus className="w-3 h-3 text-white" />
            </Button>

            {options.map((option, idx) => (
              <div className="grid grid-cols-12">
                <Input
                  key={idx}
                  placeholder="Option..."
                  className="col-span-12 md:col-span-11"
                  value={option.value}
                  onChange={(e) => updateOptions(idx, e.target.value)}
                />
                <div className="col-span-12 md:col-span-1 flex justify-end">
                  <Trash2 className="h-full text-white" />
                  <EvidencePopover
                    evidences={option?.evidence || []}
                    onInput={(val: string[]) =>
                      updateEvidence(idx, val, CONST.ACTION_TYPE.OPTION)
                    }
                  />
                </div>
              </div>
            ))}
          </>
        );
      default:
        break;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <form>
        {/* <DialogTrigger asChild className="w-full text-white text-sm">
          <div className="bg-orange-600 text-white text-xs px-3 py-1 rounded text-center">
            {CONST.SETUP_ACTION}
          </div>
        </DialogTrigger> */}
        <DialogContent className="sm:max-w-[900px]">
          <div className="max-h-[70vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{CONST.ADD_ACTIONS}</DialogTitle>
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
                  defaultValue={data.label}
                  ref={labelRef}
                  disabled={mode === CONST.MODE.VIEW}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username-1">{CONST.PROMPT}</Label>
                <Textarea
                  placeholder="Type your message here."
                  defaultValue={data.prompt}
                  ref={contentRef}
                  disabled={mode === CONST.MODE.VIEW}
                />
              </div>
              <div className="grid gap-3">
                <Select onValueChange={onDropdownValueChage} value={actionType}>
                  <SelectTrigger
                    className="w-full"
                    disabled={mode === CONST.MODE.VIEW}
                  >
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {CONST.ACTION_TYPE_DROPDOWN_OPTIONS.map((type, idx) => (
                        <SelectItem key={idx} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-3">{renderDynamicContent()}</div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">{CONST.CANCEL}</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit" onClick={handleSave}>
                {CONST.SAVE_CHANGES}
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

// [
//     { label: "if", rop1: "", rop1Value: "", lop: "", rop2: "", rop2Value: "" },
//     {
//       label: "else if",
//       rop1: "",
//       rop1Value: "",
//       lop: "",
//       rop2: "",
//       rop2Value: "",
//     },
//   ]
