import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { START_TIME } from "../constants/constants";

type Table = {
  loseText: string;
  howToOpen: boolean;
  gameStarted: boolean;
  gameLose: boolean;
  gamePaused: boolean;
  timerStopped: boolean;
  time: number;
  score: number;
  difficulty: number;
};

const initialState: Table = {
  gameStarted: false,
  howToOpen: false,
  loseText: "Good luck to you!",
  gameLose: false,
  timerStopped: false,
  gamePaused: false,
  time: 0,
  score: 0,
  difficulty: 1,
};

const applyStartGameState = (state: Table) => {
  state.gameStarted = true;
  state.gameLose = false;
  state.timerStopped = false;
  state.score = 0;
  state.time = START_TIME;
};

const gameState = createSlice({
  name: "gameState",
  initialState,
  reducers: {
    startGame: (state) => {
      applyStartGameState(state);
    },
    endGame: (state) => {
      state.gameLose = true;
      state.timerStopped = true;
    },
    handlePause: (state) => {
      state.gamePaused = !state.gamePaused;
      state.timerStopped = !state.timerStopped;
    },
    handleHowToPlay: (state) => {
      state.howToOpen = !state.howToOpen;
    },
    addTimer: (state) => {
      state.time += 10;
    },
    changeDifficulty: (state) => {
      applyStartGameState(state);
      state.gamePaused = true;
      state.timerStopped = true;
      state.difficulty = (state.difficulty + 1) % 3;
    },
    secondPass: (state) => {
      state.time = Math.round((state.time - 0.1) * 10) / 10;
    },
    scoreChange: (state) => {
      state.score++;
    },
    loseText: (state, action: PayloadAction<string>) => {
      state.loseText = action.payload;
    },
  },
});

export const {
  startGame,
  endGame,
  scoreChange,
  addTimer,
  secondPass,
  handlePause,
  changeDifficulty,
  loseText,
  handleHowToPlay,
} = gameState.actions;
export default gameState.reducer;
