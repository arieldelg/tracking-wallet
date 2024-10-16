import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type ValuesAccountTab = "init" | "open" | "close";

interface InitialState {
  open: boolean;
  headerName: string;
}

/*!initialState*/
const initialState: InitialState = {
  open: false,
  headerName: "Dashboard",
};

/*!slice*/
export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setOpen: (state) => {
      state.open = true;
    },
    setClose: (state) => {
      state.open = false;
    },
    setHeader: (state, action: PayloadAction<string>) => {
      state.headerName = action.payload;
    },
  },
});

/*!exportamos las acciones del slice*/
export const { setOpen, setHeader, setClose } = uiSlice.actions;

/* ! esto lo qu exportamos al store*/
export default uiSlice.reducer;

const OPENMODAL = (state: RootState) => state;

export const OpenModalSelector = createSelector(
  [OPENMODAL],
  (OPENMODAL) => OPENMODAL.ui.open
);
