import { AxiosResponse } from "axios";
import { walletAPI } from "../../api/walletAPI";
import {
  IMG,
  InitialValues,
  NoteProps,
  UsersAccount,
  UsersAccountFormik,
} from "../../interface/walletApp";
import { getEnvirables } from "../getEnvirables";
import { setActiveNoteSlice } from "../../store/wallet/walletSlice";
const { VITE_API_URL } = getEnvirables();

const activeAccountHelper = ({
  account,
  refresh,
  deleteAccount,
}: {
  account?: string;
  refresh?: boolean;
  deleteAccount?: boolean;
}): string => {
  const isTrue = localStorage.getItem("activeAccount");

  if (isTrue === null) {
    localStorage.setItem("activeAccount", "1");
    return "1";
  }

  if (deleteAccount) {
    localStorage.removeItem("activeAccount");
    return "1";
  }

  if (refresh) return localStorage.getItem("activeAccount") as string;

  if (account !== undefined) {
    localStorage.setItem("activeAccount", account);
    return account;
  }

  return localStorage.getItem("activeAccount") as string;
};

const keyWordFilter = ({ key }: { key?: string }) => {
  const istrue = !!localStorage.getItem("filter");
  if (!istrue) {
    localStorage.setItem("filter", "init");
    return "init";
  }
  if (key) {
    localStorage.setItem("filter", key);
    return key;
  }
  const keyWord = localStorage.getItem("filter");

  return keyWord;
};

const activeNoteHelper = ({
  note,
  emptyNotes,
  refresh,
  newNote,
}: {
  note?: string;
  emptyNotes?: boolean;
  refresh?: boolean;
  newNote?: boolean;
}) => {
  const isTrue = !!localStorage.getItem("activeNote");

  if (newNote) {
    console.log(newNote);
    return localStorage.setItem("activeNote", "newNote");
  }

  if (emptyNotes === true) {
    localStorage.removeItem("activeNote");
    return [];
  }

  if (isTrue === false) {
    if (note) {
      localStorage.setItem("activeNote", note);
      return note;
    } else {
      return localStorage.removeItem("activeNote");
    }
  }

  if (refresh) {
    if (isTrue === true) {
      console.log("here");
      return localStorage.getItem("activeNote");
    }
  }

  if (note !== undefined) {
    localStorage.setItem("activeNote", note);
    return note;
  }

  return localStorage.getItem("activeNote");
};

/**
 * @param  ({ props: number , format: string }) example ({props: 12319310, format: 'en-US'})
 * @returns date in Intl.DateTimeFormat('en-US') by default
 */
const date = ({
  props,
  format = "en-US",
}: {
  props: Date;
  format?: string;
}) => {
  const rawDate = new Date(props);
  const date = new Intl.DateTimeFormat(format).format(rawDate);
  return date;
};

