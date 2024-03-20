'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const PrivateRoute = ({ children }) => {
    const router = useRouter();
    const Authenticate =
      typeof window !== "undefined" ? !!localStorage.getItem("token") : false;
  
    useEffect(() => {
      if (!Authenticate) {
        router.push("/");
      }
    }, [Authenticate, router]);
  
    return Authenticate ? children : null;
  };
  
  export default PrivateRoute;
