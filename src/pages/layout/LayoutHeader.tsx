import { HeaderApp } from "../../components";

const LayoutHeader = ({ children }: { children: React.ReactNode }) => {
  console.log("hola");
  return (
    <section className="layoutMargins grid grid-rows-[118px_auto]">
      <HeaderApp title="Dashboard" classNameLine="pb-7" />
      {children}
    </section>
  );
};

export default LayoutHeader;
