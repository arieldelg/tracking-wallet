import { NoteProps } from "../../interface/walletApp";
import { setClose } from "../ui/uiSlice";
import { setActiveNoteSlice, setFilterState } from "./walletSlice";

/**
 * @param note NoteProps
 * @returns void
 * @summary save new Active note on the store
 */
export const startSavingActiveNote = (note: NoteProps) => {
  return async (
    dispatch: (arg0: {
      payload: NoteProps | undefined;
      type: "wallet/setActiveNoteSlice";
    }) => void
  ) => {
    dispatch(setActiveNoteSlice(note));
  };
};

export const startResetActiveNote = () => {
  return async (
    dispatch: (arg0: {
      payload: NoteProps | undefined;
      type: "wallet/setActiveNoteSlice" | "ui/setClose";
    }) => void
  ) => {
    dispatch(setClose());
    dispatch(setActiveNoteSlice(undefined));
  };
};

export const startFilteringState = (value: string) => {
  return async (
    dispatch: (arg0: { payload: string; type: "wallet/setFilterState" }) => void
  ) => {
    dispatch(setFilterState(value));
  };
};
