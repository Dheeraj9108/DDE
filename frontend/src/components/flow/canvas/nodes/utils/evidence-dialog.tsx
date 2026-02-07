import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BulletInput } from "./bullet-input";
import { LuLightbulb } from "react-icons/lu";

export function EvidencePopover({evidences,onInput}:{evidences:string[],onInput:(points:string[])=>void}) {
  return (
    <>
      <Popover >
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" title="Add Evidence">
            <LuLightbulb />
          </Button>
        </PopoverTrigger>
        <PopoverContent side="top">
          <BulletInput list={evidences} onInput={onInput} />
        </PopoverContent>
      </Popover>
    </>
  );
}
