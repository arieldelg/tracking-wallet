import { NoteProps, UsersAccount } from "../interface/walletApp";
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
  startFilteringState,
  startSavingActiveNote,
} from "../store/wallet/thunk";
import {
  ActiveNoteSelector,
  GetActiveAcountSelector,
  setActiveAccount,
  setActiveNoteSlice,
} from "../store/wallet/walletSlice";
import { activeNoteHelper, keyWordFilter } from "../helpers/wallet";

const useWalletStore = (noteLoader?: NoteProps) => {
  const dispatch = useAppDispatch();
  const activeNote = useAppSelector(ActiveNoteSelector);
  const isOpenModal = useAppSelector(OpenModalSelector);
  const isOpenModalDelete = useAppSelector(OpenModalDeleteSelector);
  const activeAccount = useAppSelector(GetActiveAcountSelector);

  //* si no existe el estado activeNote y recibe un array de notas, agrega el active note del array[0], si nomas recibe la nota y si existe el active note saca el active note del parametro note enviado

  const setActiveNote = (note?: NoteProps) => {
    if (activeNote === undefined) {
      activeNoteHelper({ note: noteLoader?._id });
      dispatch(startSavingActiveNote(noteLoader as NoteProps));
    }
    if (note) {
      activeNoteHelper({ note: note._id });
      dispatch(startSavingActiveNote(note));
    }
  };

  //* para abrir el modal con id #modal y si tiene parametro de note que lo agrege al estado y al locale
  const setOpenModal = (note?: NoteProps) => {
    dispatch(setOpen());
    if (note) {
      activeNoteHelper({ note: note._id });
      dispatch(startSavingActiveNote(note));
    }
  };

  const setOpenModalDelete = () => {
    dispatch(setOpenDelete());
  };

  const setCloseModalDelete = () => {
    dispatch(setCloseDelete());
  };

  //* resetea active note en la store, localstorage, y el estado filterState
  const reset = () => {
    keyWordFilter({ key: "reset" });
    dispatch(startFilteringState("reset"));
  };

  const resetNewButton = () => {
    dispatch(setActiveNoteSlice(undefined));
    activeNoteHelper({ newNote: true });
  };

  //* para cerrar el modal con id #modal
  const setCloseModal = () => {
    dispatch(setClose());
  };

  //* para tener como active acount en el store
  const activeAccountHK = (account: UsersAccount) => {
    dispatch(setActiveAccount(account));
  };

  //* para resetear el actual active account
  const setResetAccount = () => {
    dispatch(setActiveAccount(undefined));
  };

  return {
    // Method
    setOpenModal,
    reset,
    setActiveNote,
    setCloseModal,
    activeAccountHK,
    setResetAccount,
    setOpenModalDelete,
    setCloseModalDelete,
    resetNewButton,
    //state store
    activeNote,
    isOpenModal,
    activeAccount,
    isOpenModalDelete,
  };
};

export default useWalletStore;
