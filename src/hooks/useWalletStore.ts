import { useCallback } from "react";
import {
  IMG,
  InitialValues,
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
  // startResetActiveNote,
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
  setActiveNoteSlice,
  setSaveNote,
} from "../store/wallet/walletSlice";
import {
  activeAccountHelper,
  activeNoteCallback,
  keyWordFilter,
} from "../helpers/wallet";
import { useNavigate } from "react-router-dom";

const useWalletStore = () => {
  const navigate = useNavigate();
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
        activeNoteCallback({ note: filterBy().firstValues._id });
      }
    },
    [dispatch, filterBy]
  );

  //! si desactivo el active note cuando salga del modal puede servir de algo

  //* si no existe el estado activeNote y recibe un array de notas, agrega el active note del array[0], si nomas recibe la nota y si existe el active note saca el active note del parametro note enviado
  const setActiveNote = (id?: string) => {
    if (activeNote === undefined) {
      activeNoteCallback({ note: notes[0]._id });
      dispatch(startSavingActiveNote(notes[0]));
    }
    if (id) {
      const filterNote = notes.find((note) => note._id === id);
      console.log(id);
      activeNoteCallback({ note: id });
      if (filterNote) dispatch(startSavingActiveNote(filterNote));
    }
  };

  //* para abrir el modal con id #modal y si tiene parametro de note que lo agrege al estado y al locale
  const setOpenModal = ({ id }: { id?: string }) => {
    dispatch(setOpen());
    if (id) {
      activeNoteCallback({ note: id });
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
  const setSavingUpdateNote = ({
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
    const optimistic = {
      ...values,
      date: new Date(values.date).getTime() as unknown as Date,
      images: previewIMG,
    };

    dispatch(startSavingUpdatingNote(values, files, deleteImages, optimistic));

    navigate(-1);
  };

  //* para guardar nueva nota a DB y Store
  const setSavingNewNote = ({
    newValues,
    newImg,
  }: {
    newValues: InitialValues;
    newImg: File[];
  }) => {
    //! optimistic
    const noteID = {
      ...newValues,
      date: new Date(newValues.date).getTime() as unknown as Date,
      _id: JSON.stringify(new Date().getTime()),
      account: activeAccount?._id as string,
    };
    const activeNote = activeNoteCallback({ note: noteID._id });
    dispatch(setSaveNote(activeNote));
    dispatch(setActiveNoteSlice(activeNote));
    //! saving note database
    dispatch(startSavingImage(newImg));
    dispatch(startSavingNewNote(newValues));
    console.log("ariel");
    navigate(-1);
  };

  //* resetea active note en la store, localstorage, y el estado filterState
  const reset = () => {
    keyWordFilter({ key: "reset" });
    dispatch(startFilteringState("reset"));
  };

  const resetNewButton = () => {
    dispatch(startResetActiveNote());
    activeNoteCallback({ newAccount: true });
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
    setSavingNewNote,
    setSavingUpdateNote,
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
