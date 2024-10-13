import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useState } from "react";
import { ActiveNoteSelector } from "../../store/wallet/walletSlice";
import { setClose } from "../../store/ui/uiSlice";
import { MyBillComponent } from "../../components";

const ViewCard = () => {
  const [img, setImg] = useState<string | undefined>(undefined);
  const activeNote = useAppSelector(ActiveNoteSelector);
  const dispatch = useAppDispatch();
  const closeModal = () => {
    dispatch(setClose());
  };
  return (
    <div
      className="relative transition-all h-5/6 place-content-center"
      onClick={(e) => e.stopPropagation()}
    >
      <MyBillComponent
        activeNote={activeNote!}
        getImage={setImg}
        nameHeader="New Bill"
        closeModal={closeModal}
      />
      {img && (
        <div className="w-96 h-96 absolute top-[calc(50%-215px)] right-0 -z-10 animate-translateImg bg-customBGDark2 p-2 rounded-r-lg ring-customGreen ring-2">
          <img src={img} alt="test" className="w-full h-full rounded-lg" />
        </div>
      )}
    </div>
  );
};

export default ViewCard;