const savingImages = async (files: FileList[] | File[]) => {
  if (files.length === 0) return [];
  const form = new FormData();

  for (const image of files) {
    form.append("image", image as unknown as Blob);
  }

  try {
    const { data } = await walletAPI.post(`${VITE_API_URL}/image/new`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (!data.ok) {
      throw new Response("", {
        status: 500,
        statusText: "error en el backend",
      });
    }

    const id = activeNoteHelper({});
    await walletAPI.patch(`${VITE_API_URL}/note/imgs/${id}`, data.images);
    activeNoteHelper({ newNote: true });
    return;
    // return data.images;
  } catch (error) {
    console.log(error, "startSavingImages");
  }
};

/**
 * @param deleteArray array of strings
 * @returns void
 * @summary need to send array of id or single id to delete images
 */
const deleteImg = async (images: string[]) => {
  // const tempArray: string[] = [];

  // for (const idIMG of JSON.parse(images)) {
  //   tempArray.push(idIMG.id);
  // }
  // if (deleteArray.length === 0) return;

  try {
    const response = await walletAPI.post(
      `${VITE_API_URL}/image/delete`,
      images
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

const getAccounts = async (): Promise<UsersAccount[]> => {
  try {
    const {
      data: { accounts },
    } = (await walletAPI.get(VITE_API_URL)) as AxiosResponse<{
      accounts: UsersAccount[];
    }>;

    return accounts;
  } catch (error) {
    const message = handleErrors(error);
    throw new Error(message);
  }
};

const getNotes = async (id: string): Promise<NoteProps[]> => {
  if (id === "1") return [];
  try {
    const { data } = (await walletAPI.get(
      `${VITE_API_URL}/notes/${id}`
    )) as AxiosResponse<{ ok: boolean; notes: NoteProps[] }>;

    if (!data.ok) throw new Error(handleErrors("Error Api getNotes"));

    return data.notes;
  } catch (error) {
    const message = handleErrors(error);
    throw new Error(message);
  }
};

const handleErrors = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  else return String(error);
};

/**
 * @param notes (array: NotePropes)
 * @returns void
 * @summary checks if exist notes or note in the active account
 */
const ifExistOrNotExist = (
  notes: NoteProps[],
  dispatch: (arg0: {
    payload: NoteProps | undefined;
    type: "wallet/setActiveNoteSlice";
  }) => void
) => {
  if (notes.length === 0) {
    activeNoteHelper({ emptyNotes: true });
    dispatch(setActiveNoteSlice(undefined));
  } else {
    const firstNote = notes[0];
    activeNoteHelper({ note: firstNote._id });
    dispatch(setActiveNoteSlice(firstNote));
  }
};

/**
 * @param notes NoteProps[]
 * @returns the array of notes filtered
 */
const filterBy = ({
  notes,
  filterKeyword,
}: {
  notes: NoteProps[];
  filterKeyword?: string;
}) => {
  switch (filterKeyword) {
    case "income":
    case "expense": {
      const filter = notes!.filter(
        (element) => element.typeCurrency === keyWordFilter({})
      );

      return {
        notes: filter,
        firstValues: filter[0],
      };
    }
    case "quantity": {
      const array = [...notes!];
      const sortedBills = array.sort((a, b) =>
        a.quantity < b.quantity ? -1 : a.quantity > b.quantity ? 1 : 0
      );
      return {
        notes: sortedBills,
        firstValues: sortedBills[0],
      };
    }
    case "quantity2": {
      const array = [...notes!];
      const sortedBills = array.sort((a, b) =>
        a.quantity < b.quantity ? 1 : a.quantity > b.quantity ? -1 : 0
      );
      return {
        notes: sortedBills,
        firstValues: sortedBills[0],
      };
    }
    case "reset": {
      return {
        notes,
        firstValues: notes![0],
      };
    }
    default:
      return {
        notes,
        firstValues: notes![0],
      };
  }
};

const getSingleAccount = async (id: string) => {
  try {
    const { data } = (await walletAPI(
      `${VITE_API_URL}/account/${id}`
    )) as AxiosResponse<{
      ok: boolean;
      account: UsersAccount | UsersAccount[] | [];
    }>;
    if (!data.ok) throw new Error("Error calling api single account");
    if ((data.account as UsersAccount[]).length === 1) {
      activeAccountHelper({ account: (data.account as UsersAccount[])[0]._id });
      return (data.account as UsersAccount[])[0];
    }
    if ((data.account as []).length === 0) {
      activeAccountHelper({ account: "1" });
      return;
    }

    return data.account;
  } catch (error) {
    console.log(error);
  }
};

const notesHome = async (accountId: string) => {
  if (accountId === "1") return [];
  try {
    const { data } = (await walletAPI.get(
      `${VITE_API_URL}/notes/preview/${accountId}`
    )) as AxiosResponse<{ ok: boolean; notes: NoteProps[] }>;

    if (!data.ok) throw new Error("Error on Response notes Home");

    return data.notes;
  } catch (error) {
    console.log(error);
  }
};

const deleteNote = async (idNote: string) => {
  try {
    const response = await fetch(`${VITE_API_URL}/note/delete/${idNote}`, {
      method: "DELETE",
    });
    const data = await response.json();
    // const {
    //   data: { ok },
    // } = (await walletAPI.delete(
    //   `${VITE_API_URL}/note/delete/${idNote}`
    // )) as AxiosResponse<{ ok: boolean; results: unknown }>;
    return data.ok;
  } catch (error) {
    console.log(error);
  }
};

const saveNote = async (formData: object, files: File[]) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { date, quantity, image, images, ...props } = formData as {
    date: string;
    quantity: string;
    images: string;
    image: File;
  };

  const accountID = activeAccountHelper({});
  const note = {
    ...props,
    date: JSON.parse(date),
    quantity: JSON.parse(quantity),
    account: accountID,
    images: JSON.parse(images),
  };

  try {
    const {
      data: { message, _id, ok },
    } = (await walletAPI.post(
      `${VITE_API_URL}/note/new`,
      note
    )) as AxiosResponse<{
      ok: boolean;
      _id: string;
      account: UsersAccount;
      message: string;
    }>;
    if (!ok) throw new Error(message);
    if (files.length === 0) return;
    return activeNoteHelper({ note: _id });
  } catch (error) {
    console.log(error);
  }
};

const formData = (files: File[], values: InitialValues, previewIMG: IMG[]) => {
  const optimisticNote = {
    ...values,
    images: JSON.stringify([...previewIMG]) as unknown as IMG[],
  };

  const formData = new FormData();

  if (files.length > 0) {
    for (let index = 0; index < files.length; index++) {
      formData.append("image", files[index]);
    }
  }

  for (const item in optimisticNote as InitialValues) {
    const val = optimisticNote[item as keyof InitialValues];

    if (item === "date") {
      const time = new Date(values.date).getTime();
      formData.append(item, time as unknown as string);
      continue;
    }

    if (item === "images" && previewIMG.length === 0) {
      formData.append(item, "[]");
      continue;
    }

    formData.append(item, val as string);
  }

  return formData;
};

const stateAccount = (state?: boolean) => {
  const isTrue = localStorage.getItem("select");

  if (isTrue === null) {
    localStorage.setItem("select", JSON.stringify(false));
    return state;
  }

  // if (refresh) return localStorage.getItem("activeAccount") as string;

  if (state) {
    localStorage.setItem("select", JSON.stringify(state));
    return state;
  }

  return JSON.parse(localStorage.getItem("select") as string);
};

const updateNote = async (values: UsersAccount) => {
  const account = {
    ...values,
    quantity: JSON.parse(values.quantity as unknown as string),
  };
  try {
    const { data } = (await walletAPI.put(
      `${VITE_API_URL}/account/update`,
      account
    )) as AxiosResponse<{ ok: boolean }>;
    if (!data.ok) throw new Error("Error updating account");
    return;
  } catch (error) {
    console.log(error);
  }
};

const saveAccount = async (values: UsersAccountFormik) => {
  const account = {
    ...values,
    quantity: JSON.parse(values.quantity as unknown as string),
  };
  try {
    const {
      data: { ok, _id },
    } = (await walletAPI.post(
      `${VITE_API_URL}/account/new`,
      account
    )) as AxiosResponse<{ ok: boolean; _id: string }>;

    if (!ok) throw new Error("Error Saving Account");
    return _id;
  } catch (error) {
    console.log(error);
  }
};

const deleteAccount = async (id: string) => {
  try {
    const { data } = await walletAPI.delete(
      `${VITE_API_URL}/account/delete/${id}`
    );
    if (!data.ok) throw new Error("error delete account");
    return;
  } catch (error) {
    console.log(error);
  }
};

export {
  activeAccountHelper,
  keyWordFilter,
  activeNoteHelper,
  date,
  savingImages,
  deleteImg,
  getAccounts,
  getNotes,
  ifExistOrNotExist,
  filterBy,
  getSingleAccount,
  notesHome,
  deleteNote,
  saveNote,
  formData,
  stateAccount,
  updateNote,
  saveAccount,
  deleteAccount,
};
