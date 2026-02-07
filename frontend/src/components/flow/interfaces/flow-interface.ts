import { Edge, Node } from "@xyflow/react";
import { ReactNode } from "react";

export interface IFlowListItem {
  id: string;
  name: string;
  version: number;
  description: string;
  createdBy: string;
  status:
    | "Draft"
    | "Submitted"
    | "Under Review"
    | "Approved"
    | "Requested Changes";
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
    content: string;
    onEdit: (id: string, nodeInfo: any) => void;
  };
}

export interface IActionNodeProps {
  id: string;
  data: {
    label: string;
    content: string;
    comments: string[];
    onAddOutput: (arr: any[]) => void;
    onDelete: (id: string) => void;
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
  comments: string[];
  onDelete: (id: string) => void;
  onEdit: (id: string, nodeInfo: any) => void;
}

export type NodeActionProp = {
  actions: INodeAction[];
};

export interface INodeAction {
  label: string;
  icon: ReactNode;
  onClick: () => void;
}
