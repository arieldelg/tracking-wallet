import {
  ChevronDownIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { OpenAccountTabSelector, setOpenTab } from "../../store/ui/uiSlice";

const MyContainerCardAccounts = () => {
  const openTab = useAppSelector(OpenAccountTabSelector);
  const dispatch = useAppDispatch();
  return (
    <div className="w-full h-auto flex flex-col items-center">
      <div className="flex w-full h-20 z-10">
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
      </div>
      <div className="w-[calc(100%-181.5px)] h-16 relative -top-12 -z-0">
        <div
          className={`h-12 w-full bg-customBGDark1 text-sm rounded-b-xl flex items-center px-4 border-2 
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
          className={`w-full flex items-center justify-center ${
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
    </div>
  );
};

export default MyContainerCardAccounts;
