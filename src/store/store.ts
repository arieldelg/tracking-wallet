import { configureStore } from "@reduxjs/toolkit";
import wallet from "./wallet/walletSlice";
import ui from "./ui/uiSlice";

export const store = configureStore({
  reducer: {
    wallet: wallet,
    ui: ui,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
