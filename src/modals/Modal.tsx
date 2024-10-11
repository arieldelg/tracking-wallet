import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ children }: { children: React.ReactNode }) => {
  return ReactDOM.createPortal(
    <section className="absolute">{children}</section>,
    document.getElementById("modal") as Element
  );
};

export default Modal;
