import React from "react";
import ReactDOM from "react-dom";
import { useAppDispatch } from "../store/hooks";
import { setOpen } from "../store/ui/uiSlice";

const Modal = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  return ReactDOM.createPortal(
    <section
      className="absolute top-0 left-0 bg-[#2A2828] w-screen h-screen bg-opacity-60 backdrop-blur-sm grid grid-rows-1 justify-center auto-cols-auto items-center font-mono font-bold"
      onClick={() => dispatch(setOpen())}
    >
      {children}
    </section>,
    document.getElementById("modal") as Element
  );
};

export default Modal;
