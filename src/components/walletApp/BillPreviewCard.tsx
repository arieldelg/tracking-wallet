import { TrashIcon } from "@heroicons/react/24/outline";
import { useAppDispatch } from "../../store/hooks";
import { setOpen } from "../../store/ui/uiSlice";
import { NoteProps } from "../../interface/walletApp";
import {
  startDeleteNote,
  startSavingActiveNote,
} from "../../store/wallet/thunk";

const BillPreviewCard = (props: NoteProps) => {
  const dispatch = useAppDispatch();
  return (
    <div
      className={`w-full h-20 ring-2 rounded-2xl shadow-2xl flex gap-4 items-center justify-between pl-7 pr-4 py-3 cursor-pointer ${
        props.typeCurrency === "income"
          ? "bg-customGreen ring-customGreen"
          : "bg-customRed ring-customRed"
      }`}
      onClick={() => {
        dispatch(setOpen());
        dispatch(startSavingActiveNote(props));
      }}
    >
      <div className="flex justify-between items-center text-center w-full max-w-[600px] h-full">
        <div className="h-full flex flex-col justify-between overflow-hidden text-start ">
          <h3 className="first-letter:capitalize">{props.title}</h3>
          <p className="text-ellipsis first-letter:capitalize">
            {props.note.slice(0, 18).trimEnd()}...
          </p>
        </div>
        <div className="h-full flex flex-col justify-between">
          <h3 className="first-letter:capitalize">{props.typePayment}</h3>
          <p>{props.quantity}</p>
        </div>
        <div className="h-full flex flex-col justify-between">
          <h3>Tag</h3>
          <p>{props.tag}</p>
        </div>
        <div className="h-full flex flex-col justify-between">
          <h3>Date</h3>
          <p>{props.date}</p>
        </div>
      </div>
      <TrashIcon
        className="w-12 text-black"
        onClick={(e) => {
          e.stopPropagation();
          dispatch(startDeleteNote(props.id));
        }}
      />
    </div>
  );
};

export default BillPreviewCard;
