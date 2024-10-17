import { ErrorMessage, Field, Form, Formik } from "formik";
import { MySelect, MyTextArea, MyTextInput } from "../../components";
import TypeCurrency from "../../data/currencyType.json";
import * as Yup from "yup";
import { useWalletStore } from "../../hooks";
import { UsersAccountFormik } from "../../interface/walletApp";

const initialValues: UsersAccountFormik = {
  title: "",
  quantity: 0,
  currency: "MXN",
  description: "",
};

const NewAccount = () => {
  const {
    setCloseModal,
    setSaveAccount,
    activeAccount,
    setSaveEditAccount,
    setEditAccount,
  } = useWalletStore();
  return (
    <div
      className="bg-customBGDark1 rounded-2xl ring-2 px-4 md:px-8 py-5 ultraWide:p-8 text-lg ultraWide:text-xl animate-fadeInBillModal ring-white min-w-[400px] xl:min-w-[600px] ultraWide:min-w-[730px] max-h-[600px] ultraWide:max-h-[750px] h-5/6 flex flex-col ultraWide:justify-evenly justify-between"
      onClick={(e) => e.stopPropagation()}
    >
      {/* <MyNewAccount /> */}
      <h1 className="text-3xl md:text-5xl ultraWide:text-7xl text-center w-full">
        {activeAccount ? <span>Edit Account</span> : <span>New Account</span>}
      </h1>
      <Formik
        initialValues={activeAccount ? activeAccount : initialValues}
        onSubmit={(values, actions) => {
          if (activeAccount) {
            const newValues = {
              ...values,
              id: activeAccount.id,
            };
            setEditAccount(newValues);
            setSaveEditAccount(newValues);
          } else {
            setSaveAccount(values);
          }
          actions.resetForm();
        }}
        validationSchema={Yup.object({
          title: Yup.string().required().min(4),
          quantity: Yup.number().required().positive(),
          currency: Yup.string().required(),
          description: Yup.string().max(100),
        })}
      >
        {() => (
          <Form className="text-black w-full" method="POST">
            <div className="flex flex-col items-center gap-2 2xl:gap-4">
              <ErrorMessage
                name="quantity"
                className="errorMessage"
                component="span"
              />
              <Field
                type="number"
                name="quantity"
                onBlur={() => null}
                className="inputQuantity"
              />
              <MySelect
                id="currency"
                name="currency"
                onBlur={() => null}
                classnameinput="inputSelect"
                classnameerror="errorMessage"
              >
                <option value="" disabled className="text-xl">
                  Type
                </option>
                {TypeCurrency.map(({ label, name }) => (
                  <option
                    value={name}
                    key={name}
                    className="text-black text-xl"
                  >
                    {label}
                  </option>
                ))}
              </MySelect>
            </div>
            <div className="h-auto my-10 ultraWide::my-14">
              <MyTextInput
                id="title"
                label="Name"
                name="title"
                onBlur={() => null}
                classnamelabel="text-2xl text-white"
                classnameinput="input h-10"
                classnameerror="errorMessage"
              />
              <MyTextArea
                id="description"
                name="description"
                label="Description"
                classnameinput="input h-20"
                classnamelabel="text-2xl text-white"
                onBlur={() => null}
                classnameerror="errorMessage"
              />
            </div>
            <div className="w-full h-10 flex justify-between gap-4 ">
              <button
                type="button"
                className="w-52 ultraWide:w-64 h-full bg-customRed rounded-full ring-2 ring-customRed hover:bg-red-500 hover:ring-red-300"
                onClick={() => setCloseModal()}
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

export default NewAccount;
