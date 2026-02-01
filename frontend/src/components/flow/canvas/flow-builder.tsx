import { useCallback, useEffect, useRef, useState } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
  type Edge,
  type Node,
  type NodeTypes,
  Panel,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { StartNode } from "./nodes/start-node";
import { ConditionalSplitNode } from "./nodes/conditional-split-node";
import { AddButtonNode } from "./nodes/add-button-node";
import { ActionNode } from "./nodes/action-node";
import { ResultNode } from "./nodes/resultNode";
import dagre from "@dagrejs/dagre";
import { EndNode } from "./nodes/end-node";
import { Button } from "@/components/ui/button";
import { CRUDService } from "@/components/flow/services/crudService";
import { NodeSearch } from "@/components/node-search";
import { Search, X } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import * as CONST from "../constants";
import { PayLoadBuilder } from "../builder/payload-builder";
import { IFlow, IFlowPayLoad, IOption } from "../interfaces/flow-interface";

const nodeTypes: NodeTypes = {
  startNode: StartNode,
  conditionalSplit: ConditionalSplitNode,
  addButton: AddButtonNode,
  action: ActionNode,
  resultNode: ResultNode,
  endNode: EndNode,
};

const defaultEdgeOptions = {
  animated: true,
  type: "smoothstep",
};

const nodeWidth = 200;
const nodeHeight = 200;

const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  const isHorizontal = "TB";
  const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({
    rankdir: "TB", // top to bottom
    // align: "UL",
    // ranksep: 80, // vertical spacing
    // nodesep: 50, // horizontal spacing
  });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, {
      width: nodeWidth || 200,
      height: nodeHeight || 130,
    });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const { x, y } = dagreGraph.node(node.id);
    return {
      ...node,
      targetPosition: isHorizontal ? "left" : "top",
      sourcePosition: isHorizontal ? "right" : "bottom",
      position: {
        x: x - (nodeWidth ?? 200) / 2,
        y: y - (nodeHeight ?? 130) / 2,
      },
      // sourcePosition: Position.Bottom,
      // targetPosition: Position.Top,
    };
  });

  return { nodes: layoutedNodes, edges };
};

