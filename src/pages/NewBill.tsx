import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  ButtonsTypeCurrency,
  MyDate,
  MySelect,
  MyTextArea,
  MyTextInput,
} from "../components";
import { useRef } from "react";
import {
  TrashIcon,
  PlusIcon,
  MinusIcon,
  CloudArrowUpIcon,
} from "@heroicons/react/24/outline";
import * as Yup from "yup";
import ArrayTypePayment from "../data/typePayment.json";
import CurrencyTypeMoney from "../data/currencyType.json";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { ActiveNoteSelector } from "../store/wallet/walletSlice";
import { useNavigate } from "react-router-dom";
import { InitialValues, NoteProps } from "../interface/walletApp";
import { useHeaderName } from "../hooks";
import {
  startResetActiveNote,
  startSavingNewNote,
} from "../store/wallet/thunk";

const validationTypePayment: string[] = [];

for (const type of ArrayTypePayment) {
  validationTypePayment.push(type.name);
}

const initialValues: InitialValues = {
  typePayment: "",
  date: new Date(),
  tag: "",
  title: "",
  note: "",
  quantity: 0,
  currency: "MXN",
  typeCurrency: "income",
};

const NewBill = () => {
  const imgRef = useRef<HTMLInputElement | null>(null);
  const activeNote = useAppSelector(ActiveNoteSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { setHeaderName } = useHeaderName();
  console.log(activeNote);
  return (
    <>
      <div className=" grid grid-rows-2 items-center gap-4 max-lg:gap-8 lg:grid-cols-2 lg:grid-rows-1">
        {/* 
        //* seccion de formulario
        */}
        <Formik
          initialValues={activeNote ? activeNote : initialValues}
          onSubmit={(values) => {
            const newValues = {
              ...values,
              images: [],
            };
            dispatch(startSavingNewNote(newValues as NoteProps));
          }}
          validationSchema={Yup.object({
            typePayment: Yup.string().required().oneOf(validationTypePayment),
            date: Yup.date().required(),
            tag: Yup.string(),
            title: Yup.string().required(),
            note: Yup.string(),
            quantity: Yup.number().required().positive(),
            currency: Yup.string().required(),
          })}
        >
          {({ values }) => (
            <Form
              className={`h-full w-full p-7 min-w-[350px] xl:w-[480px] xl:h-[550px] 2xl:w-[550px] 2xl:h-[550px] ultraWide:h-[700px] ultraWide:w-[700px] bg-customBGDark1 rounded-lg ring-2 flex flex-col justify-between ${
                values.typeCurrency === "income"
                  ? "ring-customGreen "
                  : "ring-customRed"
              }`}
            >
              {/* 
              //* here goes the income or expense
              */}
              <div className="w-full h-7 flex justify-center ultraWide:mb-11 gap-1">
                <ButtonsTypeCurrency name="typeCurrency" />
              </div>
              {/* 
              //* here goes the quantity and currency inputs
              */}
              <div className="flex justify-center items-center w-full h-28 gap-4 relative  ultraWide:mb-8 transition-all">
                {values.typeCurrency === "income" ? (
                  <PlusIcon className="w-12 ultraWide:w-16 absolute left-6 text-green-400 animate-fadeIn" />
                ) : (
                  <MinusIcon className="w-12 ultraWide:w-16 absolute left-6 text-red-400 animate-fadeIn" />
                )}
                <div className="h-full flex flex-col items-center justify-evenly text">
                  <ErrorMessage
                    name="quantity"
                    className="text-center text-xs ultraWide:text-base text-red-500 first-letter:capitalize"
                    component="span"
                  />
                  <Field
                    type="number"
                    className="inputQuantity w-60 h-12 ultraWide:h-16 text-5xl text-right text-white bg-transparent"
                    name="quantity"
                    onBlur={() => null}
                  />
                  <MySelect
                    name="currency"
                    id="currency"
                    classnameinput="input w-28 h-9 ultraWide:h-11 bg-transparent text-white text-4xl"
                    onBlur={() => null}
                    classnameerror="errorMessage"
                  >
                    <option value="" disabled className="text-2xl">
                      Tipo
                    </option>
                    {CurrencyTypeMoney.map(({ label, name }) => (
                      <option
                        value={name}
                        className="text-black text-2xl"
                        key={name}
                      >
                        {label}
                      </option>
                    ))}
                  </MySelect>
                </div>
              </div>
              {/* 
              //* Here Starts the input sections
              */}
              <div className="w-full flex justify-between h-max items-center gap-8 ultraWide:pb-2">
                <div className="flex flex-col justify-between h-full w-1/2 ultraWide:space-y-8">
                  {/* 
                //* input type payment
                */}
                  <MySelect
                    name="typePayment"
                    placeholder="type payment"
                    classnameinput="input h-8 px-4 "
                    classnamelabel="text-lg text-center"
                    label="Type Payment"
                    onBlur={() => null}
                    classnameerror="errorMessage"
                    id="typePayment"
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    {ArrayTypePayment.map(({ label, name }) => (
                      <option key={name} value={name}>
                        {label}
                      </option>
                    ))}
                  </MySelect>
                  {/* 
                    //* input Date
                    */}
                  <MyDate
                    classnamelabel="text-center text-lg"
                    classnameinput="w-full h-8 input text-sm ultraWide:text-base"
                    name="date"
                    value={JSON.stringify(new Date())}
                    label="Date"
                    onBlur={() => null}
                    id="date"
                  />
                  {/* 
                  //* input tag
                  */}
                  <MyTextInput
                    id="tag"
                    name="tag"
                    label="Tag"
                    placeholder="keyword"
                    classnamelabel="text-center text-lg"
                    classnameinput="input w-full h-8"
                    onBlur={() => null}
                    classnameerror="errorMessage"
                  />
                </div>
                <div className="flex flex-col justify-between h-full w-1/2 ultraWide:space-y-8">
                  <MyTextInput
                    id="title"
                    label="Title"
                    name="title"
                    placeholder="title"
                    classnameinput="input w-full h-8"
                    classnamelabel="text-center text-lg"
                    onBlur={() => null}
                    classnameerror="errorMessage"
                  />
                  <MyTextArea
                    label="Note"
                    name="note"
                    placeholder="Note..."
                    classnamelabel="text-center text-lg"
                    classnameinput="input py-2 h-24 ultraWide:h-32 w-full"
                    onBlur={() => null}
                    id="note"
                    classnameerror="errorMessage"
                  />
                </div>
              </div>
              <div className="w-full h-8 ultraWide:h-10 flex justify-between">
                <button
                  type="button"
                  className="w-52 ultraWide:w-64 h-full bg-customRed rounded-full ring-2 ring-customRed hover:bg-red-500 hover:ring-red-300"
                  onClick={() => {
                    dispatch(startResetActiveNote());
                    setHeaderName("Dashboard");
                    navigate(-1);
                  }}
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

        {/* 
        //* seccion de imagenes
        */}
        <div className="flex flex-col items-center justify-start gap-10 h-auto ultraWide:h-[700px]">
          <div className="flex w-full items-center justify-between">
            <h1 className="text-2xl">Images</h1>
            <input
              type="file"
              ref={imgRef}
              multiple
              className="hidden"
              onChange={(e) => console.log(e.target.files)}
            />
            <button onClick={() => imgRef.current?.click()}>
              + upload an image
            </button>
          </div>
          {(activeNote?.images?.length as number) > 0 ? (
            <div className="grid grid-cols-3 gap-8 overflow-auto p-2 bg-customBGDark1 rounded-lg h-96 ultraWide:h-full scrollbar">
              {activeNote?.images?.map(({ id, img, name }) => (
                <div className="imageContainerUpload" key={id}>
                  <img src={img} alt={name} className="w-full rounded-xl" />
                  <button
                    className="w-7 h-7 rounded-full bg-white flex justify-center items-center absolute top-1 right-1 ring-2 ring-red-500"
                    onClick={() => console.log("delete image")}
                  >
                    <TrashIcon className="w-5 text-red-500" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full h-96 flex flex-col items-center justify-center space-y-4">
              <CloudArrowUpIcon className="w-36 text-gray-500" />
              <p className="text-2xl text-gray-500">Upload an Image!!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NewBill;
