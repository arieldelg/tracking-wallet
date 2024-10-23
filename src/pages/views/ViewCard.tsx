import { useAppSelector } from "../../store/hooks";
import { useState } from "react";
import { ActiveNoteSelector } from "../../store/wallet/walletSlice";
import { MyBillComponent } from "../../components";

const ViewCard = () => {
  const [img, setImg] = useState<string | undefined>(undefined);
  const activeNote = useAppSelector(ActiveNoteSelector);
  return (
    <div>
      <div
        className="relative transition-all h-5/6 max-h-[748px] place-content-center"
        onClick={(e) => e.stopPropagation()}
      >
        <MyBillComponent
          activeNote={activeNote!}
          getImage={setImg}
          nameHeader="New Bill"
          editPathTo={"/newBill"}
        />
        {img && (
          <div className="w-96 h-96 absolute top-[calc(50%-215px)] right-0 -z-10 animate-translateImg bg-customBGDark2 p-2 rounded-r-lg ring-customGreen ring-2 xl:max-2xl:w-64 xl:max-2xl:h-64 xl:max-2xl:top-[calc(50%-135px)]">
            <img src={img} alt="test" className="w-full h-full rounded-lg" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewCard;
