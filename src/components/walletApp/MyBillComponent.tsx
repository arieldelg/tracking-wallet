import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { NoteProps } from "../../interface/walletApp";
import { useNavigate } from "react-router-dom";
import { useHeaderName } from "../../hooks";

type Props = {
  activeNote: NoteProps;
  nameHeader?: string;
  closeModal?: () => void;
  getImage?: (value: string) => void;
};

const MyBillComponent = ({
  activeNote,
  nameHeader = "New Bill",
  getImage,
}: Props) => {
  const navigate = useNavigate();
  const { setHeaderName } = useHeaderName();

  const saveImage = (img: string) => {
    if (getImage) return getImage(img);
  };
  return (
    <div
      className={`bg-customBGDark1 rounded-2xl ring-2 px-8 py-5 ultraWide:p-8 w-full h-full max-h-[790px] max-w-[600px] ultraWide:max-w-[730px] text-lg ultraWide:text-xl relative flex flex-col justify-between animate-fadeInBillModal ${
        activeNote?.typeCurrency === "income"
          ? "ring-customGreen"
          : "ring-customRed"
      }`}
    >
      <PencilSquareIcon
        className="w-10 absolute top-3 right-3 text-white cursor-pointer"
        onClick={() => {
          setHeaderName(nameHeader);
          navigate("/newBill");
        }}
      />
      <h1 className="text-3xl ultraWide:text-4xl text-center first-letter:capitalize">
        {activeNote?.typeCurrency}
      </h1>
      <div className="flex flex-col justify-center items-center h-auto gap-2">
        <p className="text-4xl ultraWide:text-6xl">{activeNote?.quantity}</p>
        <p className="text-2xl ultraWide:text-4xl">{activeNote?.currency}</p>
      </div>
      <div className="grid grid-flow-col items-start gap-10 pt-2">
        {/* 
      //* seccion 1 ( type, date, tag )
      */}
        <div className="space-y-3">
          <div className="gap-3 h-auto flex flex-col justify-between">
            <h2 className="first-letter:capitalize">type</h2>
            <p className="text-[#7C7676] first-letter:capitalize">
              {activeNote?.typePayment}
            </p>
          </div>
          <div className="gap-3 h-auto flex flex-col justify-between">
            <h2 className="first-letter:capitalize">date</h2>
            <p className="text-[#7C7676] ">{activeNote?.date}</p>
          </div>
          <div className="gap-3 h-auto flex flex-col justify-between">
            <h2 className="first-letter:capitalize">tag</h2>
            <p className="text-[#7C7676] first-letter:capitalize">
              {activeNote?.tag}
            </p>
          </div>
        </div>
        {/* 
    //* seccion 2 ( title y note )
    */}
        <div className="space-y-1">
          <div className="gap-2 h-auto flex flex-col justify-between">
            <h2 className="first-letter:capitalize">title</h2>
            <p className="text-[#7C7676] first-letter:capitalize">
              {activeNote?.title}
            </p>
          </div>
          <div className="h-auto gap-2 flex flex-col justify-between">
            <h2 className="first-letter:capitalize">{activeNote?.note}</h2>
            <p className="text-[#7C7676] first-letter:capitalize">
              cobre en mi chamba la primera paga de la semana
            </p>
          </div>
          {/* 
      //* imagenes
      */}

          <div
            className={`max-w-[450px] ultraWide:w-full grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 ultraWide:gap-x-2 gap-y-4 items-center justify-items-center overflow-auto scrollbar p-2 rounded-md  ${
              activeNote?.images?.length === 0
                ? "h-[80px] ultraWide:h-[130px]"
                : "h-[150px] ultraWide:h-[220px]"
            }`}
          >
            {activeNote?.images?.map(({ id, img }) => (
              <img
                key={id}
                src={img}
                alt="headphones"
                className="w-[100px] h-[100px] ultraWide:w-[140px] ultraWide:h-[140px] rounded-lg cursor-pointer"
                onClick={() => saveImage(img)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBillComponent;
