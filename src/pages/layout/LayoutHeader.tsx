import { HeaderApp } from "../../components";

const LayoutHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="layoutMargins grid grid-rows-[118px_auto]">
      <HeaderApp title="New Entry" classNameLine="pb-7" />
      {children}
    </section>
  );
};

export default LayoutHeader;