export function FlowBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const nodeIdRef = useRef(3);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);
  const { id } = useParams();
  const builderRef = useRef<PayLoadBuilder>(null);

  useEffect(() => {
    getFlowById();
  }, []);

  const getFlowById = async () => {
    try {
      const res: IFlow = await CRUDService.getFlowById(id ?? "");
      const newNodes = res?.nodes?.map((node: Node) => {
        let newNode = {
          ...node,
          position: { x: 0, y: 0 },
        };
        if (node.type === CONST.NODE_TYPE.ADD) {
          newNode.data.onAdd = addNode;
        } else {
          newNode.data.onEdit = handleEdit;
        }
        return newNode;
      });

      setNodes(newNodes);
      setEdges(res?.edges);
      builderRef.current = new PayLoadBuilder({
        id: id ?? "",
        nodes: newNodes,
        edges: res.edges,
      });
    } catch (error) {}
  };

  const layoutGraph = useCallback(() => {
    const { nodes: layouted, edges: layoutedEdges } = getLayoutedElements(
      nodes,
      edges,
    );
    setNodes(layouted as Node[]);
    setEdges(layoutedEdges);
  }, [nodes, edges, setNodes, setEdges]);

  useEffect(() => {
    layoutGraph();
  }, [JSON.stringify(nodes), JSON.stringify(edges)]);

  const addNode = useCallback(
    (sourceNodeId: string, nodeType: "conditional" | "action" | "end") => {
      if (nodeType === "conditional") {
        addConditionalSplit(sourceNodeId);
      } else if (nodeType === "action") {
        addActionNode(sourceNodeId);
      } else if (nodeType === "end") {
        addEndNode(sourceNodeId);
      }
    },
    [],
  );

  const addActionNode = useCallback(
    (sourceNodeId: string) => {
      const newNodeId = nodeIdRef.current.toString();

      const actionNode: Node = {
        id: newNodeId,
        type: "action",
        position: { x: 0, y: 0 },
        data: {
          label: "Action",
          outputs: 1,
          onAddOutput: (arr: any) => {
            addResultNode(newNodeId, arr);
          },
          onEdit: handleEdit,
          nodeType: "INTERNAL",
        },
      };

      nodeIdRef.current = nodeIdRef.current + 3;

      setNodes((nds) => {
        const filteredNodes = nds.filter((node) => node.id !== sourceNodeId);

        // outputButtonNode.data.onAdd = (
        //   type: "conditional" | "action" | "end"
        // ) => {
        //   addNode(outputButtonId, type);
        // };

        // return [...filteredNodes, actionNode, outputButtonNode, resultNode];
        return [...filteredNodes, actionNode];
      });

      setEdges((eds) => {
        const filteredEdges = eds.filter(
          (edge) => edge.target !== sourceNodeId,
        );
        const sourceEdge = eds.find((edge) => edge.target === sourceNodeId);
        const newEdges: Edge[] = [];

        if (sourceEdge) {
          newEdges.push({
            ...sourceEdge,
            id: `e${sourceEdge.source}-${newNodeId}`,
            source: sourceEdge.source,
            target: newNodeId,
          });
        }

        return [...filteredEdges, ...newEdges];
      });
    },
    [setNodes, setEdges],
  );

  const addResultNode = useCallback(
    (sourceNodeId: string, arr: any) => {
      for (let i = 0; i < arr.length; i++) {
        const newResultNodeId = nodeIdRef.current.toString();
        const outputButtonId = (nodeIdRef.current + 1).toString();

        nodeIdRef.current = nodeIdRef.current + 2;

        const resultNode: Node = {
          id: newResultNodeId,
          type: "resultNode",
          position: { x: 0, y: 0 },
          data: {
            label: arr[i].label,
            nodeType: "INTERNAL",
          },
        };

        const outputButtonNode: Node = {
          id: outputButtonId,
          type: "addButton",
          position: { x: 0, y: 0 },
          data: { onAdd: addNode, nodeType: "INTERNAL" },
        };

        setNodes((nodes) => {
          const newNodes = nodes.map((node) =>
            node.id === sourceNodeId
              ? {
                  ...node,
                  data: {
                    ...node.data,
                  },
                }
              : node,
          );

          return [...newNodes, resultNode, outputButtonNode];
        });

        setEdges((edges) => {
          const newEdges: Edge[] = [];
          newEdges.push({
            id: `e${sourceNodeId}-${newResultNodeId}`,
            source: sourceNodeId,
            target: newResultNodeId,
            style: { stroke: "#f97316", strokeWidth: 2 },
            data: {
              condition: arr[i].label,
            },
          });
          newEdges.push({
            id: `e${newResultNodeId}-${outputButtonId}`,
            source: newResultNodeId,
            target: outputButtonId,
            style: { stroke: "#f97316", strokeWidth: 2 },
            data: {
              condition: arr[i].label,
            },
          });
          return [...edges, ...newEdges];
        });
      }
    },
    [setNodes, setEdges],
  );

  const addConditionalSplit = useCallback(
    (sourceNodeId: string) => {
      const newNodeId = nodeIdRef.current.toString();
      const yesButtonId = (nodeIdRef.current + 1).toString();
      const noButtonId = (nodeIdRef.current + 2).toString();
      const options: IOption[] = [
        {
          label: "Yes",
          value: "Yes",
          evidence: [],
        },
        {
          label: "No",
          value: "No",
          evidence: [],
        },
      ];

      const conditionalNode: Node = {
        id: newNodeId,
        type: "conditionalSplit",
        position: { x: 0, y: 0 },
        data: {
          label: "Conditional Split",
          content: "What is this?",
          onEdit: handleEdit,
          nodeType: "INTERNAL",
          options,
        },
      };

      const yesButtonNode: Node = {
        id: yesButtonId,
        type: "addButton",
        position: { x: 0, y: 0 },
        data: {
          onAdd: addNode,
          nodeType: "INTERNAL",
        },
      };

      const noButtonNode: Node = {
        id: noButtonId,
        type: "addButton",
        position: { x: 0, y: 0 },
        data: {
          onAdd: addNode,
          nodeType: "INTERNAL",
        },
      };

      nodeIdRef.current = nodeIdRef.current + 3;

      setNodes((nds) => {
        const filteredNodes = nds.filter((node) => node.id !== sourceNodeId);

        const newNodes = [
          ...filteredNodes,
          conditionalNode,
          yesButtonNode,
          noButtonNode,
        ];
        return newNodes;
      });

      setEdges((eds) => {
        const filteredEdges = eds.filter(
          (edge) => edge.target !== sourceNodeId,
        );

        const sourceEdge = eds.find((edge) => edge.target === sourceNodeId);
        const newEdges: Edge[] = [];

        if (sourceEdge) {
          newEdges.push({
            ...sourceEdge,
            id: `e${sourceEdge.source}-${newNodeId}`,
            source: sourceEdge.source,
            target: newNodeId,
          });
        }

        newEdges.push({
          id: `e${newNodeId}-${yesButtonId}`,
          source: newNodeId,
          target: yesButtonId,
          style: { stroke: "#10b981", strokeWidth: 2 },
          label: "Yes",
          labelStyle: {
            fill: "#10b981",
            fontWeight: 600,
            fontSize: 12,
            fontFamily: "system-ui, -apple-system, sans-serif",
          },
          labelBgStyle: {
            fill: "#1f2937",
            fillOpacity: 0.8,
          },
          labelBgPadding: [4, 8],
          data: {
            condition: "Yes",
          },
        });

        newEdges.push({
          id: `e${newNodeId}-${noButtonId}`,
          source: newNodeId,
          target: noButtonId,
          style: { stroke: "#ef4444", strokeWidth: 2 },
          label: "No",
          labelStyle: {
            fill: "#ef4444",
            fontWeight: 600,
            fontSize: 12,
            fontFamily: "system-ui, -apple-system, sans-serif",
          },
          labelBgStyle: {
            fill: "#1f2937",
            fillOpacity: 0.8,
          },
          labelBgPadding: [4, 8],
          data: {
            condition: "No",
          },
        });

        return [...filteredEdges, ...newEdges];
      });
    },
    [setNodes, setEdges, addNode],
  );

  const addEndNode = useCallback(
    (sourceNodeId: string) => {
      const newEndNodeId = nodeIdRef.current.toString();

      const newEndNode: Node = {
        id: newEndNodeId,
        type: "endNode",
        position: { x: 0, y: 0 },
        data: {
          label: "End",
          nodeType: "TERMINAL",
          onEdit: handleEdit,
        },
      };

      nodeIdRef.current = nodeIdRef.current + 1;

      setNodes((nds) => {
        const newNodes = nds.filter((node) => node.id !== sourceNodeId);
        return [...newNodes, newEndNode];
      });

      setEdges((edges) => {
        const filteredEdges = edges.filter(
          (edge) => edge.target !== sourceNodeId,
        );
        const sourceEdge = edges.find((edge) => edge.target === sourceNodeId);
        const newEdges: Edge[] = [];
        if (sourceEdge) {
          newEdges.push({
            ...sourceEdge,
            id: `e${sourceEdge.source}-${newEndNodeId}`,
            source: sourceEdge.source,
            target: newEndNodeId,
          });
        }
        return [...filteredEdges, ...newEdges];
      });
    },
    [setNodes, setEdges],
  );

  const handleEdit = (nodeId: string, nodeInfo: any) => {
    setNodes((nodes) => {
      const filteredNodes = nodes.filter((node) => node.id !== nodeId);
      let editNode = nodes.find((node) => node.id == nodeId);
      const newNodes = [...filteredNodes];
      if (editNode) {
        editNode.data = nodeInfo;
        newNodes.push(editNode);
      }
      return newNodes;
    });
  };

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const saveFlow = async () => {
    const payload: IFlowPayLoad = builderRef
      .current!.setCurrentFlow({ id: id ?? "", nodes, edges })
      .build();
    try {
      await CRUDService.updateFlow(payload);
      toast.success(CONST.UPDATE_SUCCESS);
    } catch (error) {}
  };

  return (
    <div className="w-full h-full bg-gray-900">
      <ReactFlow
        onPaneClick={() => setIsSearchOpen(false)}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        className="bg-gray-900"
        defaultEdgeOptions={defaultEdgeOptions}
        nodesDraggable={false}
      >
        <Controls className="bg-gray-800 border-gray-700" />
        <Background color="#374151" gap={20} />

        <Panel position="top-right" className="flex items-center gap-2">
          <div
            ref={searchRef}
            className="flex items-center bg-gray-800 rounded-md border border-gray-700 p-1"
          >
            {isSearchOpen ? (
              <div className="flex items-center gap-1 animate-in fade-in slide-in-from-right-2 duration-200">
                <NodeSearch className="w-64 bg-transparent border-none focus-visible:ring-0" />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(false)}
                  className="h-8 w-8 text-gray-400"
                >
                  <X size={16} />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                className="h-8 w-8 text-gray-400 hover:text-white"
              >
                <Search size={18} />
              </Button>
            )}
          </div>

          <Button onClick={saveFlow}>{CONST.SAVE}</Button>
        </Panel>
      </ReactFlow>
    </div>
  );
}

