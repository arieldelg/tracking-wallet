import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type ValuesAccountTab = "init" | "open" | "close";

interface InitialState {
  open: boolean;
  headerName: string;
  openAccountTab: ValuesAccountTab;
}

/*!initialState*/
const initialState: InitialState = {
  open: false,
  headerName: "Dashboard",
  openAccountTab: "init",
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
    setOpenTab: (state, action: PayloadAction<ValuesAccountTab>) => {
      state.openAccountTab = action.payload;
    },
  },
});

/*!exportamos las acciones del slice*/
export const { setOpen, setHeader, setClose, setOpenTab } = uiSlice.actions;

/* ! esto lo qu exportamos al store*/
export default uiSlice.reducer;

const OPENMODAL = (state: RootState) => state;
const OPENTAB = (state: RootState) => state;

export const OpenModalSelector = createSelector(
  [OPENMODAL],
  (OPENMODAL) => OPENMODAL.ui.open
);

export const OpenAccountTabSelector = createSelector(
  [OPENTAB],
  (OPENTAB) => OPENTAB.ui.openAccountTab
);
