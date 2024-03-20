"use client";
import React from "react";
import Image from "next/image";

import { IoMdNotificationsOutline } from "react-icons/io";
import Sidebar from "../../component/Sidebar";
import PrivateRoute from "@/app/Privateroute/PrivateRoute";
import BrowerFile from "../../component/BrowerFile";

const Page = () => {
  return (
    <>
      <div className="Box-container  w-[100%] m-auto flex justify-between">
        <div
          className="SideBar-container cursor-pointer  hidden sm:block  py-2 px-2 w-[20%] 
     min-h-screen fixed bg-[#FFFFFF] m-auto shadow-md text-[#9A9AA9] h-screen lg:px-4 "
        >
          <Sidebar />
        </div>

        <div className="Admin-container sm:ml-[20%]  border-pink-700 w-[95%] sm:w-[80%]  m-auto  min-h-screen">
          <div
            className="RightSide-Container mt-[15%] sm:mt-0
         border-black w-full px-4 mx-auto    p-2"
          >
            <div
              className="flex justify-between w-[100%] sm::w-[80%] mx-auto m-auto  relative top-[10%]
           sm:top-0 px-4 py-8  border-red-500 mb-2"
            >
              <div className="flex items-center ">
                <span className="material-icons text-2xl font-semibold mr-2 ">
                  {" "}
                  Upload CSV{" "}
                </span>
              </div>

              <div className="flex  cursor-pointer justify-between gap-5  items-center">
                <span className="material-icons hidden sm:block mr-2">
                  <IoMdNotificationsOutline className="text-[1.5rem]" />
                </span>
                <span className="material-icons hidden sm:block">
                  <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                    <Image
                      src="https://bit.ly/kent-c-dodds"
                      alt="Kent Dodds"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </div>
                </span>
              </div>
            </div>

            <BrowerFile />
          </div>
        </div>
      </div>
    </>
  );
};
export default Page;
