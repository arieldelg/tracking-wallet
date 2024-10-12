const HeaderApp = ({
  title,
  classNameLine,
}: {
  title: string;
  classNameLine?: string;
}) => {
  let className;
  if (!classNameLine) className = "pb-4";
  else className = classNameLine;
  return (
    <header className="flex flex-col">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-3xl xl:text-5xl">{title}</h1>
        <div className="text-right 2xl:text-3xl md:max-2xl:text-xl">
          <h2>Nomina</h2>
          <p>10,000 MXN</p>
        </div>
      </div>
      <hr className={`mt-1 ${className}`} />
    </header>
  );
};

export default HeaderApp;