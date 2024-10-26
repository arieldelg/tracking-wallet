import { AxiosResponse } from "axios";
import { walletAPI } from "../../api/walletAPI";
import { NoteProps, UsersAccount } from "../../interface/walletApp";
import { getEnvirables } from "../getEnvirables";
import { setActiveNoteSlice } from "../../store/wallet/walletSlice";
const { VITE_API_URL } = getEnvirables();

const activeAccountHelper = ({
  account,
  refresh,
}: {
  account?: string;
  refresh?: boolean;
}): string => {
  const isTrue = localStorage.getItem("activeAccount");

  if (isTrue === null) {
    localStorage.setItem("activeAccount", account!);
    return account as string;
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

    return data.images;
  } catch (error) {
    console.log(error, "startSavingImages");
  }
};

/**
 * @param deleteArray array of strings
 * @returns void
 * @summary need to send array of id or single id to delete images
 */
const deleteImg = async (deleteArray: string[]) => {
  if (deleteArray.length === 0) return;

  try {
    const response = await walletAPI.post(
      `${VITE_API_URL}/image/delete`,
      deleteArray
    );
    console.log(response);
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
};
