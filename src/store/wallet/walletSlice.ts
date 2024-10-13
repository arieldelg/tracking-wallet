import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { NoteProps } from "../../interface/walletApp";

/**
 *
 * ? atento a futuras modificaciones
 */

type TypeEntryPay = "income" | "expense";

//? deberia eliminar el entry pay si no lo uso??? o lo guardo para mas tarde

interface InitialState {
  entryPay: TypeEntryPay;
  activeNote: NoteProps | undefined;
  notes: NoteProps[];
}

/*!initialState*/
const initialState: InitialState = {
  entryPay: "income",
  activeNote: undefined,
  notes: [],
};

/*!slice*/
export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setEntryPay: (state, action: PayloadAction<TypeEntryPay>) => {
      state.entryPay = action.payload;
    },
    setActiveNote: (state, action: PayloadAction<NoteProps | undefined>) => {
      state.activeNote = action.payload;
    },
    setNotes: (state, action: PayloadAction<NoteProps[] | []>) => {
      state.notes = action.payload;
    },
    setSaveNote: (state, action: PayloadAction<NoteProps>) => {
      state.notes.push(action.payload);
    },
  },
});

/*!exportamos las acciones del slice*/
export const { setEntryPay, setActiveNote, setNotes, setSaveNote } =
  walletSlice.actions;

/* ! esto lo qu exportamos al store*/
export default walletSlice.reducer;

const ENTRYPAY = (state: RootState) => state;
const ACTIVENOTE = (state: RootState) => state;
const NOTES = (state: RootState) => state;

export const EntryPaySelector = createSelector(
  [ENTRYPAY],
  (ENTRYPAY) => ENTRYPAY.wallet.entryPay
);

export const ActiveNoteSelector = createSelector(
  [ACTIVENOTE],
  (ACTIVENOTE) => ACTIVENOTE.wallet.activeNote
);

export const GetNotesDBSelector = createSelector(
  [NOTES],
  (NOTES) => NOTES.wallet.notes
);
