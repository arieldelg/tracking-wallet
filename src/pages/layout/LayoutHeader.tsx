// import { useEffect, useState } from "react";
import { HeaderApp } from "../../components";
import { Outlet, useLoaderData } from "react-router-dom";
import { UsersAccount } from "../../interface/walletApp";

const LayoutHeader = () => {
  const { account } = useLoaderData() as { account: UsersAccount };
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   setLoading(false);
  // }, [setLoading]);
  return (
    <section className="layoutMargins grid xl:grid-rows-[80px_auto] 2xl:grid-rows-[90px_auto] 2xl:gap-4">
      <HeaderApp activeAccount={account} />
      <Outlet />
      {/* {loading ? <p>Loading</p> : <Outlet />} */}
    </section>
  );
};

export default LayoutHeader;