// -----------------

// Action Node

// const outputButtonNode: Node = {
//   id: outputButtonId,
//   type: "addButton",
//   position: { x: 0, y: 0 },
//   data: { onAdd: null },
//   // sourcePosition: Position.Bottom,
//   // targetPosition: Position.Top,
// };

// const resultNode: Node = {
//   id: resultNodeId,
//   type: "resultNode",
//   position: { x: 0, y: 0 },
//   data: { label: "Result" },
//   // sourcePosition: Position.Bottom,
//   // targetPosition: Position.Top,
// };

// -----------------

// const initialNodes: Node[] = [
//   {
//     id: "1",
//     type: "startNode",
//     position: { x: 0, y: 0 },
//     data: { label: "Start" },
//   },
//   {
//     id: "2",
//     type: "addButton",
//     position: { x: 0, y: 0 },
//     data: { onAdd: null },
//   },
// ];

// const initialEdges: Edge[] = [
//   {
//     id: "e1-2",
//     source: "1",
//     target: "2",
//     style: { stroke: "#6366f1", strokeWidth: 2 },
//   },
// ];

// -----------------

// const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
//   initialNodes,
//   initialEdges
// );
// const [nodes, setNodes, onNodesChange] = useNodesState(
//   layoutedNodes as Node[]
// );
// const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

