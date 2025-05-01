import { RootState } from "./store";
import { initialState } from "../slices/gameState.slice";

const STORAGE_KEY = "difficulty";

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    const difficulty = serializedState
      ? JSON.parse(serializedState)
      : undefined;

    if (typeof difficulty === "number") {
      return { gameState: { ...initialState, difficulty } };
    }

    return undefined;
  } catch (e) {
    console.warn("Error while loading data: ", e);
    return undefined;
  }
};

export const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state.gameState.difficulty);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (e) {
    console.warn("Error while loading data: ", e);
  }
};
