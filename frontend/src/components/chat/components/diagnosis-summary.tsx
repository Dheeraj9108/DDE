import { Header } from "@/components/shared/header";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CRUDService } from "../service/crud-service";
import { ISummary } from "../interfaces/chat-interfaces";

import { Badge } from "@/components/ui/badge";
import {
  IconBug,
  IconChevronDown,
  IconClipboardCheck,
  IconClipboardText,
  IconDatabase,
  IconExclamationCircle,
  IconInfoCircle,
  IconMessages,
  IconShare,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { LuLightbulb } from "react-icons/lu";
import { Label } from "@/components/ui/label";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Bot, User } from "lucide-react";

export function DiagnosisSummary() {
  const [summary, setSummary] = useState<ISummary>({} as ISummary);
  const { id, sessionId } = useParams();
  useEffect(() => {
    if (sessionId) generateSummary(sessionId);
  }, [id, sessionId]);

  useEffect(() => {
    setSummary((prev:ISummary)=>{
      return {
        ...prev,
        aiAnalysis: {
          "diagnosticReasoning": "The engine cranks, confirming the starting system is operational, but it fails to start due to a lack of sufficient fuel pressure. The measured pressure of 10 PSI is significantly below the required threshold for combustion. This lack of pressure identifies the fuel pump as the failed component responsible for the no-start condition.",
          "observations": [
              "The engine cranks normally, indicating the battery, starter, and starting circuit are functional.",
              "Fuel pressure is measured at 10 PSI, which is confirmed to be below the manufacturer's specification."
          ],
          "optionalChecks": [
              "Verify voltage and ground supply at the fuel pump connector during cranking.",
              "Inspect the fuel filter for potential blockage.",
              "Perform a fuel volume delivery test to confirm flow rate."
          ],
          "relatedCauses": [
              "Clogged fuel filter",
              "Faulty fuel pressure regulator",
              "Restricted fuel lines",
              "Electrical resistance in the fuel pump circuit"
          ]
        }
      }
    }) 
  },[]);

  const generateSummary = async (sessionId: string) => {
    const res = await CRUDService.generateSummary(sessionId);
    setSummary(res);
  };

  let breadcrumbItems: any = [];
  const setBreadcrumb = () => {
    breadcrumbItems = [
      {
        item: "Home",
        url: "/",
      },
      {
        item: "Projects",
        url: "/projects",
      },
      {
        item: "Flows",
        url: "/flows",
      },
    ];
  };

  const openConversation = () => { };

  setBreadcrumb();
  return (
    <>
      <Header breadcrumbs={breadcrumbItems} />
      <div className="container mx-auto py-4 px-2 max-w-6xl">
        <div className="text-2xl font-bold mb-1 ">System Analysis</div>
        <div className="text-sm text-gray-500 mb-2">
          Diagnostic Reporting and Issue Identification
        </div>
        <div className="mb-5">
          <div className="grid grid-cols-[70%_30%] gap-4">
            <div className="space-y-4">

              {/* Diagnostic Summary */}
              <div
                className="bg-card rounded-lg p-6"
                style={{ background: "#161f30" }}
              >

                <div className="flex justify-between mb-3">
                  <div className="flex flex-col">
                    <div className="flex">
                      <IconClipboardCheck className="mt-1 mr-1 text-xs text-blue-400" />
                      <div className="text-xl font-bold">
                        Diagnostic Summary
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 font-medium pt-2">
                      Generated At 14:22:05 OTC
                    </div>
                  </div>
                  <div>
                    <Badge
                      style={{ border: "1px solid #1f3a67" }}
                      className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                    >
                      CRITICAL REPORT
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 my-5">

                  {/* Issue Identified */}
                  <div>
                    <div className="text-xs text-gray-500 mb-1 font-bold">
                      ISSUE IDENTIFIED
                    </div>
                    <div className="flex">
                      <div
                        className="rounded-lg p-1"
                        style={{ backgroundColor: "#52353f" }}
                      >
                        <IconBug className="text-red-500" />
                      </div>
                      <div className="text-xl font-bold ps-2">
                        {summary?.issue}
                      </div>
                    </div>
                  </div>

                  {/* Confidence Score */}
                  <div>
                    <div className="text-xs text-gray-500 mb-1 font-bold">
                      CONFIDENCE SCORE
                    </div>
                    <div className="flex items-center">
                      <div
                        className="text-3xl font-bold"
                        style={{ color: "#60a5fa" }}
                      >
                        {summary?.confidence}%
                      </div>
                      <div
                        className="w-full m-2 h-1.5 rounded-lg"
                        style={{ background: "#1e2a3d" }}
                      >
                        <div
                          className="bg-blue-300 h-1.5 rounded-lg"
                          style={{ background: "#397dec", width: `${summary?.confidence || 0}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    <div className="text-xs text-gray-500 mb-1 font-bold">
                      STATUS
                    </div>
                    <div className="flex items-center">
                      <div
                        className="rounded-lg h-2.5 w-2.5 bg-green-500"
                        style={{ background: "#f59e0b" }}
                      ></div>
                      <div
                        className="ps-2 italic font-medium"
                        style={{ color: "#eabc20" }}
                      >
                        {summary?.status}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-b-2"></div>

                {/* Summary Narrative */}
                <div>
                  <div className="text-xs text-gray-500 my-4 font-bold">
                    SUMMARY NARRATIVE
                  </div>
                  <div
                    className="border border-gray-800 rounded-lg p-4 italic font-thin"
                    style={{ background: "#0b1223" }}
                  >
                    "{summary?.summary}."
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">

                {/* Key Informations Used */}
                <div className="bg-card rounded-lg p-6" style={{ background: "#161f30" }}>
                  <div className="flex flex-col space-y-2">
                    <div className="flex">
                      <div>
                        <IconDatabase className="mr-1 text-xs text-blue-400" />
                      </div>
                      <div className="text-medium font-medium">Key Information Used</div>
                    </div>
                    <ul className="list-disc list-inside pl-5 space-y-1">
                      {summary?.evidences?.map((evidence, i) => (
                        <li key={i} className="text-slate-500 text-sm marker:text-blue-500/25 hover:marker:text-blue-500">{evidence}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Diagnostic Details */}
                <div className="bg-card rounded-lg p-6" style={{ background: "#161f30" }}>
                  <div className="flex flex-col space-y-2">
                    <div className="flex">
                      <div>
                        <IconInfoCircle className="mr-1 text-xs text-blue-400" />
                      </div>
                      <div className="text-medium font-medium">
                        Diagnostic Details
                      </div>
                    </div>
                    <div className="border border-gray-900/50 rounded-lg space-y-3 p-4" style={{ background: "#0b1223" }}>
                      <div className="flex flex-col text-xs">
                        <div className="text-xs text-gray-500/70 mb-1 font-bold">FLOW NAME</div>
                        <div className="text-sm font-medium">{summary?.flowName}</div>
                      </div>
                      <div className="flex flex-col text-xs">
                        <div className="text-xs text-gray-500/70 mb-1 font-bold">COMPLETED AT</div>
                        <div className="text-sm font-medium">
                          {new Date(summary?.completedTime || "").toLocaleString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* Conversation */}
              <div className="bg-card rounded-lg p-6" style={{ background: "#161f30" }}>
                <Collapsible>
                  <CollapsibleTrigger className="w-full">
                    <div className="text-lg font-semibold mb-2 flex justify-between">
                      <div className="flex">
                        <IconMessages className="mt-1 mr-1 text-xs text-blue-400" />
                        <div className="text-lg font-medium">
                          Conversations
                        </div>
                      </div>
                      <IconChevronDown
                        className="mt-1"
                        onClick={openConversation}
                      />
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    {summary?.coversations?.map((step, i) => (
                      <div key={i} className="flex">
                        <div className="flex flex-col items-center">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-sky-900/60 text-sky-300 ring-1 ring-sky-700 text-xs font-medium">
                            {i + 1}
                          </div>
                          {i !== summary?.coversations.length - 1 && (
                            <div className="flex-1 w-px bg-sky-800/60" />
                          )}
                        </div>
                        <div
                          className={`flex text-slate-400 text-sm flex-col ${i + 1 != summary?.coversations.length && "mb-5"}`}
                        >
                          <div className="px-2">
                            <div className="flex space-x-2">
                              <div>
                                <Bot className="text-primary-foreground text-sky-400 h-5 w-5" />
                              </div>
                              <div>
                                {step.prompt}
                              </div>
                            </div>
                          </div>
                          <div className="px-2">
                            <div className="flex space-x-2">
                              <div>
                                <User className="text-gray-500 text-slate-400 h-5 w-5" />
                              </div>
                              <span>
                                {step.answer}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>

            <div className="space-y-4">
              {/* Recommended Steps */}
              <div
                className="bg-card rounded-lg p-6"
                style={{ background: "#161f30" }}
              >
                <div className="flex flex-col space-y-2">
                  <div className="flex">
                    <div>
                      <IconClipboardText className="mr-1 text-xs text-blue-400" />
                    </div>
                    <div className="text-medium font-medium">
                      Recommended Steps</div>
                  </div>
                  <ul className="list-disc list-inside pl-5 space-y-1">
                    {summary?.recommendedSteps?.map((step, i) => {
                      return <li key={i} className="text-slate-500 text-sm marker:text-blue-500/25 hover:marker:text-blue-500">{step}</li>;
                    })}
                  </ul>
                </div>
              </div>

              {/* Quick Actions */}
              <div
                className="bg-card rounded-lg p-6"
                style={{ background: "#161f30" }}
              >
                <div className="flex flex-col space-y-4">
                  <div className="text-medium font-medium">Quick Actions</div>
                  <Button className="bg-blue-700 text-white-900 hover:bg-blue-700 hover:text-inherit">
                    <IconShare className="mt-1" /> Export Report
                  </Button>
                  <Button className="bg-slate-800 text-white-900 hover:bg-slate-800 hover:text-inherit">
                    <IconExclamationCircle className="mt-1" />
                    Report an Issue
                  </Button>
                </div>
              </div> 

              {/* AI Suggestions */}
              <div
                className="bg-card rounded-lg p-6 border-l-4 border-blue-500"
                style={{ background: "#161f30" }}
              >
                <div className="flex text-blue-300">
                  <LuLightbulb /> <Label>AI Insights</Label>
                </div>
                <div className="pt-3 text-xs text-blue-100/50 font-medium">
                    <strong>Observations : </strong>
                    <ul className="list-disc list-inside">
                      {summary?.aiAnalysis?.observations?.map((m, i) => (
                        <li key={i}>{m}</li>
                      ))}
                    </ul>
                    <br/>
                    <strong>Optional Checks : </strong>
                    <ul className="list-disc list-inside">
                      {summary?.aiAnalysis?.optionalChecks?.map((m, i) => (
                        <li key={i}>{m}</li>
                      ))}
                    </ul>
                    <br/>
                    <strong>Related Causes : </strong>
                    <ul className="list-disc list-inside">
                      {summary?.aiAnalysis?.relatedCauses?.map((m, i) => (
                        <li key={i}>{m}</li>
                      ))}
                    </ul>
                    <br/>
                    <strong>Diagnostic Reasoning : </strong>
                    {summary?.aiAnalysis?.diagnosticReasoning}
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </>
  );
}
