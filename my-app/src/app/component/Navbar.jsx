import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div>
      <nav class="bg-gray-800 p-4">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-white text-lg font-bold">
              <Link href="/workflow">
              Create Flow 
              </Link>
               </h1>
          </div>
          <div>
            <h1 class="text-white text-lg font-bold">
               <Link href={"/csv"}>
               Upload Csv File
               </Link>
               </h1>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
