import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <section className="">
      <h1 className="text-5xl">Dashboard</h1>

      <h2>Registros</h2>
      <hr />

      <NavLink to="/newBill">agrega un nuevo registro</NavLink>

      <div className="flex flex-col text-sm w-max px-4 py-1 ring-2 ring-white rounded-md bg-[#242424]">
        <h2>mi primer registro</h2>
        <div className="flex space-x-4">
          <div className="flex flex-row gap-2">
            <p>cantidad:</p>
            <p>-200</p>
          </div>
          <div className="flex flex-row gap-2">
            <p>description:</p>
            <p>papitas</p>
          </div>
          <div className="flex flex-row gap-2">
            <p>cuenta:</p>
            <p>Nomina</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
