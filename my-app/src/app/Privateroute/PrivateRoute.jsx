'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const PrivateRoute = ({ children }) => {
    const router = useRouter();
    const Authenticate =
      typeof window !== "undefined" ? !!localStorage.getItem("token") : false;
      //  const token = JSON.parse(localStorage.getItem("token"))
        // console.log("token",token)

    useEffect(() => {
      if (!Authenticate) {
        router.push("/");
      }
    }, [Authenticate, router]);
  
    return Authenticate ? children : null;
  };
  
  export default PrivateRoute;
