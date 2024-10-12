import { NoteProps } from "../../interface/walletApp";
import { setActiveNote } from "./walletSlice";

export const startSavingActiveNote = (note: NoteProps) => {
  return async (
    dispatch: (arg0: {
      payload: NoteProps;
      type: "wallet/setActiveNote";
    }) => void
  ) => {
    dispatch(setActiveNote(note));
  };
};
