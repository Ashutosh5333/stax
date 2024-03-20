"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Deleteflow, Getdata } from "../Redux/AppReducer/action";
import { MdDeleteSweep } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";

const Sidebar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userdata = useSelector((state) => state.workflow);

  useEffect(() => {
    dispatch(Getdata);
  }, [dispatch]);

  const handleHome = () => {
    router.push("/");
  };
    
   const handleDelete = (id) =>{
   
       dispatch(Deleteflow(id))
       .then((res) =>{
      
         if(res.payload.data.msg=="Post deleted successfully"){
           toast.success(" Delete workspace")
           dispatch(Getdata);
         }
       })
       .catch((err) =>{
        console.log("err",err)
       })
   }


  return (
    <>
      <div
        onClick={handleHome}
        className="flex justify-between items-center px-6 py-4 mb-2"
      >
        <h2 className="font-semibold">User workspace</h2>
      </div>
      {userdata.length > 0 &&
        userdata.map((el) => {
          return (
            <div
              key={el._id}
              className="flex justify-between items-center px-4 py-4 border-red-600"
            >
              <span className="mr-2">{el.saveduser}</span>
              <MdDeleteSweep
                className="text-xl cursor-pointer"
                onClick={() => handleDelete(el._id)}
              />
            </div>
          );
        })}
        <Toaster/>
    </>
  );
};

export default Sidebar;
