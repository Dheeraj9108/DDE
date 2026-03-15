import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { IconSparkles } from "@tabler/icons-react"
import { Check, CheckCheck, CheckIcon } from "lucide-react"
import { FaCheck, FaCheckDouble, FaExclamation } from "react-icons/fa"
import { LuCheck, LuLightbulb } from "react-icons/lu"
import { MdCheck, MdWarningAmber } from "react-icons/md"
import { RiCheckDoubleFill, RiCheckDoubleLine } from "react-icons/ri"
import { TiWarning, TiWarningOutline } from "react-icons/ti"

export function AIAnalysisReport({ open, onOpenChange, report }: any) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange} >
      <SheetContent className="bg-black">
        <SheetHeader>
          <SheetTitle>
            <span className="inline-flex gap-1 hover:text-primary cursor-pointer">
                <IconSparkles /> AI Flow Review Report
            </span>
          </SheetTitle>
          {/* <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription> */}
        </SheetHeader>
        <div className="grid flex-1 gap-3 px-4 no-scrollbar overflow-y-auto font-medium">
          <div>
            <span className="font-bold">Summary</span>
            <div className="text-sm">
              {report?.summary}
            </div>
          </div>
          <div>
            <h3 className="font-bold">Coverage</h3>
            <div className="ps-2 pt-2 text-sm">
              <span className="font-bold">Covered Areas</span>
              {report?.coverage?.coveredAreas?.map((ele:string)=>{
                return (
                  <div className="flex align-center">
                    <div className="text-green-900 font-bold"><MdCheck/></div>
                    <div>{ele}</div>
                  </div>
                ) 
              })}
            </div>
            <div className="ps-2 pt-2 text-sm">
              <span className="font-bold">Potential Missing Areas</span>
              {report?.coverage?.potentialMissingAreas?.map((ele:string)=>{
                return (
                  <div className="flex align-center">
                    <div className="text-red-500 text-xs pt-1"><FaExclamation/></div>
                    <div>{ele}</div>
                  </div>
                ) 
              })}
            </div>
          </div>
          <div>
            <span className="font-bold">Issues</span>
            <div className="grid gap-3 p-2 text-sm">
              {report?.issues?.map((ele:string, i:number)=>{
                return (
                    <div className="flex align-center" key={i}>
                      <div className="text-yellow-500 pt-0.5"><TiWarningOutline/></div>
                      <div>{ele}</div>
                    </div>
                  ) 
                })}
            </div>
          </div>
          <div>
            <h3 className="font-bold">Logical Analysis</h3>
            <div className="grid gap-3 p-2 text-sm">
              <div>
                <span className="font-bold ">Diagnostic Gaps</span>
                <ul className="list-disc list-inside">
                  {report?.logicAnalysis?.diagnosticGaps?.map((ele:string)=><li>{ele}</li>)}
                </ul>
              </div>
              <div>
                <span className="font-bold ">Logical Inconsistencies</span>
                <ul className="list-disc list-inside">
                  {report?.logicAnalysis?.logicalInconsistencies?.map((ele:string)=><li>{ele}</li>)}
                </ul>
              </div>
              <div>
                <span className="font-bold ">Missing Diagnostic Steps</span>
                <ul className="list-disc list-inside">
                  {report?.logicAnalysis?.missingDiagnosticSteps?.map((ele:string)=><li>{ele}</li>)}
                </ul>
              </div>
              <div >
                <span className="font-bold ">Redundant Questions</span>
                <ul className="list-disc list-inside">
                  {report?.logicAnalysis?.redundantQuestions?.map((ele:string)=><li>{ele}</li>)}
                </ul>
              </div>
              <div>
                <span className="font-bold ">Weak Conclusions</span>
                <ul className="list-disc list-inside">
                  {report?.logicAnalysis?.weakConclusions?.map((ele:string)=><li>{ele}</li>)}
                </ul>
              </div>
            </div>
          </div>
          <div>
            <span className="font-bold">Quality Indicators</span>
            <div className="grid gap-3 text-sm p-2">
              <div>
                <span className="font-bold">Clarity</span> : {report?.qualityIndicators?.clarity}
              </div>
              <div>
                <span className="font-bold">Completeness</span> : {report?.qualityIndicators?.completeness}
              </div>
              <div>
                <span className="font-bold">Confidence</span> : {report?.qualityIndicators?.confidence}
              </div>
              <div>
                <span className="font-bold">Efficiency</span> : {report?.qualityIndicators?.efficiency}
              </div>
            </div>
          </div>
          <div>
            <span className="font-bold">Suggestions</span>
            <div className="grid gap-3 text-sm p-2">
              {report?.suggestions?.map((ele:string,i:number)=>{
                return (
                  <div className="flex align-center" key={i}>
                    <div className="pt-1 text-blue-600"><LuLightbulb/></div>
                    <div>{ele}</div>
                  </div>
                ) 
              })}
            </div>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
