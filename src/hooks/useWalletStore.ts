import { useCallback } from "react";
import {
  NoteProps,
  UsersAccount,
  UsersAccountFormik,
} from "../interface/walletApp";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  OpenModalDeleteSelector,
  OpenModalSelector,
  setClose,
  setCloseDelete,
  setOpen,
  setOpenDelete,
} from "../store/ui/uiSlice";
import {
  startDeleteAccount,
  startDeleteNote,
  startFilteringState,
  startGetDataDB,
  startGetNotesDB,
  startResetActiveNote,
  startSavingAccount,
  startSavingActiveAccount,
  startSavingActiveNote,
  startUpdateAccount,
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
  const isOpenModalDelete = useAppSelector(OpenModalDeleteSelector);
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

  // const activeAccountMemo = useCallback(
  //   ({
  //     account,
  //     id,
  //     init,
  //     deleteAccount,
  //   }: {
  //     account?: UsersAccount;
  //     id?: string;
  //     init?: UsersAccount[];
  //     deleteAccount?: boolean;
  //   }) => {
  //     const istrue = localStorage.getItem("activeAccount");
  //     if (init?.length === 0) {
  //       return false;
  //     }

  //     if (init) {
  //       if (!istrue && init?.length > 0) {
  //         localStorage.setItem("activeAccount", JSON.stringify(init[0]));

  //         return init[0];
  //       }
  //     }

  //     if (account) {
  //       localStorage.setItem("activeAccount", JSON.stringify(account));
  //       return account;
  //     }

  //     const activeCompare = JSON.parse(
  //       localStorage.getItem("activeAccount") as string
  //     ) as UsersAccount;

  //     if (id && deleteAccount) {
  //       if (id === activeCompare._id) {
  //         localStorage.setItem("activeAccount", JSON.stringify(Accounts[0]));
  //         return Accounts[0];
  //       }
  //     }

  //     return JSON.parse(localStorage.getItem("activeAccount") as string);
  //   },

  //   [Accounts]
  // );

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
        activeNoteCallback({ note: filterBy().firstValues });
      }
    },
    [activeNoteCallback, dispatch, filterBy, keyWordFilter]
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

  const setOpenModal = ({ note }: { note?: NoteProps }) => {
    dispatch(setOpen());
    if (note) dispatch(startSavingActiveNote(note));
  };

  const setOpenModalDelete = () => {
    dispatch(setOpenDelete());
  };
  const setCloseModalDelete = () => {
    dispatch(setCloseDelete());
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

  const setSaveAllNotesDB = useCallback(
    (notes: NoteProps[]) => {
      dispatch(startGetNotesDB(notes));
    },
    [dispatch]
  );

  const setUpdateAccount = (account: UsersAccount) => {
    dispatch(startUpdateAccount(account));
    dispatch(setClose());
  };

  const setEditAccount = useCallback(
    (account?: UsersAccount) => {
      dispatch(startSavingActiveAccount(account));
    },
    [dispatch]
  );
  const setResetAccount = () => {
    dispatch(startSavingActiveAccount(undefined));
  };
  const setSaveEditAccount = (account: UsersAccount) => {
    dispatch(startSavingEditAccount(account));
    dispatch(setClose());
  };
  const setDeleteAccount = () => {
    dispatch(startDeleteAccount());
    dispatch(setCloseDelete());
  };

  const startApplication = useCallback(() => {
    dispatch(startGetDataDB());
  }, [dispatch]);

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
    setSaveAllNotesDB,
    setEditAccount,
    setResetAccount,
    setSaveEditAccount,
    setDeleteAccount,
    keyWordFilter,
    filterBy,
    startApplication,
    setUpdateAccount,
    setOpenModalDelete,
    setCloseModalDelete,
    //state store
    filter,
    notes,
    activeNote,
    isOpenModal,
    Accounts,
    activeAccount,
    isOpenModalDelete,
  };
};

export default useWalletStore;
