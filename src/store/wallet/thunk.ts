import { NoteProps } from "../../interface/walletApp";
import { RootState } from "../store";
import { setActiveNote, setNotes, setSaveNote } from "./walletSlice";

export const startSavingActiveNote = (note: NoteProps) => {
  return async (
    dispatch: (arg0: {
      payload: NoteProps | undefined;
      type: "wallet/setActiveNote";
    }) => void
  ) => {
    dispatch(setActiveNote(note));
  };
};

export const startResetActiveNote = () => {
  return async (
    dispatch: (arg0: {
      payload: NoteProps | undefined;
      type: "wallet/setActiveNote";
    }) => void
  ) => {
    dispatch(setActiveNote(undefined));
  };
};

export const startGetNotesDB = (data: NoteProps[]) => {
  return async (
    dispatch: (arg0: {
      payload: NoteProps[] | [];
      type: "wallet/setNotes";
    }) => void
  ) => {
    dispatch(setNotes(data));
  };
};

export const startDeleteNote = (id: string) => {
  return async (
    dispatch: (arg0: {
      payload: NoteProps[] | null;
      type: "wallet/setNotes";
    }) => void,
    getState: () => RootState
  ) => {
    const notes = getState().wallet.notes;
    const newNotes = notes?.filter((idNote) => idNote.id !== id);
    dispatch(setNotes(newNotes as NoteProps[]));
  };
};

export const startSavingNewNote = (NoteProps: NoteProps) => {
  return async (
    dispatch: (arg0: { payload: NoteProps; type: "wallet/setSaveNote" }) => void
  ) => {
    const { date } = NoteProps;
    const newDate = new Date(date).getTime();
    const note = {
      ...NoteProps,
      date: newDate,
    };
    dispatch(setSaveNote(note));
  };
};
