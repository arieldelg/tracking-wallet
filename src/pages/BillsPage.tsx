import { useEffect } from "react";
import { BillPreviewCard, MyBillComponent, MyNewButton } from "../components";
import { useHeaderName, useWalletStore, useWindowDimensions } from "../hooks";
import { keyWordFilter } from "../helpers/wallet";

const BillsPage = () => {
  const { height, width } = useWindowDimensions();
  const {
    deleteNote,
    setActiveNote,
    reset,
    setFilter,
    activeNote,
    notes,
    filterBy,
  } = useWalletStore();
  const { setHeaderName } = useHeaderName();
  useEffect(() => {
    setActiveNote({ allNote: notes });
    setHeaderName("Bill Page");
  }, [notes, setActiveNote, setHeaderName]);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="w-full space-y-5">
        <div>
          <div className="flex justify-between">
            <h1 className="text-base">Filter By:</h1>
            {keyWordFilter({}) !== "reset" ? (
              <button
                className={
                  keyWordFilter({}) === "reset" ? "text-[#F99A00]" : ""
                }
                onClick={() => {
                  setFilter({ props: "reset" });
                }}
              >
                Reset Filter
              </button>
            ) : null}
          </div>
          <div className="flex items-center gap-4">
            <div className="w-[540px]">
              <ul className="flex text-base ultraWide:text-xl justify-between">
                <li>
                  <button
                    onClick={() => {
                      setFilter({ props: "income" });
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
                      setFilter({ props: "expense" });
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
                      setFilter({ props: filterValue });
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
            <MyNewButton to="/newbill" reset={reset} />
          </div>
        </div>
        <div
          style={{
            height: height - 280,
          }}
          className={`flex flex-col gap-6 py-4 px-[2px] overflow-auto scrollbar `}
        >
          {filterBy()?.notes.map(({ ...props }) => (
            <BillPreviewCard
              props={props}
              key={props._id}
              deleteNote={deleteNote}
              onClick={setActiveNote}
              width={width}
              className={`${
                activeNote?._id === props._id ? "animate-translateCard" : ""
              } sm:max-w-[380px] md:max-w-[400px] lg:max-w-[450px] xl:max-w-[480px] 2xl:max-w-[565px] ultraWide:max-w-[700px] xl:max-2xl:px-4 h-auto xl:max-2xl:py-4`}
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
          <MyBillComponent
            activeNote={activeNote}
            editPathTo={"/newBill"}
            nameHeader="Edit Bill"
          />
        ) : filterBy().notes.length > 0 ? (
          <MyBillComponent activeNote={filterBy().firstValues} />
        ) : null}
      </div>
    </div>
  );
};

export default BillsPage;
