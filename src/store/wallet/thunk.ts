import { AxiosResponse } from "axios";
import { walletAPI } from "../../api/walletAPI";
import { getEnvirables } from "../../helpers";
import {
  activeAccountHelper,
  activeNoteCallback as activeNoteHelper,
  deleteImg,
  getAccounts,
  getNotes,
  savingImages,
} from "../../helpers/wallet";
import {
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
      payload:
        | UsersAccount[]
        | UsersAccount
        | undefined
        | NoteProps[]
        | NoteProps;
      type:
        | "wallet/setSaveAllUserAccounts"
        | "wallet/setActiveAccount"
        | "wallet/setNotes"
        | "wallet/setActiveNoteSlice";
    }) => void
  ) => {
    try {
      const accounts = await getAccounts();
      dispatch(setSaveAllUserAccounts(accounts));

      const getAccountActive = activeAccountHelper({
        refresh: true,
        account: accounts[0]._id,
      });

      const [account] = accounts.filter(
        (account) => account._id === getAccountActive
      );

      dispatch(setActiveAccount(account));

      if (getAccountActive) {
        const notes = await getNotes(getAccountActive as string);
        const id = activeNoteHelper({ refresh: true, note: notes[0]._id });
        const filterNote = notes.find((note) => note._id === id);
        dispatch(setNotes(notes));
        dispatch(setActiveNoteSlice(filterNote));
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
export const startSavingActiveAccount = (account: UsersAccount) => {
  return async (
    dispatch: (arg0: {
      payload: UsersAccount | undefined | NoteProps[];
      type: "wallet/setActiveAccount" | "wallet/setNotes";
    }) => void
  ) => {
    dispatch(setActiveAccount(account));
    activeAccountHelper({
      account: account?._id,
    });

    try {
      const notes = await getNotes(account._id);
      dispatch(setNotes(notes));

      if (notes.length === 0) {
        // ! is not a new account but makes the same job as deleting active acount on local storage when no notes found on the account
        activeNoteHelper({ newAccount: true });
      } else {
        activeNoteHelper({ note: notes[0]._id });
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
 * @summary Update changes made to account
 */
export const startUpdateAccount = (account: UsersAccount) => {
  return async (
    dispatch: (arg0: {
      payload: UsersAccount;
      type: "wallet/setUpdateAccount";
    }) => void
  ) => {
    dispatch(setUpdateAccount(account));
    try {
      const { data } = (await walletAPI.put(
        `${VITE_API_URL}/account/update`,
        account
      )) as AxiosResponse<{ ok: boolean }>;

      activeAccountHelper({ account: account._id });
      if (!data.ok) throw new Error("Error Enpoint account update");
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
      payload: UsersAccount | [] | NoteProps[] | UsersAccount | undefined;
      type:
        | "wallet/setSaveNewAccount"
        | "wallet/setNotes"
        | "wallet/setActiveAccount";
    }) => void
  ) => {
    try {
      const {
        data: { account: singleAccount, ok },
      } = (await walletAPI.post(
        `${VITE_API_URL}/account/new`,
        account
      )) as AxiosResponse<{ ok: boolean; account: UsersAccount }>;

      if (!ok) {
        throw new Response("", {
          status: 400,
          statusText: "Error en llamado API startDeleteAccount/Delete Account",
        });
      }

      dispatch(setSaveNewAccount(singleAccount as UsersAccount));

      activeAccountHelper({ account: singleAccount._id });
      dispatch(setActiveAccount(singleAccount));
      activeNoteHelper({ newAccount: true });
      dispatch(setNotes([]));
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
    const account = activeAccountHelper({}) as string;
    dispatch(setDeleteAccount(account));

    try {
      const { data } = await walletAPI.delete(`/account/delete/${account}`);

      if (!data.ok) {
        throw new Response("", {
          status: 400,
          statusText: "Error en llamado API startDeleteAccount/Delete Account",
        });
      }

      const [accounts] = getState().wallet.accounts;

      const activeAccount = activeAccountHelper({
        account: accounts._id,
      }) as string;
      dispatch(setActiveAccount(accounts));

      const notes = await getNotes(activeAccount);

      dispatch(setNotes(notes));
      activeNoteHelper({ newAccount: true });
    } catch (error) {
      console.log(error, "startDeleteAccount");
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

      const {
        data: { account, message, note: newNote, ok },
      } = (await walletAPI.post(
        `${VITE_API_URL}/note/new`,
        note
      )) as AxiosResponse<{
        ok: boolean;
        note: NoteProps;
        account: UsersAccount;
        message: string;
      }>;

      if (!ok) throw new Error(message);

      const activeNote = activeNoteHelper({ note: newNote._id });

      // const index = Notes.findIndex((note) => note._id === newNote._id);
      const notes = Notes.splice(0, 1, newNote);

      dispatch(setActiveNoteSlice(activeNote));
      dispatch(setNotes(notes));

      // const { data: accountData } = (await walletAPI.get(
      //   `${VITE_API_URL}/account/${accountID}`
      // )) as AxiosResponse<{ account: UsersAccount; ok: boolean }>;

      activeAccountHelper({ account: account._id });
      dispatch(setActiveAccount(account));
    } catch (error) {
      console.log(error);
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

      dispatch(setActiveNoteSlice(activeNoteHelper({ note: internalNote })));
      dispatch(setUpdateNote(internalNote));
      return true;
    } catch (error) {
      console.log(error, "startSavingUpdatingNote");
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
    activeNoteHelper({ newAccount: true });
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
    const { _id } = activeNoteHelper({}) as NoteProps;

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
    activeNoteHelper({ note });
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
