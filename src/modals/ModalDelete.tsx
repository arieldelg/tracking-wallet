import ReactDOM from "react-dom";
import React from "react";

const ModalDelete = ({ children }: { children: React.ReactNode }) => {
  return ReactDOM.createPortal(
    <section className="auto-rows-auto absolute top-0 left-0 bg-[#2A2828] w-screen h-screen bg-opacity-60 backdrop-blur-sm grid grid-rows-1 justify-center auto-cols-auto items-center font-mono font-bold z-10">
      {children}
    </section>,
    document.getElementById("modalDelete") as Element
  );
};

export default ModalDelete;
