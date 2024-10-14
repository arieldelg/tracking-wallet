import { NoteProps } from "../interface/walletApp";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setOpen } from "../store/ui/uiSlice";
import {
  startDeleteNote,
  startFilteringState,
  startResetActiveNote,
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

  const setOpenModal = (props: NoteProps) => {
    dispatch(setOpen());
    dispatch(startSavingActiveNote(props));
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

  return {
    // Method
    setOpenModal,
    deleteNote,
    reset,
    setActiveNote,
    setFilter,
    resetFilter,
    //state store
    filter,
    notes,
    activeNote,
  };
};

export default useWalletStore;
