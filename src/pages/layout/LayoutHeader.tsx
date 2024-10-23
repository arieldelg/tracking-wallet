import { HeaderApp } from "../../components";

const LayoutHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="layoutMargins grid grid-rows-[90px_auto]">
      <HeaderApp classNameLine="mb-[32px]" />
      {children}
    </section>
  );
};

export default LayoutHeader;
