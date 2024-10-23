import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { NoteProps } from "../../interface/walletApp";
import { useNavigate } from "react-router-dom";
import { useHeaderName } from "../../hooks";
import { date } from "../../helpers/wallet";

type Props = {
  activeNote: NoteProps;
  nameHeader?: string;
  getImage?: (value: string) => void;
  editPathTo?: string;
};

const MyBillComponent = ({
  activeNote,
  nameHeader = "New Bill",
  getImage,
  editPathTo,
}: Props) => {
  const navigate = useNavigate();
  const { setHeaderName } = useHeaderName();

  const saveImage = (img: string) => {
    if (getImage) return getImage(img);
  };
  return (
    <div
      className={`bg-customBGDark1 rounded-2xl ring-2 px-8 py-5 w-full h-full max-h-[750px] max-w-[800px] text-lg relative flex flex-col justify-between animate-fadeInBillModal xl:max-2xl:px-5 xl:h-[510px] xl:w-[500px] 2xl:w-[550px] 2xl:h-[600px] ultraWide:px-7 ultraWide:py-3 ultraWide:h-[650px] ultraWide:w-[650px] ultraWide:text-xl 2xUltraWide:max-h-[680px]  ${
        activeNote?.typeCurrency === "income"
          ? "ring-customGreen"
          : "ring-customRed"
      }`}
    >
      <PencilSquareIcon
        className="w-10 absolute top-3 right-3 text-white cursor-pointer"
        onClick={() => {
          setHeaderName(nameHeader);
          navigate(editPathTo as string);
        }}
      />
      <h1 className="text-xl ultraWide:text-4xl text-center first-letter:capitalize">
        {activeNote?.typeCurrency}
      </h1>
      <div className="flex flex-col justify-center items-center h-auto gap-2">
        <p className="text-4xl ultraWide:text-6xl">{activeNote?.quantity}</p>
        <p className="text-2xl ultraWide:text-4xl">{activeNote?.currency}</p>
      </div>
      <div className="grid grid-flow-col xl:grid-cols-[100px_auto] ultraWide:grid-cols-[150px_auto] items-start gap-10 pt-2">
        {/* 
      // * seccion 1 ( type, date, tag )
      */}
        <div className="space-y-3 xl:text-[16px] 2xl:text-lg  ultraWide:text-xl leading-4">
          <div className="gap-3 h-auto flex flex-col justify-between">
            <h2 className="first-letter:capitalize">type</h2>
            <p className="text-[#7C7676] first-letter:capitalize">
              {activeNote?.typePayment}
            </p>
          </div>
          <div className="gap-3 h-auto flex flex-col justify-between">
            <h2 className="first-letter:capitalize">date</h2>
            <p className="text-[#7C7676] ">
              {date({ props: activeNote.date })}
            </p>
          </div>
          <div className="gap-3 h-auto flex flex-col justify-between">
            <h2 className="first-letter:capitalize">tag</h2>
            <p className="text-[#7C7676] first-letter:capitalize">
              {activeNote?.tag}
            </p>
          </div>
        </div>
        {/* 
    // * seccion 2 ( title y note )
    */}
        <div className="2xl:space-y-1 xl:text-[16px] xl:tracking-tight 2xl:text-lg ultraWide:text-xl leading-6 xl:max-2xl:w-[256px]">
          <div className="gap-2 h-auto flex flex-col justify-between">
            <h2 className="first-letter:capitalize">title</h2>
            <p className="text-[#7C7676] first-letter:capitalize">
              {activeNote?.title}
            </p>
          </div>
          <div className="h-auto gap-2 flex flex-col justify-between">
            <h2 className="first-letter:capitalize">Note</h2>
            <p className="text-[#7C7676] first-letter:capitalize leading-4 ultraWide:leading-8">
              {activeNote?.note}
            </p>
          </div>
          {/* 
      //* imagenes
      */}

          <div
            className={`max-w-[450px] ultraWide:w-full grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 py-2 ultraWide:gap-x-2 gap-y-4 items-center justify-items-center overflow-auto scrollbar rounded-md  ${
              activeNote?.images?.length === 0
                ? "h-[80px] ultraWide:h-[130px]"
                : "xl:h-[170px] 2xl:h-[210px] ultraWide:h-[200px] 2xUltraWide:h-[220px]"
            }`}
          >
            {activeNote?.images?.map(({ id, httpURL }) => (
              <img
                key={id}
                src={httpURL}
                alt="headphones"
                className="w-[80px] h-[80px]  2xl:w-[100px] 2xl:h-[100px] ultraWide:w-[120px] ultraWide:h-[120px] 2xUltraWide:h-[140px] 2xUltraWide:w-[140px] rounded-lg cursor-pointer"
                onClick={() => saveImage(httpURL)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBillComponent;
