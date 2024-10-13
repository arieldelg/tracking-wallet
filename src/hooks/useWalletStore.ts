import { NoteProps } from "../interface/walletApp";
import { useAppDispatch } from "../store/hooks";
import { setOpen } from "../store/ui/uiSlice";
import {
  startDeleteNote,
  startResetActiveNote,
  startSavingActiveNote,
} from "../store/wallet/thunk";

const useWalletStore = () => {
  const dispatch = useAppDispatch();
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
  const setOpenBill = (props: NoteProps) => {
    dispatch(startSavingActiveNote(props));
  };
  return {
    // Method
    setOpenModal,
    deleteNote,
    reset,
    setOpenBill,
  };
};

export default useWalletStore;
