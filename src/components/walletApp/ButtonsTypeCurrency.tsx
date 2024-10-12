import { useField } from "formik";

type Props = {
  name: string;
};

const ButtonsTypeCurrency = (props: Props) => {
  const [, meta, helpers] = useField(props);
  const { value } = meta;
  const { setValue } = helpers;
  return (
    <>
      <button
        type="button"
        onClick={() => {
          setValue("income");
        }}
        className={`${
          value === "income"
            ? " bg-customGreen ring-customGreen"
            : "bg-green-600 ring-green-500"
        } h-full w-48 rounded-l-xl ring-2 hover:bg-green-400`}
      >
        Income
      </button>
      <button
        type="button"
        onClick={() => {
          setValue("expense");
        }}
        className={`${
          value === "expense"
            ? " bg-customRed ring-customRed"
            : "bg-red-600 ring-red-500"
        } h-full w-48 rounded-r-xl ring-2 hover:bg-red-400`}
      >
        Expense
      </button>
    </>
  );
};

export default ButtonsTypeCurrency;
