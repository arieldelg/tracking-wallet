import {
  ChevronDownIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { PropsCardAccounts } from "../../interface/walletApp";
import { useRef } from "react";

const MyContainerCardAccounts = ({
  toogleClass,
  setActive,
  active,
  ...props
}: PropsCardAccounts) => {
  const divRef = useRef<HTMLDivElement | null>(null);
  return (
    <div className="w-full h-auto flex flex-col items-center">
      <div className="flex w-full h-20 z-10">
        <div className="h-full w-24 bg-customBlue rounded-l-xl flex items-center justify-center cursor-pointer">
          <PencilSquareIcon className="w-14 text-black" />
        </div>
        <div
          className={`flex text-4xl justify-between items-center w-full px-8 bg-customBGDark1 h-full cursor-pointer ${
            active ? "text-green-400" : ""
          }`}
          onClick={() => {
            if (setActive) setActive(props.id);
          }}
        >
          <p>{props.title}</p>
          <p>
            {props.quantity} <span>{props.typeCurrency}</span>
          </p>
        </div>
        <div className="bg-customRed rounded-r-xl flex items-center justify-center h-full w-24 cursor-pointer">
          <TrashIcon className="w-14 text-black" />
        </div>
      </div>

      {/* 
    //* dropdown menu
    */}

      <div
        className="w-[calc(100%-185px)] h-16 relative -top-12 -z-0"
        ref={divRef}
      >
        <div
          className={`DropDownMenu h-12 w-full bg-customBGDark1 text-sm rounded-b-xl flex items-center px-4 border-2`}
        >
          <p>{props.description}</p>
        </div>
        <div
          className={`DropDownMenuButton w-full flex items-center justify-center`}
        >
          <div
            className={`w-24 h-7 bg-white flex items-center justify-center rounded-b-xl cursor-pointer `}
            onClick={(e) => {
              e.stopPropagation();

              if (toogleClass) toogleClass(divRef.current);
            }}
          >
            <ChevronDownIcon className={`ArrowMenu w-10 text-black`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyContainerCardAccounts;
