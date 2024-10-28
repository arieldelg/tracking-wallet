import { useEffect, useState } from "react";
import { BillPreviewCard, MyBillComponent, MyNewButton } from "../components";
import { useHeaderName, useWalletStore, useWindowDimensions } from "../hooks";
import { filterBy, keyWordFilter } from "../helpers/wallet";
import { useLoaderData, useNavigation } from "react-router-dom";
import { NoteProps } from "../interface/walletApp";

const BillsPage = () => {
  const navegation = useNavigation();
  const { notes, title, activeNoteLoader } = useLoaderData() as {
    notes: NoteProps[];
    title: string;
    activeNoteLoader: NoteProps;
  };
  console.log(navegation);
  const { setHeaderName } = useHeaderName();
  const { deleteNote, setActiveNote, resetNewButton, reset, activeNote } =
    useWalletStore(activeNoteLoader);

  useEffect(() => {
    setHeaderName(title);
  }, [setHeaderName, title]);

  useEffect(() => {
    return setActiveNote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [filter, setFilter] = useState("init");
  const { width } = useWindowDimensions();
  const notesFiltered = filterBy({ notes, filterKeyword: filter });

  return (
    <div className="grid grid-cols-2 gap-4 items-start ">
      {/* 
      //* filter and Bill preview Section
      */}
      <div className="grid grid-rows-[80px_auto]">
        {/* 
        //* filter section
        */}
        <div className="h-full w-full">
          <div className="flex justify-between">
            <h1 className="text-base">Filter By:</h1>
            {keyWordFilter({}) !== "reset" ? (
              <button
                className={
                  keyWordFilter({}) === "reset" ? "text-[#F99A00]" : ""
                }
                onClick={() => {
                  keyWordFilter({ key: "reset" });
                  setFilter("reset");
                }}
              >
                Reset Filter
              </button>
            ) : null}
          </div>
          <div className="grid grid-cols-[auto_110px] gap-6 items-center">
            <div>
              <ul className="flex text-base ultraWide:text-xl justify-between">
                <li>
                  <button
                    onClick={() => {
                      keyWordFilter({ key: "income" });
                      setFilter("income");
                    }}
                    className={`${
                      keyWordFilter({}) === "income" ? "text-[#F99A00]" : ""
                    }`}
                  >
                    Income
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      keyWordFilter({ key: "expense" });
                      setFilter("expense");
                    }}
                    className={`${
                      keyWordFilter({}) === "expense" ? "text-[#F99A00]" : ""
                    }`}
                  >
                    Expense
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      const filterValue =
                        keyWordFilter({}) === ""
                          ? "quantity"
                          : keyWordFilter({}) === "quantity"
                          ? "quantity2"
                          : "quantity";
                      keyWordFilter({ key: filterValue });

                      setFilter(filterValue);
                    }}
                    className={`${
                      keyWordFilter({}) === "quantity"
                        ? "text-[#F99A00]"
                        : keyWordFilter({}) === "quantity2"
                        ? "text-[#F99A00]"
                        : ""
                    }`}
                  >
                    Quantity
                  </button>
                </li>
                <li>Tag</li>
              </ul>
              <hr />
            </div>
            <MyNewButton
              to="/newbill"
              reset={resetNewButton}
              resetFilter={reset}
            />
          </div>
        </div>
        {/* 
        //* Bill Preview section
        */}
        <div
          style={{
            height: "auto",
          }}
          className={`flex flex-col gap-6 xl:max-2xl:gap-4 pt-1 px-[2px] overflow-auto scrollbar xl:max-h-[374px] 2xl:max-h-[477px] ultraWide:max-h-[479px] 2xUltraWide:max-h-[640px] pb-2`}
        >
          {notesFiltered.notes.map(({ ...props }) => (
            <BillPreviewCard
              props={props}
              key={props._id}
              deleteNote={deleteNote}
              onClick={setActiveNote}
              width={width}
              className={`${
                activeNote?._id === props._id ? "animate-translateCard" : ""
              } sm:max-w-[380px] md:max-w-[400px] lg:max-w-[450px] xl:max-w-[480px] 2xl:max-w-[565px] ultraWide:max-w-[700px] xl:max-2xl:px-3 h-auto xl:max-2xl:py-4 max-h-[84px]`}
            />
          ))}
        </div>
      </div>
      {/* 
      //* Bill Component View Section
      */}
      {activeNote ? (
        <MyBillComponent
          activeNote={activeNote}
          editPathTo={"/newBill"}
          nameHeader="Edit Bill"
          classNameContainer="xl:max-2xl:px-5 xl:max-h-[454px] 2xl:w-[550px] 2xl:max-h-[558px]"
          style={{ height: "100%" }}
        />
      ) : // : notesFiltered.notes.length > 0 ? (
      //   <MyBillComponent
      //     activeNote={notesFiltered.firstValues}
      //     classNameContainer="xl:max-2xl:px-5 xl:max-h-[454px] 2xl:w-[550px] 2xl:max-h-[558px]"
      //     style={{ height: "100%" }}
      //   />
      // )
      null}
    </div>
  );
};

export default BillsPage;
