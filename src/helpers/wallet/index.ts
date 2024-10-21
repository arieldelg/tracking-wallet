import { walletAPI } from "../../api/walletAPI";
import { NoteProps, UsersAccount } from "../../interface/walletApp";
import { getEnvirables } from "../getEnvirables";
const { VITE_API_URL } = getEnvirables();

/**
 * TODO queda pendiente activeAccountHelper, (delete)
 */

const activeAccountHelper = ({
  account,
  deleteAccount,
  init,
}: {
  account?: UsersAccount;
  id?: string;
  init?: UsersAccount[];
  deleteAccount?: boolean;
}) => {
  const istrue = localStorage.getItem("activeAccount");

  if (init && istrue === null) {
    localStorage.setItem("activeAccount", JSON.stringify(init[0]));
    return init[0];
  }

  if (account) {
    localStorage.setItem("activeAccount", JSON.stringify(account));
    return account;
  }

  if (deleteAccount && init) {
    localStorage.setItem("activeAccount", JSON.stringify(init[0]));
    return init[0];
  }

  return JSON.parse(localStorage.getItem("activeAccount") as string);
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

const activeNoteCallback = ({
  note,
  newAccount,
}: {
  note?: NoteProps;
  newAccount?: boolean;
}) => {
  const isTrue = localStorage.getItem("activeNote");
  if (isTrue === null && newAccount === false) {
    console.log("activeNoteCallback / isTrue === null");
    localStorage.setItem("activeNote", JSON.stringify(note));
    return note;
  }

  if (note) {
    console.log("activeNoteCallback / note");
    localStorage.setItem("activeNote", JSON.stringify(note));
    return note;
  }

  if (newAccount === true) {
    localStorage.removeItem("activeNote");
    return [];
  }
  console.log("activeNoteCallback / llegue al final");
  return JSON.parse(localStorage.getItem("activeNote") as string);
};

/**
 *
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

const ifActiveNoteExist = () => {
  const istrue = !!activeNoteCallback({});
  const activeNote = istrue
    ? ({
        ...activeNoteCallback({}),
        date: new Date(activeNoteCallback({})?.date),
      } as NoteProps)
    : false;

  return activeNote;
};

const savingImages = async (files: FileList[]) => {
  if (files.length === 0) return;
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

export {
  activeAccountHelper,
  keyWordFilter,
  activeNoteCallback,
  date,
  ifActiveNoteExist,
  savingImages,
};
