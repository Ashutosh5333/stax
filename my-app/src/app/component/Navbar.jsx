'use client';
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Toaster } from "react-hot-toast";

const Navbar = () => {
  // const utoken = localStorage.getItem("user");
  // const data = utoken ? JSON.parse(utoken) : null;


     const handleLogout = () =>{
        localStorage.clear()
     }

  return (
    <div>
      <nav className="bg-gray-800 p-4 cursor-pointer">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-white text-lg font-bold">
              <Link href="/flow">Create Flow</Link>
            </h1>
          </div>

          <div>
            <h1 className="text-white text-lg font-bold">
              <Link href={"/csv"}>Upload Csv </Link>
            </h1>
          </div>

          <div className=" flex justify-between gap-5">
            
            <h1 className="text-white text-lg font-bold">
                {/* {
                  data ?  <span>{data.name}</span>  :"Profile"
                } */}
            </h1>

            <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
              <Image
                src="https://bit.ly/kent-c-dodds"
                alt="dan"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
            {/* {
                  data ?   <h1 onClick={handleLogout} 
                  className="text-white text-lg font-bold">
                    Logout
                  </h1>: <h1 onClick={handleLogout} 
            className="text-white text-lg font-bold">
               Login 
            </h1>
                } */}

          </div>
        </div>
      </nav>

       <Toaster/>
    </div>
   

  );
};

export default Navbar;
