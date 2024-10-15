import { useState } from "react";
import {
  TrashIcon,
  PencilSquareIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { MyNewButton } from "../components";
import Modal from "../modals/Modal";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { OpenAccountTabSelector, setOpenTab } from "../store/ui/uiSlice";

const AccountsPage = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const openTab = useAppSelector(OpenAccountTabSelector);
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-col items-end gap-5">
      <MyNewButton openModal={() => setOpenModal(true)} />
      <div className="w-full h-20 flex items-center justify-between relative">
        <div className="h-full w-24 bg-customBlue rounded-l-xl flex items-center justify-center">
          <PencilSquareIcon className="w-14 text-black" />
        </div>
        <div className="flex text-4xl justify-between items-center w-full px-8 bg-customBGDark1 h-full">
          <p>Nomina/Cheques</p>
          <p>10,000 MXN</p>
        </div>
        <div className="bg-customRed rounded-r-xl flex items-center justify-center h-full w-24">
          <TrashIcon className="w-14 text-black" />
        </div>

        <div
          className={`absolute h-12 bottom-0 left-20 w-[calc(100%-181.5px)] bg-customBGDark1 text-sm rounded-b-xl flex items-center px-4 border-2 -z-10 
            ${
              openTab === "open"
                ? "animate-translateDescDown"
                : openTab === "close"
                ? "animate-translateDescUp"
                : ""
            }
          `}
        >
          <p>
            Esta cuenta lleva el registro de la casa de kino y de mi trabajo
          </p>
        </div>
        <div
          className={`absolute -bottom-7 w-full flex items-center justify-center ${
            openTab === "open"
              ? "animate-translateDescDownButton"
              : openTab === "close"
              ? "animate-translateDescUpButton"
              : ""
          }`}
        >
          <div
            className="w-24 h-7 bg-white flex items-center justify-center rounded-b-xl cursor-pointer"
            onClick={() =>
              openTab === "init"
                ? dispatch(setOpenTab("open"))
                : openTab === "close"
                ? dispatch(setOpenTab("open"))
                : dispatch(setOpenTab("close"))
            }
          >
            <ChevronDownIcon
              className={`w-10 text-black ${
                openTab === "open"
                  ? "animate-rotate0_180"
                  : openTab === "close"
                  ? "animate-rotate180_0"
                  : ""
              }`}
            />
          </div>
        </div>
      </div>
      {openModal && (
        <Modal>
          <p>Hola</p>
        </Modal>
      )}
    </div>
  );
};

export default AccountsPage;