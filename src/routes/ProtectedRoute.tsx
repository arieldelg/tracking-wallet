import { Outlet } from "react-router-dom";
import { ProtectedSideBar } from "./NavigationsBars";
// import { useEffect } from "react";
// import { useWalletStore } from "../hooks";

const ProtectedRoute = () => {
  // const { startApplication } = useWalletStore();

  // useEffect(() => {
  //   startApplication();
  // }, []);

  return (
    <main className="grid grid-cols-[250px_auto] h-screen">
      <ProtectedSideBar />
      <div className="w-full xl:max-w-1920 h-full flex flex-col items-center justify-between place-self-center overflow-auto scrollbar">
        <Outlet />
      </div>
    </main>
  );
};

export default ProtectedRoute;
