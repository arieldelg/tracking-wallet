import {
  ChevronDownIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { PropsCardAccounts } from "../../interface/walletApp";

const MyContainerCardAccounts = ({
  openTab,
  idAccount,
  setIdAccount,
  openTabAccounts,
  ...props
}: PropsCardAccounts) => {
  return (
    <div className="w-full h-auto flex flex-col items-center">
      <div className="flex w-full h-20 z-10">
        <div className="h-full w-24 bg-customBlue rounded-l-xl flex items-center justify-center">
          <PencilSquareIcon className="w-14 text-black" />
        </div>
        <div className="flex text-4xl justify-between items-center w-full px-8 bg-customBGDark1 h-full">
          <p>{props.title}</p>
          <p>
            {props.quantity} <span>{props.typeCurrency}</span>
          </p>
        </div>
        <div className="bg-customRed rounded-r-xl flex items-center justify-center h-full w-24">
          <TrashIcon className="w-14 text-black" />
        </div>
      </div>
      <div className="w-[calc(100%-185px)] h-16 relative -top-12 -z-0">
        <div
          className={`h-12 w-full bg-customBGDark1 text-sm rounded-b-xl flex items-center px-4 border-2 
              ${
                openTab === "open" && idAccount === props.id
                  ? "animate-translateDescDown"
                  : openTab === "close" && idAccount === props.id
                  ? "animate-translateDescUp"
                  : ""
              }
            `}
        >
          <p>{props.description}</p>
        </div>
        <div
          className={`w-full flex items-center justify-center  ${
            openTab === "open" && idAccount === props.id
              ? "animate-translateDescDownButton"
              : openTab === "close" && idAccount === props.id
              ? "animate-translateDescUpButton"
              : ""
          }`}
        >
          <div
            className={`w-24 h-7 bg-white flex items-center justify-center rounded-b-xl cursor-pointer `}
            onClick={() => {
              if (props.id !== idAccount && openTab === "open") return;
              if (setIdAccount) setIdAccount(props.id);
              return openTab === "init"
                ? openTabAccounts!("open")
                : openTab === "close"
                ? openTabAccounts!("open")
                : openTabAccounts!("close");
            }}
          >
            <ChevronDownIcon
              className={`w-10 text-black ${
                openTab === "open" && idAccount === props.id
                  ? "animate-rotate0_180"
                  : openTab === "close" && idAccount === props.id
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
