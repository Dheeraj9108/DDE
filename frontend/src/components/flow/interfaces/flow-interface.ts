import { Edge, Node } from "@xyflow/react";

export interface IFlowListItem {
  id: string;
  name: string;
  version: number;
  description: string;
  createdBy: string;
  status: "Checked-IN" | "Checked-OUT";
}

export interface IFlow {
  id: string;
  nodes: Node[];
  edges: Edge[];
}

interface INodesWrapper {
  upserts: any;
  deletes: any;
}

interface IEdgesWrapper {
  upserts: any;
  deletes: any;
}

export interface IFlowPayLoad {
  id: string;
  nodes: INodesWrapper;
  edges: IEdgesWrapper;
}

export interface IConditionalSplitNodeProps {
  id: string;
  data: {
    label: string;
    prompt: string;
    onEdit: (id: string, nodeInfo: any) => void;
  };
}

export interface IActionNodeProps {
  id: string;
  data: {
    label: string;
    prompt:string;
    onAddOutput: (arr: any[]) => void;
    onEdit: (id: string, nodeInfo: any) => void;
  };
}

export interface IOption {
  label: string;
  value: string;
  evidence?: string[];
}

export interface IRange {
  label: string;
  rop1: string;
  rop1Value: string;
  lop: string;
  rop2: string;
  rop2Value: string;
  evidence?: string[];
}

export interface IEndNode {
  id: string;
  data: ITerminalNode;
}

export interface ITerminalNode {
  label: string;
  issue: string;
  summary: string;
  status: string;
  confidence: number;
  recommendedSteps: string[];
  onEdit: (id: string, nodeInfo: any) => void;
}

export type NodeActionProp = {
  onEdit: () => void;
  onView: () => void;
  onDelete: () => void;
};
