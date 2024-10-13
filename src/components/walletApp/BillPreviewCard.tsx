import { TrashIcon } from "@heroicons/react/24/outline";
import { NoteProps } from "../../interface/walletApp";
import { CSSProperties } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  props: NoteProps;
  onClick?: (note: NoteProps) => void;
  deleteNote?: (id: string) => void;
  style?: CSSProperties;
  className?: string;
}

const BillPreviewCard = ({
  props,
  onClick,
  deleteNote,
  style,
  className,
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
        if (onClick) onClick(props);
      }}
    >
      <div className="flex justify-between items-center text-center w-full max-w-[600px] h-full">
        <div className="h-full flex flex-col justify-between overflow-hidden text-start ">
          <h3 className="first-letter:capitalize">{props?.title}</h3>
          <p className="text-ellipsis first-letter:capitalize">
            {props?.note.slice(0, 18).trimEnd()}...
          </p>
        </div>
        <div className="h-full flex flex-col justify-between">
          <h3 className="first-letter:capitalize">{props?.typePayment}</h3>
          <p>{props?.quantity}</p>
        </div>
        <div className="h-full flex flex-col justify-between">
          <h3>Tag</h3>
          <p>{props?.tag}</p>
        </div>
        <div className="h-full flex flex-col justify-between">
          <h3>Date</h3>
          <p>{props?.date}</p>
        </div>
      </div>
      <TrashIcon
        className="w-12 text-black"
        onClick={(e) => {
          e.stopPropagation();
          if (deleteNote) deleteNote(props.id);
        }}
      />
    </div>
  );
};

export default BillPreviewCard;
