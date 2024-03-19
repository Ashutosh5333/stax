"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import ReactFlow, { useNodesState, useEdgesState, addEdge,MarkerType,useReactFlow, ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";
import { WorkflowPost} from "../../Redux/AppReducer/action"
import "./index.css"
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
  const connectingNodeId = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const onConnect = useCallback(
    (params) => {
      // reset the start node on connections
      // connectingNodeId.current = null;
      setEdges((eds) => addEdge(params, eds))
    },
    [setEdges],
  );
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

  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback(
    (event) => {
      if (!connectingNodeId.current) return;

      const targetIsPane = event.target.classList.contains('react-flow__pane');

      if (targetIsPane) {
        const id = getId();
        const newNode = {
          id,
          position: screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          }),
          data: { label: `Node ${id}` },
          origin: [0.5, 0.0],
        };

        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) =>
          eds.concat({ id, source: connectingNodeId.current, target: id }),
        );
      }
    },
    [screenToFlowPosition],
  );

   
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
        <ReactFlowProvider>
     <div className="wrapper" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        fitView
        fitViewOptions={{ padding: 2 }}
        nodeOrigin={[0.5, 0]}
      />
    </div>

      </ReactFlowProvider>
      </div>
  );
};
// Page.display.name="Page";
// export default Page;
// export default () => (
//   <ReactFlowProvider>
//     <Page />
//   </ReactFlowProvider>
// );

const PageWithProvider = () => (
  <ReactFlowProvider>
    <Page />
  </ReactFlowProvider>
);

export default PageWithProvider;