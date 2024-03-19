"use client"
import { store } from "./store";
import { Provider } from "react-redux";

export function Providers({ children }) {
    // console.log("stroeee",store)
  
  return (
      <Provider store={store}>{children}</Provider>
  );
}