// -----------------

// useEffect(() => {
//   // Check if a new node has been added
//   if (nodes.length > initialNodes.length) {
//     const { nodes: layoutedNodes, edges: layoutedEdges } =
//       getLayoutedElements(nodes, edges);
//     setNodes([...layoutedNodes]);
//     setEdges([...layoutedEdges]);
//   }
// }, [nodes.length]);

// -----------------

// const layout = useCallback(() => {
//   const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes,edges);
//   setNodes([...layoutedNodes]);
//   setEdges([...layoutedEdges]);
// }, [nodes,edges]);

// -----------------

// useEffect(() => {
//   setNodes((nds) =>
//     nds.map((node) => {
//       if (node.id === "2" && node.type === "addButton") {
//         return {
//           ...node,
//           data: {
//             ...node.data,
//             onAdd: (type: "conditional" | "action" | "end") =>
//               addNode("2", type),
//           },
//         };
//       }
//       return node;
//     })
//   );
// }, []);

// -----------------

{
  /* <button onClick={layoutGraph}>Auto Layout</button> */
}

// {
//   nodes: [
//     {
//       id: "1",
//       type: "nodeType",
//       data: {
//         label: "label",
//         description: "",
//         // dependes on different types of node different properties may come
//         // if action node
//         dropdownvalue: "",
//         // if drop down value option
//         options: ["op1", "op2"],
//         // if dropdown option range
//         ranges: [
//           {
//             label: "if",
//             rop1: "",
//             rop1Value: "",
//             lop: "",
//             rop2: "",
//             rop2Value: "",
//           },
//           {
//             label: "else if",
//             rop1: "",
//             rop1Value: "",
//             lop: "",
//             rop2: "",
//             rop2Value: "",
//           },
//         ],
//         // so on
//       },
//     },
//   ];
//   edges: [
//     {
//       id: "e1-2",
//       source: "1",
//       target: "2",
//       style: { stroke: "#6366f1", strokeWidth: 2 },
//     },
//   ];
// }

// yesButtonNode.data.onAdd = (type: "conditional" | "action" | "end") => {
//   addNode(yesButtonId, type);
// };

// noButtonNode.data.onAdd = (type: "conditional" | "action" | "end") => {
//   addNode(noButtonId, type);
// };
