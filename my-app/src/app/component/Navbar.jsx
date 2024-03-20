'use client';
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {

     const handleLogout = () =>{
        localStorage.clear()
     }

  return (
    <div>
      <nav className="bg-gray-800 p-4 cursor-pointer">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-white text-lg font-bold">
              <Link href="/workflow">Create Flow</Link>
            </h1>
          </div>

          <div>
            <h1 className="text-white text-lg font-bold">
              <Link href={"/csv"}>Upload Csv File</Link>
            </h1>
          </div>

          <div className=" flex justify-between gap-5">
            <h1 className="text-white text-lg font-bold">Ashutosh</h1>
            <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
              <Image
                src="https://bit.ly/kent-c-dodds"
                alt="dan"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
            <h1 onClick={handleLogout} 
            className="text-white text-lg font-bold">Logout</h1>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
