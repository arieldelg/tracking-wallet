import { HeaderApp } from "../../components";

const LayoutHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="layoutMargins grid xl:grid-rows-[80px_auto] 2xl:grid-rows-[90px_auto] 2xl:gap-4">
      <HeaderApp />
      {children}
    </section>
  );
};

export default LayoutHeader;
