import { Field, Formik } from "formik";
import { Form } from "react-router-dom";
import { MySelect, MyTextArea, MyTextInput } from "../index";
import TypeCurrency from "../../data/currencyType.json";

const initialValues = {
  title: "",
  quantity: 0,
  typeCurrency: "MXN",
  description: "",
};

const MyNewAccount = () => {
  return (
    <div className="bg-customBGDark1 rounded-2xl ring-2 px-4 md:px-8 py-5 ultraWide:p-8 w-20 min-w-[400px] max-w-[500px] text-lg ultraWide:text-xl relative flex flex-col justify-evenly animate-fadeInBillModal ring-white">
      <h1 className="text-3xl xl:text-5xl text-center w-full">New Account</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => console.log(values)}
      >
        {() => (
          <Form className="text-black w-full flex flex-col justify-between">
            <div className="flex flex-col items-center gap-2 md:gap-4">
              <Field
                type="number"
                name="quantity"
                onBlur={() => null}
                className="inputQuantity"
              />
              <MySelect
                id="typeCurrency"
                name="typeCurrency"
                onBlur={() => null}
                classnameinput="inputSelect"
              >
                <option value="" disabled className="text-xl">
                  Type
                </option>
                {TypeCurrency.map(({ label, name }) => (
                  <option value={name} className="text-black text-xl">
                    {label}
                  </option>
                ))}
              </MySelect>
            </div>
            <div className="h-56 space-y-5">
              <MyTextInput
                id="title"
                label="Name"
                name="title"
                onBlur={() => null}
                classnamelabel="text-2xl text-white"
                classnameinput="input h-10"
              />
              <MyTextArea
                id="description"
                name="description"
                label="Description"
                classnameinput="input h-20"
                classnamelabel="text-2xl text-white"
                onBlur={() => null}
              />
            </div>
            <div className="w-full h-10 flex justify-between mt-4 ">
              <button
                type="button"
                className="w-52 ultraWide:w-64 h-full bg-customRed rounded-full ring-2 ring-customRed hover:bg-red-500 hover:ring-red-300"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="w-52 ultraWide:w-64 h-full bg-customGreen rounded-full ring-2 ring-customGreen hover:bg-green-500 hover:ring-green-300"
              >
                Salvar
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MyNewAccount;
