import { HeaderApp } from "../../components";

const LayoutHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="layoutMargins grid 2xl:grid-rows-[118px_auto] grid-rows-[90px_auto]">
      <HeaderApp classNameLine="2xl:pb-7 pb-3" />
      {children}
    </section>
  );
};

export default LayoutHeader;
