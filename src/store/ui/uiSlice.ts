import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type ValuesAccountTab = "init" | "open" | "close";

interface InitialState {
  open: boolean;
  headerName: string;
  openDelete: boolean;
}

/*!initialState*/
const initialState: InitialState = {
  open: false,
  headerName: "Dashboard",
  openDelete: false,
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
    setOpenDelete: (state) => {
      state.openDelete = true;
    },
    setCloseDelete: (state) => {
      state.openDelete = false;
    },
  },
});

/*!exportamos las acciones del slice*/
export const { setOpen, setHeader, setClose, setOpenDelete, setCloseDelete } =
  uiSlice.actions;

/* ! esto lo qu exportamos al store*/
export default uiSlice.reducer;

const OPENMODAL = (state: RootState) => state;
const OPENMODALDELETE = (state: RootState) => state;

export const OpenModalSelector = createSelector(
  [OPENMODAL],
  (OPENMODAL) => OPENMODAL.ui.open
);

export const OpenModalDeleteSelector = createSelector(
  [OPENMODALDELETE],
  (OPENMODALDELETE) => OPENMODALDELETE.ui.openDelete
);
