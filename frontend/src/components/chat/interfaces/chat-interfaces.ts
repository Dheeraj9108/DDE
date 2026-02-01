export interface Message {
  id: string;
  type: "user" | "system";
  content: string;
  timestamp: Date;
  options?: string[];
  inputType?: "text" | "select" | "boolean";
  sessionId?: string;
  flowId?: string;
  nodeId?: string;
}

export interface ISummary {
  issue: string;
  confidence: number;
  summary: string;
  status: string;
  recommendedSteps: string[];
  evidences: string[];
  flowName: string;
  completedTime: string;
  coversations: IConversation[];
}

export interface IConversation {
  prompt:string;
  answer:string;
}
