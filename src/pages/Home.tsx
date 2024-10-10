import { NavLink } from "react-router-dom";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { HeaderApp } from "../components";

const Home = () => {
  return (
    <section className="layoutMargins">
      <HeaderApp title="Dashboard" />

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

      <div className="w-full flex items-center justify-between pb-6">
        <h2 className="text-4xl">Bills</h2>
        <NavLink
          className="w-24 h-9 bg-teal-500 rounded-full flex items-center justify-between text-xl px-4"
          to={"newBill"}
        >
          <PlusIcon className="w-6" />
          <p>New</p>
        </NavLink>
      </div>

      <div className="grid grid-cols-2 w-full h-48  items-center place-content-between gap-x-14 2xl:text-lg text-sm">
        <div className="bg-customGreen w-full h-20 ring-2 ring-customGreen rounded-2xl shadow-2xl flex gap-2 items-center justify-between px-7 py-3">
          <div className="flex justify-between items-center text-center w-full max-w-[600px] h-full   ">
            <div className="h-full flex flex-col justify-between">
              <h3>Mi Primer Registro</h3>
              <p>Cobre en mi Trabajo</p>
            </div>
            <div className="h-full flex flex-col justify-between">
              <h3>Income</h3>
              <p>2,500</p>
            </div>
            <div className="h-full flex flex-col justify-between">
              <h3>Tag</h3>
              <p>Casa</p>
            </div>
            <div className="h-full flex flex-col justify-between">
              <h3>Date</h3>
              <p>10/9/2024</p>
            </div>
          </div>
          <TrashIcon className="w-12 text-black" />
        </div>

        <div className="bg-customRed w-full h-20 ring-2 ring-customRed rounded-2xl shadow-2xl flex gap-2 items-center justify-between px-7 py-3">
          <div className="flex justify-between items-center text-center w-full max-w-[600px] h-full   ">
            <div className="h-full flex flex-col justify-between">
              <h3>Mi Primer Registro</h3>
              <p>Cobre en mi Trabajo</p>
            </div>
            <div className="h-full flex flex-col justify-between">
              <h3>Income</h3>
              <p>2,500</p>
            </div>
            <div className="h-full flex flex-col justify-between">
              <h3>Tag</h3>
              <p>Casa</p>
            </div>
            <div className="h-full flex flex-col justify-between">
              <h3>Date</h3>
              <p>10/9/2024</p>
            </div>
          </div>
          <TrashIcon className="w-12 text-black" />
        </div>

        <div className="bg-customRed w-full h-20 ring-2 ring-customRed rounded-2xl shadow-2xl flex gap-2 items-center justify-between px-7 py-3">
          <div className="flex justify-between items-center text-center w-full max-w-[600px] h-full   ">
            <div className="h-full flex flex-col justify-between">
              <h3>Mi Primer Registro</h3>
              <p>Cobre en mi Trabajo</p>
            </div>
            <div className="h-full flex flex-col justify-between">
              <h3>Income</h3>
              <p>2,500</p>
            </div>
            <div className="h-full flex flex-col justify-between">
              <h3>Tag</h3>
              <p>Casa</p>
            </div>
            <div className="h-full flex flex-col justify-between">
              <h3>Date</h3>
              <p>10/9/2024</p>
            </div>
          </div>
          <TrashIcon className="w-12 text-black" />
        </div>

        <div className="bg-customGreen w-full h-20 ring-2 ring-customGreen rounded-2xl shadow-2xl flex gap-2 items-center justify-between px-7 py-3">
          <div className="flex justify-between items-center text-center w-full max-w-[600px] h-full   ">
            <div className="h-full flex flex-col justify-between">
              <h3>Mi Primer Registro</h3>
              <p>Cobre en mi Trabajo</p>
            </div>
            <div className="h-full flex flex-col justify-between">
              <h3>Income</h3>
              <p>2,500</p>
            </div>
            <div className="h-full flex flex-col justify-between">
              <h3>Tag</h3>
              <p>Casa</p>
            </div>
            <div className="h-full flex flex-col justify-between">
              <h3>Date</h3>
              <p>10/9/2024</p>
            </div>
          </div>
          <TrashIcon className="w-12 text-black" />
        </div>
      </div>

      <div className="w-full text-center pt-6">
        <NavLink to={"bills"}>+ show more...</NavLink>
      </div>

      <hr className="mt-6 pb-6" />

      <h2 className="text-4xl pb-6">Graphs</h2>
    </section>
  );
};

export default Home;
