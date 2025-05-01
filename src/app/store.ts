import { combineReducers, configureStore } from "@reduxjs/toolkit";
import table from "../slices/gameTable.slice";
import gameState from "../slices/gameState.slice";
import { loadState, saveState } from "./stateHandler";

const rootReducer = combineReducers({
  table,
  gameState,
});

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadState(),
});

store.subscribe(() => {
  saveState(store.getState());
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
