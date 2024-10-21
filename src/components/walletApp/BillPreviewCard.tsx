import { TrashIcon } from "@heroicons/react/24/outline";
import { NoteProps } from "../../interface/walletApp";
import { CSSProperties } from "react";
import { twMerge } from "tailwind-merge";
import { date } from "../../helpers/wallet";

interface Props {
  props: NoteProps;
  onClick?: ({
    note,
    allNote,
  }: {
    note?: NoteProps;
    allNote?: NoteProps[];
  }) => void;
  deleteNote?: (id: string) => void;
  style?: CSSProperties;
  className?: string;
  width: number;
}

const BillPreviewCard = ({
  props,
  onClick,
  deleteNote,
  style,
  className,
  width,
}: Props) => {
  const classes = twMerge(`
    w-full 
    h-20 
    ring-2 
    rounded-2xl 
    shadow-2xl 
    flex 
    gap-4 
    items-center 
    justify-between 
    pl-7 
    pr-4 
    py-3 
    cursor-pointer 
    ${className ?? ""}
    `);

  return (
    <div
      style={style}
      className={`${classes} ${
        props?.typeCurrency === "income"
          ? "bg-customGreen ring-customGreen"
          : "bg-customRed ring-customRed"
      }`}
      onClick={() => {
        if (onClick) onClick({ note: props });
      }}
    >
      <div className="flex justify-between items-center w-full max-w-[600px] h-full xl:max-2xl:text-[14px] text-start gap-0 tracking-tighter">
        <div className="h-full flex flex-col justify-between overflow-hidden text-start w-auto">
          <h3 className="first-letter:capitalize">{props?.title}</h3>
          <p className="first-letter:capitalize">
            {width <= 1366 ? (
              <span>{props?.note.slice(0, 11).trimEnd()}...</span>
            ) : (
              <span>{props?.note.slice(0, 18).trimEnd()}...</span>
            )}
          </p>
        </div>
        <div className="h-full flex flex-col justify-between text-start">
          <h3 className="first-letter:capitalize">{props?.typePayment}</h3>
          <p>
            {props?.quantity} {props.currency}
          </p>
        </div>
        <div className="h-full flex flex-col justify-between">
          <h3>Tag</h3>
          <p>{props?.tag.slice(0, 10)}...</p>
        </div>
        <div className="h-full flex flex-col justify-between">
          <h3>Date</h3>
          <p>{date({ props: props.date })}</p>
        </div>
      </div>
      <TrashIcon
        className="w-10 text-red-800"
        onClick={(e) => {
          e.stopPropagation();
          if (deleteNote) deleteNote(props._id);
        }}
      />
    </div>
  );
};

export default BillPreviewCard;
