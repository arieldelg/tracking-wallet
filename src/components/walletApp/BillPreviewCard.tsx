import { TrashIcon } from "@heroicons/react/24/outline";

type Props = {
  id: string;
  typeCurrency: string;
  title: string;
  note: string;
  typePayment: string;
  quantity: number;
  tag: string;
  date: string;
};

const BillPreviewCard = (props: Props) => {
  return (
    <div
      className={`w-full h-20 ring-2 rounded-2xl shadow-2xl flex gap-4 items-center justify-between pl-7 pr-4 py-3 ${
        props.typeCurrency === "income"
          ? "bg-customGreen ring-customGreen"
          : "bg-customRed ring-customRed"
      }`}
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
      <TrashIcon className="w-12 text-black" />
    </div>
  );
};

export default BillPreviewCard;
