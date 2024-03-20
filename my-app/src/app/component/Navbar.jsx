"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const Navbar = () => {
   const router = useRouter()
  const handleLogout = () => {
    localStorage.clear();
    router.push("/")
  };

  const handleLogin = () =>{
    router.push("/")
  }

  const data =
    typeof window !== "undefined" ? !!localStorage.getItem("user") : false;

  useEffect(() => {
    if (!data) {
      router.push("/");
    }
  }, [data, router]);
  

  const handleFlowClick = () => {
    if (!data) {
      toast.error("Please login first");
    } else {
        router.push("/flow")
    }
  };

  const handleCsvUploadClick = () => {
    if (!data) {
      toast.error("Please login first");
    } else {
      router.push("/csv")
    }
  };

  return (
    <>
    <div>
      <nav className="bg-gray-800 p-4 cursor-pointer">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-white text-lg font-bold">
              <Link href="/flow" onClick={handleFlowClick}>
                Create Flow
              </Link>
            </h1>
          </div>

          <div>
            <h1 className="text-white text-lg font-bold">
              <Link href={"/csv"} onClick={handleCsvUploadClick}>
                Upload Csv{" "}
              </Link>
            </h1>
          </div>

          <div className=" flex justify-between gap-5">
            <h1 className="text-white text-lg font-bold">
              {data ? <span>{data.name}</span> : "Profile"}
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
           {
            data? <h1 onClick={handleLogout} className="text-white text-lg font-bold">
            Logout
          </h1>  : <h1 onClick={handleLogin} className="text-white text-lg font-bold">
              Login
            </h1>
           }
            


          </div>
        </div>
      </nav>

      <Toaster />
    </div>
    </>
  );
};

export default Navbar;
