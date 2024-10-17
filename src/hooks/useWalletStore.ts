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

  const keyWordFilter = useCallback(({ key }: { key?: string }) => {
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
  }, []);

  const filterBy = useCallback(() => {
    switch (keyWordFilter({})) {
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
        const array = [...notes];
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
          firstValues: notes[0],
        };
      }
      default:
        return {
          notes,
          firstValues: notes[0],
        };
    }
  }, [keyWordFilter, notes]);

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

  const activeNoteCallback = useCallback(
    ({ note, initialValue }: { note?: NoteProps; initialValue?: boolean }) => {
      const isTrue = !!localStorage.getItem("activeNote");
      if (!isTrue) {
        console.log(note);
        localStorage.setItem("activeNote", JSON.stringify(note));
        return note;
      }

      if (note) {
        localStorage.setItem("activeNote", JSON.stringify(note));
        return note;
      }

      if (initialValue) {
        // console.log(notes);
      }

      return JSON.parse(localStorage.getItem("activeNote") as string);
    },
    []
  );

  const setFilter = useCallback(
    ({ props }: { props?: string }) => {
      if (props) {
        dispatch(startFilteringState(props));
        keyWordFilter({ key: props });
        dispatch(startSavingActiveNote(filterBy().firstValues));
      }
    },
    [dispatch, filterBy, keyWordFilter]
  );

  const setActiveNote = useCallback(
    ({ note, allNote }: { note?: NoteProps; allNote?: NoteProps[] }) => {
      if (!activeNote) {
        dispatch(
          startSavingActiveNote(
            activeNoteCallback({ initialValue: true, note: allNote![0] })
          )
        );
      }
      if (note) {
        dispatch(startSavingActiveNote(activeNoteCallback({ note: note })));
      }
    },
    [activeNote, activeNoteCallback, dispatch]
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
    keyWordFilter,
    filterBy,
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
