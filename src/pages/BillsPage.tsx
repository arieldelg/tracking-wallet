import { useEffect } from "react";
import { BillPreviewCard, MyBillComponent, MyNewButton } from "../components";
import { useFilterData, useWalletStore, useWindowDimensions } from "../hooks";

const BillsPage = () => {
  const { height } = useWindowDimensions();
  const {
    deleteNote,
    setActiveNote,
    reset,
    setFilter,
    filter,
    activeNote,
    notes,
  } = useWalletStore();
  const { filterBy, filterNote } = useFilterData({
    data: notes,
    initiValueFilter: filter,
    getFirstValueFilter: setActiveNote,
  });
  useEffect(() => {
    if (!activeNote) return setActiveNote(filterNote[0]);
  }, [activeNote, filterNote, setActiveNote]);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="w-full space-y-5">
        <div>
          <h1 className="text-base">Filter By:</h1>
          <div className="flex items-center gap-4">
            <div className="w-[540px]">
              <ul className="flex text-base ultraWide:text-xl justify-between">
                <li>
                  <button
                    onClick={() => {
                      setFilter("income");
                      filterBy({ value: "income", activeFirstValue: true });
                    }}
                  >
                    Income
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setFilter("expense");
                      filterBy({ value: "expense", activeFirstValue: true });
                    }}
                  >
                    Expense
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      const filterValue =
                        filter === ""
                          ? "quantity"
                          : filter === "quantity"
                          ? "quantity2"
                          : "quantity";
                      setFilter(filterValue);
                      filterBy({
                        value: filterValue,
                        activeFirstValue: true,
                      });
                    }}
                  >
                    Quantity
                  </button>
                </li>
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
          {filterNote?.map(({ ...props }) => (
            <BillPreviewCard
              props={props}
              key={props.id}
              deleteNote={deleteNote}
              onClick={setActiveNote}
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
          <MyBillComponent activeNote={activeNote!} editPathTo={"/newBill"} />
        ) : filterNote.length > 0 ? (
          <MyBillComponent activeNote={filterNote[0]} />
        ) : null}
      </div>
    </div>
  );
};

export default BillsPage;
