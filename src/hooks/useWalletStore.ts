import { useCallback } from "react";
import {
  IMG,
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
  startGetDataDB,
  startFilteringState,
  startSavingActiveNote,
  startSavingAccount,
  startSavingActiveAccount,
  startSavingNewNote,
  startSavingUpdatingNote,
  startUpdateAccount,
  startSavingImage,
  startResetActiveNote,
} from "../store/wallet/thunk";
import {
  ActiveNoteSelector,
  FilterNotesSelector,
  GetActiveAcountSelector,
  GetAllUserAccountsDB,
  GetNotesDBSelector,
  setActiveAccount,
  // setActiveNoteSlice,
  // setSaveNote,
} from "../store/wallet/walletSlice";
import {
  activeAccountHelper,
  activeNoteHelper,
  keyWordFilter,
} from "../helpers/wallet";
// import { useNavigate } from "react-router-dom";

const useWalletStore = () => {
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const filter = useAppSelector(FilterNotesSelector);
  const notes = useAppSelector(GetNotesDBSelector) as NoteProps[];
  const activeNote = useAppSelector(ActiveNoteSelector);
  const isOpenModal = useAppSelector(OpenModalSelector);
  const isOpenModalDelete = useAppSelector(OpenModalDeleteSelector);
  const Accounts = useAppSelector(GetAllUserAccountsDB);
  const activeAccount = useAppSelector(GetActiveAcountSelector);

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
  }, [notes]);

  const setFilter = useCallback(
    ({ props }: { props?: string }) => {
      if (props) {
        console.log("setFilter");
        dispatch(startFilteringState(props));
        keyWordFilter({ key: props });
        dispatch(startSavingActiveNote(filterBy().firstValues));
        activeNoteHelper({ note: filterBy().firstValues._id });
      }
    },
    [dispatch, filterBy]
  );

  //! si desactivo el active note cuando salga del modal puede servir de algo

  //* si no existe el estado activeNote y recibe un array de notas, agrega el active note del array[0], si nomas recibe la nota y si existe el active note saca el active note del parametro note enviado
  const setActiveNote = (id?: string) => {
    if (activeNote === undefined) {
      activeNoteHelper({ note: notes[0]._id });
      dispatch(startSavingActiveNote(notes[0]));
    }
    if (id) {
      const filterNote = notes.find((note) => note._id === id);
      console.log(id);
      activeNoteHelper({ note: id });
      if (filterNote) dispatch(startSavingActiveNote(filterNote));
    }
  };

  //* para abrir el modal con id #modal y si tiene parametro de note que lo agrege al estado y al locale
  const setOpenModal = (id?: string) => {
    dispatch(setOpen());
    if (id) {
      activeNoteHelper({ note: id });
      const filterNotes = notes.find((note) => note._id === id) as NoteProps;
      dispatch(startSavingActiveNote(filterNotes));
    }
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

  //* para actualizar la nota
  const setSaveNoteHK = ({
    values,
    files,
    deleteImages,
    previewIMG,
  }: {
    values: NoteProps;
    files: File[];
    deleteImages: string[];
    previewIMG: IMG[];
  }) => {
    if (!values._id) {
      //* Database image and notes
      dispatch(startSavingImage(files));
      dispatch(startSavingNewNote(values, files));
      //* optimistic
      // const noteID = {
      //   ...values,
      //   date: new Date(values.date).getTime() as unknown as Date,
      //   _id: activeNoteHelper({}) as string,
      //   account: activeAccount?._id as string,
      //   images: [...previewIMG],
      // };
      // dispatch(setActiveNoteSlice(noteID));
      // dispatch(setSaveNote(noteID));
    } else {
      const optimistic = {
        ...values,
        date: new Date(values.date).getTime() as unknown as Date,
        images: previewIMG,
      };
      dispatch(
        startSavingUpdatingNote(values, files, deleteImages, optimistic)
      );
    }
  };

  //* resetea active note en la store, localstorage, y el estado filterState
  const reset = () => {
    keyWordFilter({ key: "reset" });
    dispatch(startFilteringState("reset"));
  };

  const resetNewButton = () => {
    dispatch(startResetActiveNote());
    activeNoteHelper({ newNote: true });
  };

  //* para cerrar el modal con id #modal
  const setCloseModal = () => {
    dispatch(setClose());
  };

  //* para crear un nuevo account, agregarlo a DB y al store y activarlo
  const setSaveAccount = (account: UsersAccountFormik) => {
    dispatch(startSavingAccount(account));
    dispatch(setClose());
  };

  //* para guardar los cambios hechos al acount
  const setUpdateAccount = (account: UsersAccount) => {
    dispatch(startUpdateAccount(account));
    dispatch(setClose());
  };

  //* para tener como active acount en el store
  const activeAccountHK = (account: UsersAccount) => {
    dispatch(startSavingActiveAccount(account));
  };

  //* para resetear el actual active account
  const setResetAccount = () => {
    dispatch(setActiveAccount(undefined));
  };

  //* para eliminar una cuenta
  const setDeleteAccount = () => {
    dispatch(startDeleteAccount());
    dispatch(setCloseDelete());
  };

  //* cuando se regarga la pagina
  const startApplication = useCallback(() => {
    dispatch(startGetDataDB());
  }, [dispatch]);

  const getActiveAcountLocaleStorage = () => {
    const id = activeAccountHelper({});
    const filterAccounts = Accounts.find((account) => account._id === id);
    dispatch(setActiveAccount(filterAccounts));
  };

  return {
    // Method
    setOpenModal,
    deleteNote,
    reset,
    setActiveNote,
    setFilter,
    setCloseModal,
    setSaveAccount,
    activeAccountHK,
    setResetAccount,
    setDeleteAccount,
    filterBy,
    startApplication,
    setUpdateAccount,
    setOpenModalDelete,
    setCloseModalDelete,
    setSaveNoteHK,
    getActiveAcountLocaleStorage,
    resetNewButton,
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
