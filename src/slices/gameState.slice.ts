import { createSlice } from "@reduxjs/toolkit";
import { START_TIME } from "../constants/constants";

type Table = {
  gameStarted: boolean;
  gameLost: boolean;
  time: number;
  score: number;
};

const initialState: Table = {
  gameStarted: false,
  gameLost: false,
  time: 0,
  score: 0,
};

const gameState = createSlice({
  name: "gameState",
  initialState,
  reducers: {
    startGame: (state) => {
      state.gameStarted = true;
      state.gameLost = false;
      state.score = 0;
      state.time = START_TIME;
    },
    endGame: (state) => {
      state.gameLost = true;
    },
    addTimer: (state) => {
      state.time += 10;
    },
    secondPass: (state) => {
      state.time--;
    },
    scoreChange: (state) => {
      state.score++;
    },
  },
});

export const { startGame, endGame, scoreChange, addTimer, secondPass } =
  gameState.actions;
export default gameState.reducer;
