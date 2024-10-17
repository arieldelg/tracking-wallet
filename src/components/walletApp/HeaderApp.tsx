import { twMerge } from "tailwind-merge";
import { useAppSelector } from "../../store/hooks";
import { useWalletStore } from "../../hooks";

const HeaderApp = ({ classNameLine }: { classNameLine?: string }) => {
  const headerName = useAppSelector((state) => state.ui.headerName);
  const { activeAccountMemo } = useWalletStore();
  const className = twMerge(`
    mt-1 pb-4 ${classNameLine}
    `);
  return (
    <header className="flex flex-col">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-3xl xl:text-5xl">{headerName}</h1>
        <div className="text-right 2xl:text-3xl md:max-2xl:text-xl">
          <h2 className="capitalize">{activeAccountMemo({})?.title}</h2>
          <p>
            {activeAccountMemo({})?.quantity}
            <span>{activeAccountMemo({})?.currency}</span>
          </p>
        </div>
      </div>
      <hr className={className} />
    </header>
  );
};

export default HeaderApp;
