import { walletAPI } from "../../api/walletAPI";
import { getEnvirables } from "../../helpers";
import { activeNoteHelper } from "../../helpers/wallet";
import { InitialValues } from "../../interface/walletApp";

const { VITE_API_URL } = getEnvirables();

const loader = async () => {
  const locale = localStorage.getItem("activeNote");

  const validateValue = activeNoteHelper({});

  if (validateValue !== "newNote") {
    const note = await walletAPI(`${VITE_API_URL}/note/${locale}`);
    return {
      note: note.data.note,
      title: "Edit Bill",
    };
  } else {
    const initialValues: InitialValues = {
      typePayment: "",
      date: new Date(),
      tag: "",
      title: "",
      note: "",
      quantity: 0,
      currency: "MXN",
      typeCurrency: "income",
      images: [],
    };

    return {
      note: initialValues,
      title: "New Bill",
    };
  }
};

export default loader;
