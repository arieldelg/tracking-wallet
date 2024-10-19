import { NavLink } from "react-router-dom";
import { BillPreviewCard, MyNewButton, MyNewEmptySection } from "../components";
import Modal from "../modals/Modal";
import { ViewCard } from "./views";
import { useAppSelector } from "../store/hooks";
import { OpenModalSelector } from "../store/ui/uiSlice";
import { useHeaderName, useWalletStore, useWindowDimensions } from "../hooks";
import { GetNotesDBSelector } from "../store/wallet/walletSlice";

const Home = () => {
  const openModal = useAppSelector(OpenModalSelector);
  const notes = useAppSelector(GetNotesDBSelector);
  const { setHeaderName } = useHeaderName();
  const { deleteNote, reset, setOpenModal } = useWalletStore();
  const { width } = useWindowDimensions();
  return (
    <>
      {/* 
    //* Income and Expense Sections
    */}
      <h2 className="text-4xl pb-6">Income and Expenses</h2>

      <div className="w-full border-black flex  h-[181px] justify-between md:gap-4">
        <div className="w-full md:min-w-56 xl:max-w-72 h-full flex flex-col justify-between">
          <h3 className="text-center text-xl">Today</h3>
          <div className="w-full h-[137px] px-6 py-6 rounded-md ring-1 ring-white flex flex-row  items-center justify-between text-xl bg-[#363A45] shadow-2xl">
            <div className="flex flex-col justify-between items-center h-full">
              <h4>Income</h4>
              <p className="text-green-500">12,000</p>
            </div>
            <div className="flex flex-col justify-between items-center h-full">
              <h4>Expenses</h4>
              <p className="text-red-500">5,000</p>
            </div>
          </div>
        </div>

        <div className="w-full md:min-w-56 xl:max-w-72 h-full flex flex-col justify-between">
          <h3 className="text-center text-xl">Up Coming Income</h3>
          <div className="w-full h-[137px] px-5 py-1 rounded-md ring-1 ring-[#66FF37] flex flex-col justify-evenly text-xl bg-[#78C760] shadow-2xl">
            <div className="flex justify-between items-center w-full">
              <h4>Nomina</h4>
              <p>3,500</p>
            </div>
            <div className="flex  justify-between items-center w-full">
              <h4>Renta Kino</h4>
              <p>2,000</p>
            </div>
            <div className="flex  justify-between items-center w-full">
              <h4>Venta Compu</h4>
              <p>1,500</p>
            </div>
            <p className="text-sm text-center">+ show more...</p>
          </div>
        </div>

        <div className="w-full md:min-w-56 xl:max-w-72 h-full flex flex-col justify-between">
          <h3 className="text-center text-xl">Up Coming Income</h3>
          <div className="w-full h-[137px] px-5 py-1 rounded-md ring-1 ring-[#FF3737] flex flex-col justify-evenly text-xl bg-[#FB9F9F] shadow-2xl">
            <div className="flex justify-between items-center w-full">
              <h4>Nomina</h4>
              <p>3,500</p>
            </div>
            <div className="flex  justify-between items-center w-full">
              <h4>Renta Kino</h4>
              <p>2,000</p>
            </div>
            <div className="flex  justify-between items-center w-full">
              <h4>Venta Compu</h4>
              <p>1,500</p>
            </div>
            <p className="text-sm text-center">+ show more...</p>
          </div>
        </div>

        <div className="w-full md:min-w-56 xl:max-w-72 h-full flex flex-col justify-between">
          <h3 className="text-center text-xl">Last 30 Days</h3>
          <div className="w-full h-[137px] px-6 py-6 rounded-md ring-1 ring-white flex flex-row  items-center justify-between text-xl bg-[#363A45] shadow-2xl">
            <div className="flex flex-col justify-between items-center h-full">
              <h4>Income</h4>
              <p className="text-green-500">12,000</p>
            </div>
            <div className="flex flex-col justify-between items-center h-full">
              <h4>Expenses</h4>
              <p className="text-red-500">10,000</p>
            </div>
          </div>
        </div>
      </div>

      <hr className="mt-10 pb-6" />

      {/* 
        //* Bills Section
    */}
      <div className="w-full flex items-center justify-between pb-6">
        <h2 className="text-4xl">Bills</h2>
        <MyNewButton reset={reset} headerName="New Bill" to="newbill" />
      </div>
      {notes?.length !== 0 ? (
        <div>
          <div className="grid grid-cols-2 w-full h-48  items-center place-content-between gap-x-14 2xl:text-base text-sm ultraWide:text-xl">
            {notes?.slice(0, 4).map(({ ...props }) => (
              <BillPreviewCard
                props={props}
                key={props._id}
                onClick={setOpenModal}
                deleteNote={deleteNote}
                width={width}
              />
            ))}
          </div>
          <div className="w-full text-center pt-6">
            <NavLink
              to={"bills"}
              onClick={() => {
                setHeaderName("Bills");
              }}
            >
              + show more...
            </NavLink>
          </div>
        </div>
      ) : (
        <MyNewEmptySection label="Theres nothing here yet... Try adding a new Bill" />
      )}

      {openModal && (
        <Modal>
          <ViewCard />
        </Modal>
      )}

      <hr className="mt-4 pb-6" />

      {/* 
      //* Graphic section
      */}
      <h2 className="text-4xl pb-6">Graphs</h2>
    </>
  );
};

export default Home;
