import { IFlow, IFlowPayLoad } from "../interfaces/flow-interface";

export class PayLoadBuilder {
  private currentFlow: IFlow;
  private prevFlow: IFlow;

  constructor(prevFlow: IFlow) {
    this.prevFlow = prevFlow;
    this.currentFlow = {} as IFlow;
  }

  setCurrentFlow(currentFlow: IFlow): this {
    this.currentFlow = currentFlow;
    return this;
  }

  build(): IFlowPayLoad {
    // Nodes
    const prevNodeIds = new Set(
      this.prevFlow?.nodes?.map((node: any) => node?.id)
    );
    const currentNodeIds = new Set(
      this.currentFlow?.nodes?.map((node: any) => node?.id)
    );

    const newNodes = this.currentFlow?.nodes?.filter(
      (node: any) => !prevNodeIds.has(node?.id)
    );

    const updatedNodes = this.currentFlow?.nodes?.filter((currentNode: any) => {
      const prevNode = this.prevFlow?.nodes?.find(
        (node: any) => node?.id === currentNode?.id
      );
      return (
        prevNode && JSON.stringify(prevNode) !== JSON.stringify(currentNode)
      );
    });

    const deletedNodes = this.prevFlow?.nodes?.filter(
      (node: any) => !currentNodeIds.has(node.id)
    );

    // Edges
    const prevEdgeIds = new Set(
      this.prevFlow?.edges?.map((edge: any) => edge?.id)
    );
    const currentEdgeIds = new Set(
      this.currentFlow?.edges?.map((edge: any) => edge?.id)
    );

    const newEdge = this.currentFlow?.edges?.filter(
      (edge: any) => !prevEdgeIds.has(edge?.id)
    );

    const updatedEdges = this.currentFlow?.edges?.filter((currentEdge: any) => {
      const prevEdge = this.prevFlow?.edges?.find(
        (edge: any) => edge?.id === currentEdge?.id
      );
      return (
        prevEdge && JSON.stringify(prevEdge) !== JSON.stringify(currentEdge)
      );
    });

    const deletedEdges = this.prevFlow?.edges?.filter(
      (edge: any) => !currentEdgeIds.has(edge.id)
    );

    const payload: IFlowPayLoad = {
      id: this.currentFlow.id,
      nodes: {
        upserts: [...newNodes, ...updatedNodes],
        deletes: deletedNodes,
      },
      edges: {
        upserts: [...newEdge, ...updatedEdges],
        deletes: deletedEdges,
      },
    };
    return payload;
  }
}
