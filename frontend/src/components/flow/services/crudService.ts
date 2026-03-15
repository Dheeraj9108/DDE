import api from "@/components/util/api";
import { IFlowPayLoad } from "../interfaces/flow-interface";

const BASE_URL: string = "/api/workflow/flows";

const HEADERS = { "Content-Type": "application/json" };

export const apiService = {
  getAllFlows: async (projectId: string) => {
    const res = await api.get(`${BASE_URL}?projectId=${projectId}`);
    return res.data;
  },

  createFlow: async (data: any) => {
    const res = await api.post(BASE_URL, data);
    return res.data;
  },

  deleteFlow: async (id: string) => {
    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
        headers: HEADERS,
      });
      return await res.json();
    } catch (error) {}
  },

  updateFlow: async (data: IFlowPayLoad) => {
    const res = await api.patch('/api/workflow/flows',data);
    return res.data;
  },

  getFlowById: async (id: string) => {
    const res = await api.get(`/api/workflow/flows/${id}`);
    return res.data;
  },

  getProjectById: async (id: string) => {
    const res = await api.get(`/api/workflow/projects/${id}`);
    return res.data;
  },

  getAllUsersByGroupId: async (id: string) => {
    const res = await api.get(`/iam/groups/getAllUsers/${id}`);
    return res.data;
  },

  updateCollaborators: async (payload: any) => {
    const res = await api.post(
      `/api/workflow/projects/manageCollaborators`,
      payload,
    );
    return res.data;
  },

  startReview: async (id: string) => {
    try {
      const res = await fetch(`${BASE_URL}/${id}/startReview`, {
        headers: HEADERS,
        method: "POST",
      });
      return await res.json();
    } catch (error) {
      throw error;
    }
  },

  requestReview: async (payload: any) => {
    try {
      const res = await fetch(`${BASE_URL}/requestReview`, {
        headers: HEADERS,
        method: "POST",
        body: JSON.stringify(payload),
      });
      return await res.json();
    } catch (error) {
      throw error;
    }
  },

  generateAIAnalysisReport:async(id:string)=>{
    // const res = await api.get(`${BASE_URL}/flow-review/${id}`);
    // return res.data;
    return {
      "coverage": {
          "coveredAreas": [
              "Battery voltage assessment",
              "Fuel pump priming (auditory)",
              "Basic electrical system power (dashboard lights)",
              "Starter relay/wiring (non-cranking branch)"
          ],
          "potentialMissingAreas": [
              "Ignition system/Spark test",
              "Fuel pressure/delivery verification beyond priming sound",
              "Air intake/filter obstructions",
              "Engine timing or Compression issues",
              "Crankshaft/Camshaft position sensor checks",
              "Diagnostic Trouble Code (DTC) scanning"
          ]
      },
      "issues": [
          "Contradiction: The start node (1) states 'Engine cranks', but the first question (3) asks 'Does the engine crank?', creating a logical loop if the user follows the 'No' path.",
          "Missing Branch: Node 16 (Fuel pump priming) only offers 'No sound' and 'Not sure'. There is no path for 'Yes, I hear priming', which leaves the user stuck if the fuel pump is working.",
          "Weak Recommendation: Node 25 suggests 'Clean and lighten battery terminal' when a user is 'Not sure' if the fuel pump is priming. There is no logical connection between fuel pump audio uncertainty and battery terminal maintenance.",
          "Terminology: Node 25 uses the term 'lighten' instead of 'tighten' for battery terminals.",
          "Redundancy: Since the symptom is defined as 'Engine cranks', asking if it cranks in Node 3 is redundant unless the flow was intended for a general 'No Start' condition."
      ],
      "logicAnalysis": {
          "diagnosticGaps": [
              "The flow fails to address the 'Air' and 'Spark' components of the combustion triangle."
          ],
          "logicalInconsistencies": [
              "Node 1 vs Node 3 (Cranking vs Not Cranking symptom overlap)",
              "Node 21/25 link (Fuel pump audio vs Battery terminal cleaning)"
          ],
          "missingDiagnosticSteps": [
              "Verification of spark at the plugs",
              "Fuel pressure measurement",
              "Checking for blown fuses related to the ECM or Ignition"
          ],
          "redundantQuestions": [
              "Node 3: 'Does the engine crank?'"
          ],
          "weakConclusions": [
              "Node 27: Recommending 'Replace the wiring' based solely on dashboard lights being on while the engine won't crank is an extreme and premature conclusion.",
              "Node 25: Confidence level 10 indicates the conclusion is essentially a placeholder."
          ]
      },
      "qualityIndicators": {
          "clarity": "Moderate - Questions are clear, but the logical structure is confusing.",
          "completeness": "Low - Fails to cover spark or air, and lacks paths for positive fuel pump checks.",
          "confidence": "Low - Several terminal nodes have low confidence scores (10, 30).",
          "efficiency": "Low - Users can reach dead ends or illogical recommendations quickly."
      },
      "suggestions": [
          "Align the start node description with the first question or remove the non-cranking branch to focus exclusively on 'Cranks but won't start'.",
          "Add a 'Yes' option to Node 16 to allow the user to proceed to Spark or Fuel Pressure diagnostics.",
          "Revise the 'Not sure' path for fuel pump priming to include a physical check of the fuel rail or relay testing rather than battery terminal cleaning.",
          "Include an OBD-II scan step early in the process to identify sensor failures."
      ],
      "summary": "The diagnostic flow aims to troubleshoot an 'Engine cranks but does not start' condition. It covers basic electrical and fuel pump checks but contains a fundamental logical contradiction at the start and lacks essential diagnostic branches for spark and fuel pressure."
    }
  }
};


// 
