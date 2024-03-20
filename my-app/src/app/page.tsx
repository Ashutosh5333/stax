'use client';

import { useState } from "react";
import {Login } from "./component/Login"
import {Signup } from "./component/Signup"

export default function Home() {
  const [tab, setTab] = useState('signup');


  return (
    <main className=" border-black">

     <h2 className="text-center  text-xl py-4 font-semibold"> Work Flow builder </h2>

      <div className="max-w-md px-2 py-8 mx-auto mt-8">
      <ul className="flex text-xl justify-between px-4">
        <li
          onClick={() => setTab('login')}
          className={`mr-4 cursor-pointer ${tab === 'login' ? 'text-blue-500 font-bold' : 'text-gray-500'}`}
        >
          Login
        </li>
        <li
          onClick={() => setTab('signup')}
          className={`cursor-pointer ${tab === 'signup' ? 'text-blue-500 font-bold' : 'text-gray-500'}`}
        >
          Signup
        </li>
      </ul>


      <div className=" mt-10">
      {tab === 'login' ? <Login /> : <Signup />}
      </div>
     
    </div>
    </main>
  );
}
