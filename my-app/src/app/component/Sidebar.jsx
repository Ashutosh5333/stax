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
    // console.log("iddd",id)
       dispatch(Deleteflow(id))
       .then((res) =>{
        // console.log("res",res)
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
      <div onClick={handleHome} className="px-6 py-4 mb-2">
       
        <h2 className="font-semibold"> User workspace </h2>
      </div>
      {userdata.length > 0 &&
        userdata.map((el) => {
          return (
            <div
              key={el._id}
              className=" flex flex-col justify-center px-4 py-4 border-red-600"
            >
              <div className="flex items-center gap-2 py-2 mb-6">
                <span className="material-icons mr-2">{el.saveduser}</span>

                <span className="text-sm font-medium font-Nunito">
                  <MdDeleteSweep
                    className="text-xl"
                    onClick={() => handleDelete(el._id)}
                  />
                </span>
              </div>
            </div>
          );
        })}
        <Toaster/>
    </>
  );
};

export default Sidebar;
