import { NoteProps, UsersAccountFormik } from "../interface/walletApp";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { OpenModalSelector, setClose, setOpen } from "../store/ui/uiSlice";
import {
  startDeleteNote,
  startFilteringState,
  startResetActiveNote,
  startSavingAccount,
  startSavingActiveNote,
} from "../store/wallet/thunk";
import {
  ActiveNoteSelector,
  FilterNotesSelector,
  GetNotesDBSelector,
} from "../store/wallet/walletSlice";

const useWalletStore = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(FilterNotesSelector);
  const notes = useAppSelector(GetNotesDBSelector) as NoteProps[];
  const activeNote = useAppSelector(ActiveNoteSelector);
  const isOpenModal = useAppSelector(OpenModalSelector);

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
    //state store
    filter,
    notes,
    activeNote,
    isOpenModal,
  };
};

export default useWalletStore;
