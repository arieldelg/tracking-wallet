import { Field, Form, Formik } from "formik";
import headphones from "../assets/headphones-bright-background.jpg";
import { HeaderApp } from "../components";
import { useRef } from "react";
import { TrashIcon, PlusIcon } from "@heroicons/react/24/outline";

const initialValues = {
  type: "",
  date: "",
  time: "",
  tag: "",
  title: "",
  note: "",
  quantity: 0,
  currency: "",
};

const NewBill = () => {
  const imgRef = useRef<HTMLInputElement | null>(null);
  return (
    <section className="layoutMargins grid grid-rows-[118px_auto]">
      <HeaderApp title="New Entry" classNameLine="pb-7" />
      <div className=" grid grid-rows-2 items-center gap-4 max-lg:gap-8 lg:grid-cols-2 lg:grid-rows-1">
        {/* 
        //* seccion de formulario
        */}
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => console.log(values)}
        >
          {() => (
            <Form className="h-full w-full min-w-[350px] xl:w-[480px] 2xl:w-[550px] 2xl:h-[550px] ultraWide:h-[700px] ultraWide:w-[700px] bg-customBGDark1 rounded-lg ring-2 ring-white ">
              <div>
                <button>Income</button>
                <button>Expemses</button>
              </div>
              <div className="flex items-center">
                <PlusIcon className="w-8" />
                <div className="flex flex-col items-center">
                  <Field type="number" className="input" name="quantity" />
                  <Field
                    name="currency"
                    id="currency"
                    className="input"
                    as="select"
                  >
                    <option value=""></option>
                    <option value="MXN">MXN</option>
                    <option value="USD">USD</option>
                  </Field>
                </div>
              </div>
              <div>
                <div>
                  <div>
                    <label htmlFor="type">Type</label>
                    <input
                      type="text"
                      placeholder="tipo"
                      name="type"
                      className="input"
                    />
                  </div>
                  <div>
                    <label htmlFor="date">Date</label>
                    <input
                      type="text"
                      placeholder="tipo"
                      name="date"
                      className="input"
                    />
                  </div>
                  <div>
                    <label htmlFor="time">Time</label>
                    <input
                      type="text"
                      placeholder="tipo"
                      name="time"
                      className="input"
                    />
                  </div>
                  <div>
                    <label htmlFor="tag">Tag</label>
                    <input
                      type="text"
                      placeholder="tipo"
                      name="tag"
                      className="input"
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      placeholder="title"
                      name="title"
                      className="input"
                    />
                  </div>
                  <div>
                    <label htmlFor="note">Note</label>
                    <textarea
                      name="note"
                      id="note"
                      className="input"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div>
                <button type="button">Cancelar</button>
                <button type="submit">Salvar</button>
              </div>
            </Form>
          )}
        </Formik>

        {/* 
        //* seccion de imagenes
        */}
        <div className="flex flex-col items-center justify-start gap-10 h-full ultraWide:h-[700px]">
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
          <div className="grid grid-cols-3 gap-8 overflow-auto p-2 bg-customBGDark1 rounded-lg h-96 ultraWide:h-full scrollbar">
            <div className="imageContainerUpload">
              <img
                src={headphones}
                alt="headphones"
                className="w-full rounded-xl"
              />
              <button
                className="w-7 h-7 rounded-full bg-white flex justify-center items-center absolute top-1 right-1 ring-2 ring-red-500"
                onClick={() => console.log("delete image")}
              >
                <TrashIcon className="w-5 text-red-500" />
              </button>
            </div>

            <div className="imageContainerUpload">
              <img
                src={headphones}
                alt="headphones"
                className="w-full rounded-xl"
              />
              <button
                className="w-7 h-7 rounded-full bg-white flex justify-center items-center absolute top-1 right-1 ring-2 ring-red-500"
                onClick={() => console.log("delete image")}
              >
                <TrashIcon className="w-5 text-red-500" />
              </button>
            </div>

            <div className="imageContainerUpload">
              <img
                src={headphones}
                alt="headphones"
                className="w-full rounded-xl"
              />
              <button
                className="w-7 h-7 rounded-full bg-white flex justify-center items-center absolute top-1 right-1 ring-2 ring-red-500"
                onClick={() => console.log("delete image")}
              >
                <TrashIcon className="w-5 text-red-500" />
              </button>
            </div>

            <div className="imageContainerUpload">
              <img
                src={headphones}
                alt="headphones"
                className="w-full rounded-xl"
              />
              <button
                className="w-7 h-7 rounded-full bg-white flex justify-center items-center absolute top-1 right-1 ring-2 ring-red-500"
                onClick={() => console.log("delete image")}
              >
                <TrashIcon className="w-5 text-red-500" />
              </button>
            </div>

            <div className="imageContainerUpload">
              <img
                src={headphones}
                alt="headphones"
                className="w-full rounded-xl"
              />
              <button
                className="w-7 h-7 rounded-full bg-white flex justify-center items-center absolute top-1 right-1 ring-2 ring-red-500"
                onClick={() => console.log("delete image")}
              >
                <TrashIcon className="w-5 text-red-500" />
              </button>
            </div>

            <div className="imageContainerUpload">
              <img
                src={headphones}
                alt="headphones"
                className="w-full rounded-xl"
              />
              <button
                className="w-7 h-7 rounded-full bg-white flex justify-center items-center absolute top-1 right-1 ring-2 ring-red-500"
                onClick={() => console.log("delete image")}
              >
                <TrashIcon className="w-5 text-red-500" />
              </button>
            </div>

            <div className="imageContainerUpload">
              <img
                src={headphones}
                alt="headphones"
                className="w-full rounded-xl"
              />
              <button
                className="w-7 h-7 rounded-full bg-white flex justify-center items-center absolute top-1 right-1 ring-2 ring-red-500"
                onClick={() => console.log("delete image")}
              >
                <TrashIcon className="w-5 text-red-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewBill;
