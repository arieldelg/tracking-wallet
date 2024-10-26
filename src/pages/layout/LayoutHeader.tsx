import { useEffect, useState } from "react";
import { HeaderApp } from "../../components";

const LayoutHeader = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, [setLoading]);
  return (
    <section className="layoutMargins grid xl:grid-rows-[80px_auto] 2xl:grid-rows-[90px_auto] 2xl:gap-4">
      <HeaderApp />
      {loading ? <p>Loading</p> : children}
    </section>
  );
};

export default LayoutHeader;
