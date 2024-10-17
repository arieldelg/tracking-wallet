import { useCallback } from "react";
import {
  NoteProps,
  UsersAccount,
  UsersAccountFormik,
} from "../interface/walletApp";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { OpenModalSelector, setClose, setOpen } from "../store/ui/uiSlice";
import {
  startDeleteAccount,
  startDeleteNote,
  startFilteringState,
  startGetAccountsDB,
  startGetNotesDB,
  startResetActiveNote,
  startSavingAccount,
  startSavingActiveAccount,
  startSavingActiveNote,
  startSavingEditAccount,
} from "../store/wallet/thunk";
import {
  ActiveNoteSelector,
  FilterNotesSelector,
  GetActiveAcountSelector,
  GetAllUserAccountsDB,
  GetNotesDBSelector,
} from "../store/wallet/walletSlice";

const useWalletStore = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(FilterNotesSelector);
  const notes = useAppSelector(GetNotesDBSelector) as NoteProps[];
  const activeNote = useAppSelector(ActiveNoteSelector);
  const isOpenModal = useAppSelector(OpenModalSelector);
  const Accounts = useAppSelector(GetAllUserAccountsDB);
  const activeAccount = useAppSelector(GetActiveAcountSelector);

  const activeAccountMemo = useCallback(
    ({
      account,
      deleteAccount,
    }: {
      account?: UsersAccount;
      deleteAccount?: boolean;
    }) => {
      const istrue = localStorage.getItem("activeAccount");
      if (Accounts.length === 0) return false;

      if (!istrue && Accounts.length > 0) {
        localStorage.setItem("activeAccount", JSON.stringify(Accounts[0]));
        return Accounts[0];
      }
      if (account) {
        localStorage.setItem("activeAccount", JSON.stringify(account));
        return account;
      }
      const activeCompare = JSON.parse(
        localStorage.getItem("activeAccount") as string
      ) as UsersAccount;
      if (deleteAccount) {
        if (activeAccount?.id !== activeCompare?.id) {
          localStorage.removeItem("activeAccount");
        }
      }

      return JSON.parse(localStorage.getItem("activeAccount") as string);
    },

    [Accounts, activeAccount]
  );

  const setOpenModal = (props?: NoteProps) => {
    dispatch(setOpen());
    if (props) dispatch(startSavingActiveNote(props));
  };
  const deleteNote = (id: string) => {
    dispatch(startDeleteNote(id));
  };
  const reset = () => {
    dispatch(startResetActiveNote());
  };
  const setActiveNote = (props: NoteProps) => {
    dispatch(startSavingActiveNote(props));
  };
  const setFilter = (props: string) => {
    dispatch(startFilteringState(props));
  };
  const resetFilter = () => {
    dispatch(startFilteringState("reset"));
  };
  const setCloseModal = () => {
    dispatch(setClose());
  };
  const setSaveAccount = (account: UsersAccountFormik) => {
    dispatch(startSavingAccount(account));
    dispatch(setClose());
  };
  const setSaveAllUserAccounts = (account: UsersAccount[]) => {
    dispatch(startGetAccountsDB(account));
  };
  const setSaveAllNotesDB = (notes: NoteProps[]) => {
    dispatch(startGetNotesDB(notes));
  };
  const setEditAccount = (account?: UsersAccount) => {
    dispatch(startSavingActiveAccount(account));
    if (account) activeAccountMemo({ account });
    if (!activeAccount)
      dispatch(startSavingActiveAccount(activeAccountMemo({})));
  };
  const setResetAccount = () => {
    dispatch(startSavingActiveAccount(undefined));
  };
  const setSaveEditAccount = (account: UsersAccount) => {
    dispatch(startSavingEditAccount(account));
    dispatch(setClose());
  };
  const setDeleteAccount = (id: string) => {
    dispatch(startDeleteAccount(id));
    activeAccountMemo({ deleteAccount: true });
  };

  return {
    // Method
    setOpenModal,
    deleteNote,
    reset,
    setActiveNote,
    setFilter,
    resetFilter,
    setCloseModal,
    setSaveAccount,
    setSaveAllUserAccounts,
    setSaveAllNotesDB,
    setEditAccount,
    setResetAccount,
    setSaveEditAccount,
    setDeleteAccount,
    activeAccountMemo,
    //state store
    filter,
    notes,
    activeNote,
    isOpenModal,
    Accounts,
    activeAccount,
  };
};

export default useWalletStore;
