import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  ButtonsTypeCurrency,
  MyDate,
  MySelect,
  MyTextArea,
  MyTextInput,
} from "../components";
import { ReactNode, useRef, useState } from "react";
import {
  TrashIcon,
  PlusIcon,
  MinusIcon,
  CloudArrowUpIcon,
} from "@heroicons/react/24/outline";
import * as Yup from "yup";
import ArrayTypePayment from "../data/typePayment.json";
import CurrencyTypeMoney from "../data/currencyType.json";
import { useNavigate } from "react-router-dom";
import { IMG, InitialValues, NoteProps } from "../interface/walletApp";
import { useHeaderName, useWalletStore, useWindowDimensions } from "../hooks";
import { ifActiveNoteExist } from "../helpers/wallet";

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
  const navigate = useNavigate();
  const { setHeaderName } = useHeaderName();
  const { setSavingNewNote, setSavingUpdateNote } = useWalletStore();
  const { height } = useWindowDimensions();
  const activeNote = ifActiveNoteExist();
  const [previewIMG, setPreviewIMG] = useState(
    activeNote ? activeNote.images : []
  );
  const [files, setFiles] = useState<File[]>([]);
  const executeImage = (): boolean => {
    if (activeNote) {
      if ((activeNote.images?.length as number) > 0) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  };
  console.log(previewIMG);
  //TODO how to get the values on submit
  return (
    <>
      <div className=" grid grid-rows-2 items-center gap-4 max-lg:gap-8 lg:grid-cols-2 lg:grid-rows-1 ">
        {/* 
        //* seccion de formulario
        */}
        <Formik
          initialValues={activeNote ? activeNote : initialValues}
          onSubmit={({ images, ...values }) => {
            if (activeNote) {
              const updateValues = {
                ...values,
                images: [...(images as IMG[]), files],
              };
              console.log(updateValues);
              // console.log("New Bill, activeNote");
              // setSavingUpdateNote(newValues as NoteProps);
              return navigate(-1);
            } else {
              const newValues = {
                ...values,
                images: [...(files as unknown as IMG[])],
              };
              setSavingNewNote(newValues as InitialValues);
              return navigate(-1);
            }
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
              style={{
                height: height - 165,
              }}
              className={`h-full w-full p-7 xl:p-4 min-w-[350px] xl:w-[480px] 2xl:w-[550px] 2xl:h-[550px] ultraWide:h-auto ultraWide:max-h-[550px] 2xUltraWide:max-h-[700px] ultraWide:w-[700px] bg-customBGDark1 rounded-lg ring-2 flex flex-col justify-between  ${
                values.typeCurrency === "income"
                  ? "ring-customGreen "
                  : "ring-customRed"
              }`}
            >
              {/* 
              //* here goes the income or expense
              */}
              <div className="w-full h-7 flex justify-center gap-1">
                <ButtonsTypeCurrency name="typeCurrency" />
              </div>
              {/* 
              //* here goes the quantity and currency inputs
              */}
              <div className="flex justify-center items-center w-full h-auto gap-4 relative ultraWide:mb-2 2xUltraWide:mb-8 transition-all">
                {values.typeCurrency === "income" ? (
                  <PlusIcon className="w-10 ultraWide:w-16 absolute left-6 text-green-400 animate-fadeIn" />
                ) : (
                  <MinusIcon className="w-10 ultraWide:w-16 absolute left-6 text-red-400 animate-fadeIn" />
                )}
                <div className="h-full flex flex-col items-center justify-evenly">
                  <ErrorMessage
                    name="quantity"
                    className="text-center text-sm ultraWide:text-base text-red-500 first-letter:capitalize"
                    component="span"
                  />
                  <Field
                    type="number"
                    className="inputQuantity "
                    name="quantity"
                    onBlur={() => null}
                  />
                  <MySelect
                    name="currency"
                    id="currency"
                    classnameinput="inputSelect "
                    onBlur={() => null}
                    classnameerror="errorMessage"
                  >
                    <option value="" disabled className="text-2xl mt-4">
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
              <div className="w-full flex justify-between items-start xl:max-2xl:gap-4 gap-8 ultraWide:pb-5 2xlUltraWide:pb-6 pb-4">
                <div className="flex flex-col justify-between  h-auto w-1/2 ultraWide:space-y-3 2xlUltraWide:space-y-8 xl:max-2xl:px-4 space-y-1">
                  {/* 
                //* input type payment
                */}
                  <MySelect
                    name="typePayment"
                    placeholder="type payment"
                    classnameinput="input px-4 2xl:h-8 xl:h-6 xl:max-2xl:text-sm"
                    classnamelabel="inputLabel xl:max-2xl:text-base"
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
                    classnamelabel="inputLabel xl:max-2xl:text-base"
                    classnameinput="input w-full h-8 text-sm ultraWide:text-base 2xl:h-8 xl:h-6 tracking-tighter"
                    name="date"
                    value={
                      activeNote
                        ? JSON.stringify(activeNote.date)
                        : JSON.stringify(new Date())
                    }
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
                    classnamelabel="inputLabel xl:max-2xl:text-base"
                    classnameinput="input w-full 2xl:h-8 xl:h-6 xl:max-2xl:text-sm"
                    onBlur={() => null}
                    classnameerror="errorMessage"
                  />
                </div>
                <div className="flex flex-col justify-between h-full w-1/2 ultraWide:space-y-1 2xlUltraWide:space-y-8">
                  <MyTextInput
                    id="title"
                    label="Title"
                    name="title"
                    placeholder="title"
                    classnameinput="input w-full h-8 2xl:h-8 xl:h-6 xl:max-2xl:text-sm"
                    classnamelabel="inputLabel xl:max-2xl:text-base"
                    onBlur={() => null}
                    classnameerror="errorMessage"
                  />
                  <MyTextArea
                    label="Note"
                    name="note"
                    placeholder="Note..."
                    classnamelabel="inputLabel xl:max-2xl:text-base"
                    classnameinput="input h-24 xl:max-2xl:h-20 ultraWide:h-32 w-full xl:max-2xl:text-sm py-1"
                    onBlur={() => null}
                    id="note"
                    classnameerror="errorMessage"
                  />
                </div>
              </div>
              <div className="w-full h-8 ultraWide:h-10 flex justify-between gap-4">
                <button
                  type="button"
                  className="w-52 ultraWide:w-64 h-full bg-customRed rounded-full ring-2 ring-customRed hover:bg-red-500 hover:ring-red-300"
                  onClick={() => {
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
        <div
          style={{
            height: height - 190,
          }}
          className="flex flex-col  justify-start xl:max-2xl:gap-5 gap-10 ultraWide:max-h-[650px] 2xUltraWide:h-[700px]"
        >
          <div className="flex w-full items-center justify-between">
            <h1 className="text-2xl">Images</h1>
            <input
              name="images"
              type="file"
              ref={imgRef}
              multiple
              className="hidden"
              onChange={(e) => {
                const files = e.target.files as FileList;
                const tempArray: IMG[] = [];
                for (const image of files) {
                  const img = URL.createObjectURL(image);
                  const object = {
                    url: img,
                    id: img,
                    httpURL: img,
                  };
                  tempArray.push(object);
                }
                setFiles((prev) => [...prev, ...files]);
                console.log(tempArray);
                setPreviewIMG((prev) => [...(prev as IMG[]), ...tempArray]);
              }}
            />
            <button onClick={() => imgRef.current?.click()}>
              + upload an image
            </button>
          </div>

          <div
            style={{ height: height - 200 }}
            className="grid grid-cols-3 gap-8 overflow-auto p-5 bg-customBGDark1 rounded-xl ultraWide:h-full scrollbar "
          >
            {executeImage() ? (
              ((previewIMG as IMG[]).map((props) => {
                return (
                  <div className="imageContainerUpload" key={props.id}>
                    <img
                      src={props.url}
                      alt={props.id}
                      className="w-full rounded-xl"
                    />
                    <button
                      className="w-7 h-7 rounded-full bg-white flex justify-center items-center absolute top-1 right-1 ring-2 ring-red-500"
                      onClick={() => console.log("delete image")}
                    >
                      <TrashIcon className="w-5 text-red-500" />
                    </button>
                  </div>
                );
              }) as ReactNode)
            ) : (previewIMG as IMG[]).length > 0 ? (
              (previewIMG as IMG[]).map((props, index) => (
                <div className="imageContainerUpload" key={index}>
                  <img
                    src={props.url}
                    alt={props.id}
                    className="w-full rounded-xl"
                  />
                  <button
                    className="w-7 h-7 rounded-full bg-white flex justify-center items-center absolute top-1 right-1 ring-2 ring-red-500"
                    onClick={() => {
                      const newArray = (previewIMG as IMG[]).filter(
                        (img) => img !== props
                      );
                      setPreviewIMG(newArray);
                      URL.revokeObjectURL(props.url);
                    }}
                  >
                    <TrashIcon className="w-5 text-red-500" />
                  </button>
                </div>
              ))
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center space-y-4 col-span-3">
                <CloudArrowUpIcon className="w-36 text-gray-500" />
                <p className="text-2xl text-gray-500">Upload an Image!!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewBill;
