import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type TypeEntryPay = "income" | "expense";

interface InitialState {
  entryPay: TypeEntryPay;
}

/*!initialState*/
const initialState: InitialState = {
  entryPay: "income",
};

/*!slice*/
export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setEntryPay: (state, action: PayloadAction<TypeEntryPay>) => {
      state.entryPay = action.payload;
    },
  },
});

/*!exportamos las acciones del slice*/
export const { setEntryPay } = walletSlice.actions;

/* ! esto lo qu exportamos al store*/
export default walletSlice.reducer;

const ENTRYPAY = (state: RootState) => state;

export const EntryPaySelector = createSelector(
  [ENTRYPAY],
  (ENTRYPAY) => ENTRYPAY.wallet.entryPay
);
