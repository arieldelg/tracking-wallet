import { AxiosResponse } from "axios";
import { walletAPI } from "../../api/walletAPI";
import { getEnvirables } from "../../helpers";
import {
  activeAccountHelper,
  activeNoteCallback,
  deleteImg,
  getAccounts,
  getNotes,
  savingImages,
} from "../../helpers/wallet";
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
  setActiveNoteSlice,
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
      payload: UsersAccount[] | UsersAccount | undefined | NoteProps[];
      type:
        | "wallet/setSaveAllUserAccounts"
        | "wallet/setActiveAccount"
        | "wallet/setNotes";
    }) => void
  ) => {
    try {
      const accounts = await getAccounts();
      dispatch(setSaveAllUserAccounts(accounts));

      const getAccountActive = activeAccountHelper({
        init: accounts,
      });

      const [account] = accounts.filter(
        (account) => account._id === getAccountActive
      );

      dispatch(setActiveAccount(account));

      if (getAccountActive) {
        const notes = await getNotes(getAccountActive as string);
        dispatch(setNotes(notes));
      }
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
    const idAccount = activeAccountHelper({
      account: account?._id,
    }) as string;

    try {
      const notes = await getNotes(idAccount);
      dispatch(setNotes(notes));

      if (notes.length === 0) {
        // ! is not a new account but makes the same job as deleting active acount on local storage when no notes found on the account
        activeNoteCallback({ newAccount: true });
      } else {
        activeNoteCallback({ note: notes[0] });
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
    console.log("startSavingAccount");
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

export const startSavingUpdatingNote = (
  value: NoteProps,
  files: File[],
  deleteImages: string[],
  optimistic: NoteProps
) => {
  return async (
    dispatch: (arg0: {
      payload: NoteProps | undefined;
      type: "wallet/setUpdateNote" | "wallet/setActiveNoteSlice";
    }) => void
  ) => {
    dispatch(setActiveNoteSlice(optimistic));
    const tempArray = [];

    for (const img of value.images) {
      let validation = 0;
      for (const id of deleteImages) {
        if (img.id === id) validation += 1;
      }
      if (validation > 0) continue;
      tempArray.push(img);
    }

    try {
      await deleteImg(deleteImages);
      console.log("ariel");

      const images = await savingImages(files);

      const updatedNote =
        images !== false
          ? {
              ...value,
              date: new Date(value.date).getTime(),
              images: [...tempArray, ...images],
            }
          : {
              ...value,
              date: new Date(value.date).getTime(),
              images: [...tempArray],
            };

      console.log({ updatedNote });
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
        ...updatedNote,
        date: new Date(updatedNote.date).getTime() as unknown as Date,
      };

      dispatch(setActiveNoteSlice(activeNoteCallback({ note: internalNote })));
      dispatch(setUpdateNote(internalNote));
      return true;
    } catch (error) {
      console.log(error, "startSavingUpdatingNote");
    }
  };
};

export const startSavingNewNote = (NoteProps: InitialValues) => {
  return async (
    dispatch: (arg0: {
      payload: NoteProps | undefined | UsersAccount | NoteProps[];
      type:
        | "wallet/setNotes"
        | "wallet/setActiveNoteSlice"
        | "wallet/setActiveAccount";
    }) => void,
    getState: () => RootState
  ) => {
    const accountID = getState().wallet.activeAccount?._id as string;
    const Notes = getState().wallet.notes;

    const { date, ...props } = NoteProps;
    const newDate = new Date(date).getTime() as unknown as Date;

    try {
      const note = {
        ...props,
        date: newDate,
        account: accountID,
      };

      const { data } = await walletAPI.post(`${VITE_API_URL}/note/new`, note);

      if (!data.ok) {
        throw new Response("", {
          status: 400,
          statusText:
            "Error en llamado API startSavingUpdatingNote/Updated Notes",
        });
      }

      const noteID: NoteProps = {
        ...note,
        _id: data._id,
      };

      const activeNote = activeNoteCallback({ note: noteID });
      const allNotes = Notes.map((note, index) => {
        if (index === 0) {
          return {
            ...note,
            ...activeNote,
          };
        }
        return note;
      });

      dispatch(setNotes(allNotes));
      dispatch(setActiveNoteSlice(activeNote));

      const { data: accountData } = (await walletAPI.get(
        `${VITE_API_URL}/account/${accountID}`
      )) as AxiosResponse<{ account: UsersAccount; ok: boolean }>;

      activeAccountHelper({ account: accountData.account });
      dispatch(setActiveAccount(accountData.account));
    } catch (error) {
      console.log(error);
    }
  };
};

export const startDeleteNote = (id: string) => {
  return async (
    dispatch: (arg0: {
      payload: NoteProps[] | null | undefined | NoteProps;
      type: "wallet/setNotes" | "wallet/setActiveNoteSlice";
    }) => void,
    getState: () => RootState
  ) => {
    const notes = getState().wallet.notes;
    const [note] = notes.filter((idNote) => idNote._id === id);
    const newNotes = notes.filter((idNote) => idNote._id !== id);
    const tempArray: string[] = [];
    for (const id of note.images) {
      tempArray.push(id.id);
    }
    dispatch(setNotes(newNotes as NoteProps[]));
    dispatch(setActiveNoteSlice(undefined));
    activeNoteCallback({ newAccount: true });
    try {
      await deleteImg(tempArray);
      const { data } = await walletAPI.delete(
        `${VITE_API_URL}/note/delete/${note._id}`
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
};

export const startSavingImage = (newImg: File[]) => {
  return async () => {
    const resultImages = await savingImages(newImg);
    const { _id } = activeNoteCallback({}) as NoteProps;

    // const images = {
    //   images: resultImages,
    // };

    // console.log(images);
    const {
      data: { note },
    } = (await walletAPI.patch(
      `${VITE_API_URL}/note/imgs/${_id}`,
      resultImages
    )) as AxiosResponse<{ ok: boolean; note: NoteProps }>;

    console.log(note);
    activeNoteCallback({ note });
  };
};

// !checar

export const startSavingActiveNote = (note: NoteProps) => {
  return async (
    dispatch: (arg0: {
      payload: NoteProps | undefined;
      type: "wallet/setActiveNoteSlice";
    }) => void
  ) => {
    console.log("startSavingActiveNote");
    dispatch(setActiveNoteSlice(note));
  };
};

export const startResetActiveNote = () => {
  return async (
    dispatch: (arg0: {
      payload: NoteProps | undefined;
      type: "wallet/setActiveNoteSlice" | "ui/setClose";
    }) => void
  ) => {
    dispatch(setClose());
    dispatch(setActiveNoteSlice(undefined));
  };
};

export const startFilteringState = (value: string) => {
  return async (
    dispatch: (arg0: { payload: string; type: "wallet/setFilterState" }) => void
  ) => {
    dispatch(setFilterState(value));
  };
};
