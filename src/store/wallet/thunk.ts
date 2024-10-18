import { getEnvirables } from "../../helpers";
import { activeAccountHelper } from "../../helpers/wallet";
import {
  NoteProps,
  UsersAccount,
  UsersAccountFormik,
} from "../../interface/walletApp";
import { RootState } from "../store";
import { setClose } from "../ui/uiSlice";
import {
  setActiveAccount,
  setActiveNote,
  setDeleteAccount,
  setFilterState,
  setNotes,
  setSaveAllUserAccounts,
  setSaveNewAccount,
  setSaveNote,
  setUpdateAccount,
} from "./walletSlice";

const { VITE_API_URL } = getEnvirables();

export const startGetDataDB = () => {
  return async (
    dispatch: (arg0: {
      payload: UsersAccount[] | NoteProps[];
      type: "wallet/setSaveAllUserAccounts" | "wallet/setNotes";
    }) => void
  ) => {
    try {
      const responseAccounts = await fetch(VITE_API_URL);
      const { data } = (await responseAccounts.json()) as {
        data: UsersAccount[];
      };
      dispatch(setSaveAllUserAccounts(data));
      const getNotes = activeAccountHelper({ init: data }) as UsersAccount;
      const responseNotes = await fetch(
        `${VITE_API_URL}/notes/${getNotes._id}`
      );
      const { notes } = (await responseNotes.json()) as { notes: NoteProps[] };
      dispatch(setNotes(notes));
    } catch (error) {
      console.log(error, "startGetDataDB");
    }
  };
};

export const startSavingActiveAccount = (account: UsersAccount | undefined) => {
  return async (
    dispatch: (arg0: {
      payload: UsersAccount | undefined | NoteProps[];
      type: "wallet/setActiveAccount" | "wallet/setNotes";
    }) => void
  ) => {
    dispatch(setActiveAccount(account));
    try {
      const idAccount = activeAccountHelper({ account }) as UsersAccount;
      const responseNotes = await fetch(
        `${VITE_API_URL}/notes/${idAccount._id}`
      );
      const { notes } = (await responseNotes.json()) as { notes: NoteProps[] };
      dispatch(setNotes(notes));
    } catch (error) {
      console.log(error, "startSavingActiveAccount");
    }
  };
};

export const startUpdateAccount = (account: UsersAccount) => {
  return async (
    dispatch: (arg0: {
      payload: UsersAccount;
      type: "wallet/setUpdateAccount";
    }) => void
  ) => {
    console.log(account);
    dispatch(setUpdateAccount(account));
    try {
      const response = await fetch(`${VITE_API_URL}/account/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(account),
      });
      const result = await response.json();
      if (result.ok) {
        activeAccountHelper({ account });
      }
    } catch (error) {
      console.log(error, "startUpdateAccount");
    }
  };
};

export const startSavingAccount = (account: UsersAccountFormik) => {
  return async (
    dispatch: (arg0: {
      payload: UsersAccount;
      type: "wallet/setSaveNewAccount";
    }) => void
  ) => {
    try {
      const response = await fetch(`${VITE_API_URL}/account/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(account),
      });
      const data = await response.json();
      if (data.ok) {
        const newAccount = {
          ...account,
          _id: data._id,
        };
        dispatch(setSaveNewAccount(newAccount as UsersAccount));
        activeAccountHelper({ account: newAccount });
      }
    } catch (error) {
      console.log(error, "startSavingAccount");
    }
  };
};

// ! falta get notes hacer un fetch y subirlo a la store
export const startDeleteAccount = () => {
  return async (
    dispatch: (arg0: {
      payload: string | UsersAccount | undefined;
      type: "wallet/setDeleteAccount" | "wallet/setActiveAccount";
    }) => void,
    getState: () => RootState
  ) => {
    const { _id } = activeAccountHelper({}) as UsersAccount;
    try {
      const response = await fetch(`${VITE_API_URL}/account/delete/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (data.ok) {
        dispatch(setDeleteAccount(data.id ? data.id : _id));
        const accounts = getState().wallet.accounts;

        dispatch(
          setActiveAccount(
            activeAccountHelper({ deleteAccount: true, init: accounts })
          )
        );
        // dispatch(setActiveAccount())
      }
    } catch (error) {
      console.log(error, "startDeleteAccount");
    }
  };
};

// !checar

export const startSavingActiveNote = (note: NoteProps) => {
  return async (
    dispatch: (arg0: {
      payload: NoteProps | undefined;
      type: "wallet/setActiveNote";
    }) => void
  ) => {
    dispatch(setActiveNote(note));
  };
};

export const startResetActiveNote = () => {
  return async (
    dispatch: (arg0: {
      payload: NoteProps | undefined;
      type: "wallet/setActiveNote" | "ui/setClose";
    }) => void
  ) => {
    dispatch(setClose());
    dispatch(setActiveNote(undefined));
  };
};

export const startGetNotesDB = (data: NoteProps[]) => {
  return async (
    dispatch: (arg0: {
      payload: NoteProps[] | [];
      type: "wallet/setNotes";
    }) => void
  ) => {
    dispatch(setNotes(data));
  };
};

export const startDeleteNote = (id: string) => {
  return async (
    dispatch: (arg0: {
      payload: NoteProps[] | null | undefined | NoteProps;
      type: "wallet/setNotes" | "wallet/setActiveNote";
    }) => void,
    getState: () => RootState
  ) => {
    const notes = getState().wallet.notes;
    const newNotes = notes?.filter((idNote) => idNote._id !== id);
    dispatch(setNotes(newNotes as NoteProps[]));
    dispatch(setActiveNote(undefined));
  };
};

export const startSavingNewNote = (NoteProps: NoteProps) => {
  return async (
    dispatch: (arg0: { payload: NoteProps; type: "wallet/setSaveNote" }) => void
  ) => {
    const { date } = NoteProps;
    const newDate = new Date(date).getTime();
    const note = {
      ...NoteProps,
      date: newDate,
    };
    dispatch(setSaveNote(note));
  };
};

export const startFilteringState = (value: string) => {
  return async (
    dispatch: (arg0: { payload: string; type: "wallet/setFilterState" }) => void
  ) => {
    dispatch(setFilterState(value));
  };
};
