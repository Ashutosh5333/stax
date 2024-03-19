"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, { useNodesState, useEdgesState, addEdge,MarkerType, ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";

const initialNodes = [
  {
    id: "0",
    type: "input",
    data: { label: "Input" },
    position: { x: 0, y: 0 },
  },
];

const initialEdges = [
  {
    id: "edges-e5-7",
    source: "0",
    type: "smoothstep",
    target: "1",
    label: '+',
    animated: true,
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: '#FFCC00', color: '#fff', fillOpacity: 0.7 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
];

let id = 1;
const getId = () => `${id++}`;
const fitViewOptions = {
  padding: 3,
};

const Page = () => {
  const reactFlowWrapper = useRef(null);
  
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [addnode, setAddnode] = useState(false);
  const [addChildeNode, setAddChildeNode] = useState(false);
  const [parentNode, setParentNode] = useState(null);
  const initialNodeType = {
    id : getId(),
    type : 'default',
    position : { x: initialNodes[0].position.x, y: nodes.length*100},
    data: { label: 'New Node' },
    width: 150
  }

  const initialEdge = {
    id: String(parseInt(Math.random(100000000)*1000000)),
    source: nodes[nodes.length-1].id,
    target: nodes[nodes.length-1].id,
    label: '+',
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: '#FFCC00', color: '#fff', fillOpacity: 0.7 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  }
  const onConnect = useCallback(
    (params) => setEdges((els) => addEdge(params, els)),
    []
  );
  useEffect(()=>{
    if(addnode){
      const findFirstNode = nodes.find(item=>item.id===initialEdge.target)
      setEdges((eds) => eds.concat({
        ...initialEdge,
        // source: parentNode.id,
      }));
      setAddnode(false);
      setParentNode(null);
    }
    if(addChildeNode){
      setEdges((eds) => eds.concat({
        id: String(parseInt(Math.random(100000000)*1000000)),
        source: parentNode.id,
        target: nodes[nodes.length-1].id,
        label: '+',
        labelBgPadding: [8, 4],
        labelBgBorderRadius: 4,
        labelBgStyle: { fill: '#FFCC00', color: '#fff', fillOpacity: 0.7 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      }));
      setAddChildeNode(false);
      setParentNode(null);
    }
  },[nodes])

  const handleEdgeClick = (param, data) => {
    // console.log(data);
    const findSourceNode = nodes.find((item)=>item.id===data.source);
    setNodes((nds) => nds.concat({...initialNodeType, 
        data:{ parentId: data.target, ...initialNodeType.data }}));
    setParentNode(findSourceNode);
    setAddnode(true);
  }

  const handleNodeClick = (e, data) => {
    const filterNodeswithSameSource = nodes.filter((node)=>node?.data?.parentId===data?.id);
    setNodes((nds) => nds.concat({
      id : getId(),
      type : 'default',
      position : { x: data.position.x+filterNodeswithSameSource.length*160, y: data.position.y+100},
      data: { label: 'New Node', parentId: data.id },
      width: 150,
    }));
    setAddChildeNode(true);
    setParentNode(data);
  }

    // console.log("parentnode",parentNode)
    // console.log("nnodesss",nodes)
    // console.log("edgess",edges)


  const handleGoBackOrDelete = () => {
      const filteredNodes = nodes.filter(node => node.id !== nodes[nodes.length - 1].id);
  
      const filteredEdges = edges.filter(edge => edge.source !== nodes[nodes.length - 1].id && edge.target !== nodes[nodes.length - 1].id);
  
     setNodes(filteredNodes);
      setEdges(filteredEdges);
  }
  

  return (
    <div ref={reactFlowWrapper} style={{ width: "100vw", height: "100vh" }}>
        <button onClick={handleGoBackOrDelete}>Go Back / Delete</button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        snapToGrid={true}
        snapGrid={[15, 15]}
        onEdgeClick={handleEdgeClick}
        onNodeClick={handleNodeClick}
        attributionPosition="bottom-left"
        fitViewOptions={fitViewOptions}
      ></ReactFlow>
      </div>
  );
};

export default Page;
