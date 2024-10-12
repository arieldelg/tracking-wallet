import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

/*!initialState*/
const initialState: { open: boolean } = {
  open: false,
};

/*!slice*/
export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setOpen: (state) => {
      state.open = !state.open;
    },
  },
});

/*!exportamos las acciones del slice*/
export const { setOpen } = uiSlice.actions;

/* ! esto lo qu exportamos al store*/
export default uiSlice.reducer;

const OPENMODAL = (state: RootState) => state;

export const OpenModalSelector = createSelector(
  [OPENMODAL],
  (OPENMODAL) => OPENMODAL.ui.open
);
