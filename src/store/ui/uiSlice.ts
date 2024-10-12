import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

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
      state.open = !state.open;
    },
    setHeader: (state, action: PayloadAction<string>) => {
      state.headerName = action.payload;
    },
  },
});

/*!exportamos las acciones del slice*/
export const { setOpen, setHeader } = uiSlice.actions;

/* ! esto lo qu exportamos al store*/
export default uiSlice.reducer;

const OPENMODAL = (state: RootState) => state;

export const OpenModalSelector = createSelector(
  [OPENMODAL],
  (OPENMODAL) => OPENMODAL.ui.open
);
