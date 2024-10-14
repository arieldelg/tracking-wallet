import { NoteProps } from "../../interface/walletApp";
import { RootState } from "../store";
import { setClose } from "../ui/uiSlice";
import {
  setActiveNote,
  setFilterState,
  setNotes,
  setSaveNote,
} from "./walletSlice";

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
      type: "wallet/setActiveNote" | "ui/setClose";
    }) => void
  ) => {
    dispatch(setClose());
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
      payload: NoteProps[] | null | undefined | NoteProps;
      type: "wallet/setNotes" | "wallet/setActiveNote";
    }) => void,
    getState: () => RootState
  ) => {
    const notes = getState().wallet.notes;
    const newNotes = notes?.filter((idNote) => idNote.id !== id);
    dispatch(setNotes(newNotes as NoteProps[]));
    dispatch(setActiveNote(undefined));
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

export const startFilteringState = (value: string) => {
  return async (
    dispatch: (arg0: { payload: string; type: "wallet/setFilterState" }) => void
  ) => {
    dispatch(setFilterState(value));
  };
};
