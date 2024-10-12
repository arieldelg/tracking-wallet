import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { NoteProps } from "../../interface/walletApp";

type TypeEntryPay = "income" | "expense";

interface InitialState {
  entryPay: TypeEntryPay;
  activeNote: NoteProps | undefined;
}

/*!initialState*/
const initialState: InitialState = {
  entryPay: "income",
  activeNote: undefined,
};

/*!slice*/
export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setEntryPay: (state, action: PayloadAction<TypeEntryPay>) => {
      state.entryPay = action.payload;
    },
    setActiveNote: (state, action: PayloadAction<NoteProps>) => {
      state.activeNote = action.payload;
    },
  },
});

/*!exportamos las acciones del slice*/
export const { setEntryPay, setActiveNote } = walletSlice.actions;

/* ! esto lo qu exportamos al store*/
export default walletSlice.reducer;

const ENTRYPAY = (state: RootState) => state;

export const EntryPaySelector = createSelector(
  [ENTRYPAY],
  (ENTRYPAY) => ENTRYPAY.wallet.entryPay
);
