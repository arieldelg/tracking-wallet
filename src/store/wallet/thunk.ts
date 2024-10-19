import axios from "axios";
import { walletAPI } from "../../api/walletAPI";
import { getEnvirables } from "../../helpers";
import { activeAccountHelper, activeNoteCallback } from "../../helpers/wallet";
import {
  DataAxiosNote,
  InitialValues,
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
  setUpdateAccount,
  setUpdateNote,
} from "./walletSlice";

const { VITE_API_URL } = getEnvirables();

/**
 * @param none
 * @returns none
 * @summary get all the user Data account and in a near future all the settings when entering the app
 */
export const startGetDataDB = () => {
  return async (
    dispatch: (arg0: {
      payload:
        | UsersAccount[]
        | NoteProps[]
        | UsersAccount
        | undefined
        | NoteProps;
      type:
        | "wallet/setSaveAllUserAccounts"
        | "wallet/setNotes"
        | "wallet/setActiveAccount"
        | "wallet/setActiveNote";
    }) => void
  ) => {
    try {
      const {
        data: { accounts },
      } = (await axios.get(VITE_API_URL)) as {
        data: { accounts: UsersAccount[] };
      };

      dispatch(setSaveAllUserAccounts(accounts));

      const getNotes = activeAccountHelper({ init: accounts }) as UsersAccount;
      dispatch(setActiveAccount(getNotes));

      const responseNotes = await fetch(
        `${VITE_API_URL}/notes/${getNotes._id}`
      );
      const { notes } = (await responseNotes.json()) as { notes: NoteProps[] };
      console.log(notes);
      dispatch(setNotes(notes));

      //! estar al pendiente de esta funcion
      dispatch(setActiveNote(activeNoteCallback({})));
    } catch (error) {
      console.log(error, "startGetDataDB");
    }
  };
};

/**
 * @param account / UsersAccount
 * @returns null
 * @summary Active account when selecting it and get all the notes related to it
 */
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
      if (notes.length === 0) {
        // ! is not a new account but makes the same job as deleting active acount on local storage when no notes found on the account
        dispatch(setNotes(activeNoteCallback({ newAccount: true })));
      } else {
        activeNoteCallback({ note: notes[0] });
        dispatch(setNotes(notes));
      }
    } catch (error) {
      console.log(error, "startSavingActiveAccount");
    }
  };
};

// * creo que puedo sacar el active Account helper para afuera ya que no ocupo sacra el estado para actualizarlo
/**
 * @param account type UsersAccount
 * @returns null
 * @todo falta active note????
 * @summary Update changes made to account
 */
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

/**
 * @param account / UsersAccount
 * @returns null
 * @summary Active account saving a new and get all the notes related to it
 */
export const startSavingAccount = (account: UsersAccountFormik) => {
  return async (
    dispatch: (arg0: {
      payload: UsersAccount | [] | NoteProps[];
      type: "wallet/setSaveNewAccount" | "wallet/setNotes";
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
      if (!data.ok) {
        throw new Response("", {
          status: 400,
          statusText: "Error en llamado API startDeleteAccount/Delete Account",
        });
      }
      const newAccount = {
        ...account,
        _id: data._id,
      };
      dispatch(setSaveNewAccount(newAccount as UsersAccount));
      activeAccountHelper({ account: newAccount });

      dispatch(setNotes([]));

      activeNoteCallback({ newAccount: true });
    } catch (error) {
      console.log(error, "startSavingAccount");
    }
  };
};

/**
 * @param none
 * @returns null
 * @todo falta active note
 * @summary Deletes account and all the bills that are related to the account
 */
export const startDeleteAccount = () => {
  return async (
    dispatch: (arg0: {
      payload: string | UsersAccount | undefined | NoteProps[];
      type:
        | "wallet/setDeleteAccount"
        | "wallet/setActiveAccount"
        | "wallet/setNotes";
    }) => void,
    getState: () => RootState
  ) => {
    const { _id } = activeAccountHelper({}) as UsersAccount;
    try {
      const { data } = await walletAPI.delete(`/account/delete/${_id}`);

      if (!data.ok) {
        throw new Response("", {
          status: 400,
          statusText: "Error en llamado API startDeleteAccount/Delete Account",
        });
      }

      dispatch(setDeleteAccount(data.id ? data.id : _id));
      const accounts = getState().wallet.accounts;

      const activeAccount = activeAccountHelper({
        deleteAccount: true,
        init: accounts,
      }) as UsersAccount;
      dispatch(setActiveAccount(activeAccount));

      const notesData = (await walletAPI.get(
        `/notes/${activeAccount._id}`
      )) as DataAxiosNote;

      if (!notesData.data.ok) {
        throw new Response("", {
          status: 400,
          statusText: "Error en llamado API startDeleteAccount/Delete Notes",
        });
      }

      dispatch(setNotes(notesData.data.notes));
    } catch (error) {
      console.log(error, "startDeleteAccount");
    }
  };
};

export const startSavingUpdatingNote = (value: NoteProps) => {
  return async (
    dispatch: (arg0: {
      payload: NoteProps | undefined;
      type: "wallet/setUpdateNote" | "wallet/setActiveNote";
    }) => void
  ) => {
    const updatedNote = {
      ...value,
      date: new Date(value.date).getTime(),
    };
    try {
      const { data } = await walletAPI.put(
        `${VITE_API_URL}/note/update/${value._id}`,
        updatedNote
      );

      if (!data.ok) {
        throw new Response("", {
          status: 400,
          statusText:
            "Error en llamado API startSavingUpdatingNote/Updated Notes",
        });
      }

      const internalNote = {
        ...value,
        date: new Date(updatedNote.date).getTime() as unknown as Date,
      };

      dispatch(setUpdateNote(internalNote));
      dispatch(setActiveNote(activeNoteCallback({ note: internalNote })));
    } catch (error) {
      console.log(error, "startSavingUpdatingNote");
    }
  };
};

export const startSavingNewNote = (NoteProps: InitialValues) => {
  return async (
    dispatch: (arg0: { payload: NoteProps; type: "wallet/setSaveNote" }) => void
  ) => {
    const { date } = NoteProps;
    const newDate = new Date(date).getTime();
    const note = {
      ...NoteProps,
      date: newDate,
    };
    // dispatch(setSaveNote(note));
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
    console.log("startSavingActiveNote");
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

export const startFilteringState = (value: string) => {
  return async (
    dispatch: (arg0: { payload: string; type: "wallet/setFilterState" }) => void
  ) => {
    dispatch(setFilterState(value));
  };
};
