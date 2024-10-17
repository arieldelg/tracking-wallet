import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { UsersAccount, NoteProps } from "../../interface/walletApp";

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
  filterState: string;
  accounts: UsersAccount[];
  activeAccount: UsersAccount | undefined;
}

/*!initialState*/
const initialState: InitialState = {
  entryPay: "income",
  activeNote: undefined,
  notes: [],
  filterState: "init",
  accounts: [],
  activeAccount: undefined,
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
    setFilterState: (state, action: PayloadAction<string>) => {
      state.filterState = action.payload;
    },
    setSaveNewAccount: (state, action: PayloadAction<UsersAccount>) => {
      state.accounts.unshift(action.payload);
    },
    setSaveAllUserAccounts: (state, action: PayloadAction<UsersAccount[]>) => {
      state.accounts = action.payload;
    },
    setActiveAccount: (
      state,
      action: PayloadAction<UsersAccount | undefined>
    ) => {
      state.activeAccount = action.payload;
    },
    setUpdateAccount: (state, action: PayloadAction<UsersAccount>) => {
      state.accounts = state.accounts.map((data) => {
        if (data.id === action.payload.id) {
          return {
            ...data,
            ...action.payload,
          };
        }
        return data;
      });
    },
    setDeleteAccount: (state, action: PayloadAction<string>) => {
      state.accounts = state.accounts.filter(
        (account) => account.id !== action.payload
      );
    },
  },
});

/*!exportamos las acciones del slice*/
export const {
  setEntryPay,
  setActiveNote,
  setNotes,
  setSaveNote,
  setFilterState,
  setSaveNewAccount,
  setSaveAllUserAccounts,
  setActiveAccount,
  setUpdateAccount,
  setDeleteAccount,
} = walletSlice.actions;

/* ! esto lo qu exportamos al store*/
export default walletSlice.reducer;

const ENTRYPAY = (state: RootState) => state;
const ACTIVENOTE = (state: RootState) => state;
const NOTES = (state: RootState) => state;
const FILTER = (state: RootState) => state;
const ACCOUNTS = (state: RootState) => state;
const ACTIVEACCOUNT = (state: RootState) => state;

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

export const FilterNotesSelector = createSelector(
  [FILTER],
  (FILTER) => FILTER.wallet.filterState
);

export const GetAllUserAccountsDB = createSelector(
  [ACCOUNTS],
  (ACCOUNTS) => ACCOUNTS.wallet.accounts
);

export const GetActiveAcountSelector = createSelector(
  [ACTIVEACCOUNT],
  (ACTIVEACCOUNT) => ACTIVEACCOUNT.wallet.activeAccount
);
