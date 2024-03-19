"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import ReactFlow, { useNodesState, useEdgesState, addEdge,MarkerType, ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";
import { WorkflowPost} from "../../Redux/AppReducer/action"

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
  const [savedNodes, setSavedNodes] = useState([]);
  const [savedEdges, setSavedEdges] = useState([]);
  const [saveduser, setSavedUser] = useState("Project 1");
   const dispatch = useDispatch()


  const payload ={
    saveduser:saveduser,
    savedEdges:savedEdges,
    savedNodes:savedNodes
 }

  //  console.log("payloaddd1",payload)

  const handleSave = () => {
    setSavedNodes(nodes);
    setSavedEdges(edges);
    
      setTimeout(() => {
         dispatch(WorkflowPost(payload))
    .then((res)=>{
      console.log("ress",res)
    })
    .catch((err) =>{
      console.log("err",err)
    })
      }, 2000);
  };
  
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
        // label: '+',
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

   
  const handleGoBackOrDelete = () => {
      const filteredNodes = nodes.filter(node => node.id !== nodes[nodes.length - 1].id);
  
      const filteredEdges = edges.filter(edge => edge.source !== nodes[nodes.length - 1].id && edge.target !== nodes[nodes.length - 1].id);
  
     setNodes(filteredNodes);
      setEdges(filteredEdges);
  }


  return (
    <div  style={{ width: "100vw", height: "100vh" }}>
        
        <div className=" flex justify-between">
         <button onClick={handleGoBackOrDelete} disabled={nodes.length<2} className="bg-red-700 rounded py-2 mt-5 text-[#ffffff] px-4 m-auto flex items-center justify-center text-center ">
             Delete node
          </button>
         <input onChange={(e)=>setSavedUser(e.target.value)} className="mt-5 px-4 outline-none" value={saveduser} placeholder="name" />
        <button  onClick={handleSave} className="bg-green-700 rounded py-2 mt-5 text-[#ffffff] px-4 m-auto flex items-center justify-center text-center "> Save Node </button>
        </div>
       
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
