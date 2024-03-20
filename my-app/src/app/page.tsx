'use client';

import { useState } from "react";
import {Login } from "./component/Login"
import {Signup } from "./component/Signup"

export default function Home() {
  const [tab, setTab] = useState('signup');


  return (
    <main className=" border-black">
      <div className="max-w-md py-8 mx-auto mt-8">
      <ul className="flex justify-between">
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
      {tab === 'login' ? <Login /> : <Signup />}
    </div>
    </main>
  );
}
