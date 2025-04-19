import { configureStore } from "@reduxjs/toolkit";
import table from "../slices/gameTable.slice";
import gameState from "../slices/gameState.slice";

export const store = configureStore({
  reducer: {
    table,
    gameState,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
