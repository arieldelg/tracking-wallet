import { Outlet } from "react-router-dom";
import { LayoutHeader } from "../pages/layout";
import { ProtectedSideBar } from "./NavigationsBars";
import { useEffect } from "react";
import MockBills from "../data/mockDataBills.json";
import { NoteProps, UsersAccount } from "../interface/walletApp";
import MockAccounts from "../data/mockAccounts.json";
import { useWalletStore } from "../hooks";

const ProtectedRoute = () => {
  const { startApplication } = useWalletStore();
  useEffect(() => {
    startApplication({
      Accounts: MockAccounts as UsersAccount[],
      Bills: MockBills as NoteProps[],
    });
  }, [startApplication]);

  return (
    <main className="grid grid-cols-[250px_auto] h-screen">
      <ProtectedSideBar />
      <div className="w-full xl:max-w-1920 h-full flex flex-col items-center justify-between place-self-center overflow-auto scrollbar">
        <LayoutHeader>
          <Outlet />
        </LayoutHeader>
      </div>
    </main>
  );
};

export default ProtectedRoute;
