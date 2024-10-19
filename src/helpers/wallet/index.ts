import { NoteProps, UsersAccount } from "../../interface/walletApp";

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
    localStorage.setItem("activeNote", JSON.stringify(note));
    return note;
  }

  if (note) {
    localStorage.setItem("activeNote", JSON.stringify(note));
    return note;
  }

  if (newAccount === true) {
    localStorage.removeItem("activeNote");
    return [];
  }

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
  props: number;
  format?: string;
}) => {
  const rawDate = new Date(props);
  const date = new Intl.DateTimeFormat(format).format(rawDate);
  return date;
};

export { activeAccountHelper, keyWordFilter, activeNoteCallback, date };
