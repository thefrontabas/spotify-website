import React, { useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Toast({ text }) {
  useEffect(() => {
    notify();
  }, [text]);
  const notify = () => toast(text);

  return (
    <ToastContainer
      toastStyle={{
        backgroundColor: "#2567e2",
        color: "#ffffffcf",
        filter: "drop-shadow(2px 3px 4px #00000050)",
        borderRadius: "7px",
      }}
      position="bottom-center"
      autoClose={4000}
      progressStyle={{ background: "#2567e2" }}
    />
  );
}
