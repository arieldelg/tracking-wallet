import { useWalletStore } from "../../hooks";

const WarningView = () => {
  const { setCloseModalDelete, setDeleteAccount } = useWalletStore();
  return (
    <div className="bg-customBGDark1 rounded-2xl ring-2 px-4 md:px-8 py-5 ultraWide:p-8 text-lg ultraWide:text-xl animate-fadeInBillModal ring-white min-w-[400px] xl:min-w-[600px] ultraWide:min-w-[730px] max-h-[600px] ultraWide:max-h-[750px] h-5/6 flex flex-col ultraWide:justify-evenly justify-evenly w-[400px] space-y-10">
      <h1 className="text-3xl md:text-5xl ultraWide:text-7xl text-center w-full text-red-500">
        Warning!!!
      </h1>
      <div className="text-center text-2xl tracking-widest">
        <p>Are you sure you want to delete your Account?</p>
        <p>
          All the bills inside the Account{" "}
          <span className="text-red-500 font-extrabold text-3xl">
            will be deleted To!!!
          </span>
        </p>
      </div>
      <div className="w-full flex justify-between h-11 gap-4">
        <button
          className="w-52 ultraWide:w-64 h-full bg-customRed rounded-full ring-2 ring-customRed hover:bg-red-500 hover:ring-red-300"
          onClick={() => setCloseModalDelete()}
        >
          Maybe not..
        </button>
        <button
          className="w-52 ultraWide:w-64 h-full bg-customGreen rounded-full ring-2 ring-customGreen hover:bg-green-500 hover:ring-green-300"
          onClick={() => setDeleteAccount()}
        >
          Yes I am Sure!!!
        </button>
      </div>
    </div>
  );
};

export default WarningView;
