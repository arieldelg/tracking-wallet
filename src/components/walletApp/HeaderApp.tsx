import { useAppSelector } from "../../store/hooks";
import { activeAccountHelper } from "../../helpers/wallet";

const HeaderApp = () => {
  const headerName = useAppSelector((state) => state.ui.headerName);
  return (
    <header className="flex flex-col">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-3xl xl:text-5xl">{headerName}</h1>
        <div className="text-right 2xl:text-3xl md:max-2xl:text-xl">
          <h2 className="capitalize">{activeAccountHelper({})?.title}</h2>
          <p>
            {activeAccountHelper({})?.quantity}
            <span>{activeAccountHelper({})?.currency}</span>
          </p>
        </div>
      </div>
      <hr />
    </header>
  );
};

export default HeaderApp;
