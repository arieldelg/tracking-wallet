import React from "react";
import ReactDOM from "react-dom";
import { useAppDispatch } from "../store/hooks";
import { setClose } from "../store/ui/uiSlice";
import { useWalletStore } from "../hooks";

const Modal = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { reset } = useWalletStore();
  return ReactDOM.createPortal(
    <section
      className="auto-rows-auto absolute top-0 left-0 bg-[#2A2828] w-screen h-screen bg-opacity-60 backdrop-blur-sm grid grid-rows-1 justify-center auto-cols-auto items-center font-mono font-bold z-10"
      onClick={() => {
        dispatch(setClose());
        reset();
      }}
    >
      {children}
    </section>,
    document.getElementById("modal") as Element
  );
};

export default Modal;
