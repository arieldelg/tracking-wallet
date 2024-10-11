import { configureStore } from "@reduxjs/toolkit";
import wallet from "./wallet/walletSlice";

export const store = configureStore({
  reducer: {
    wallet: wallet,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
