import { BillPreviewCard, MyBillComponent, MyNewButton } from "../components";
import { useWalletStore, useWindowDimensions } from "../hooks";
import { useAppSelector } from "../store/hooks";
import {
  ActiveNoteSelector,
  GetNotesDBSelector,
} from "../store/wallet/walletSlice";

const BillsPage = () => {
  const notes = useAppSelector(GetNotesDBSelector);
  const activeNote = useAppSelector(ActiveNoteSelector);
  const { height } = useWindowDimensions();
  const { deleteNote, setOpenBill, reset } = useWalletStore();
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="w-full space-y-5">
        <div>
          <h1 className="text-base">Filter By:</h1>
          <div className="flex items-center gap-4">
            <div className="w-[540px]">
              <ul className="flex text-base ultraWide:text-xl justify-between">
                <li>Income</li>
                <li>Expense</li>
                <li>Quantity</li>
                <li>Tag</li>
              </ul>
              <hr />
            </div>
            <MyNewButton headerName="Edit" to="/newbill" reset={reset} />
          </div>
        </div>
        <div
          style={{
            height: height - 280,
          }}
          className={`flex flex-col gap-6 py-4 px-[2px] overflow-auto scrollbar `}
        >
          {notes?.map(({ ...props }) => (
            <BillPreviewCard
              props={props}
              key={props.id}
              deleteNote={deleteNote}
              onClick={setOpenBill}
              className={`${
                activeNote?.id === props.id ? "animate-translateCard" : ""
              } sm:max-w-[565px] ultraWide:max-w-[700px]`}
            />
          ))}
        </div>
      </div>
      <div
        style={{
          height: height - 190,
        }}
        className="place-content-center h-full"
      >
        {activeNote ? (
          <MyBillComponent activeNote={activeNote!} />
        ) : (
          <MyBillComponent activeNote={notes[0]} />
        )}
      </div>
    </div>
  );
};

export default BillsPage;
