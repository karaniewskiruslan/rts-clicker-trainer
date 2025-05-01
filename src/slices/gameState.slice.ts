import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { START_TIME } from "../constants/constants";

type Table = {
  loseText: string;
  howToOpen: boolean;
  leaderboardOpen: boolean;
  bonusActive: boolean;
  gameStarted: boolean;
  gameLose: boolean;
  gamePaused: boolean;
  timerStopped: boolean;
  time: number;
  score: number;
  clickStrike: number;
  difficulty: number;
};

export const initialState: Table = {
  gameStarted: false,
  howToOpen: false,
  bonusActive: false,
  loseText: "Good luck to you!",
  leaderboardOpen: false,
  gameLose: false,
  timerStopped: false,
  gamePaused: false,
  time: START_TIME,
  score: 0,
  clickStrike: 0,
  difficulty: 1,
};

const stateCheck = (state: boolean) => (state ? false : state);

const applyStartGameState = (state: Table) => {
  state.gameStarted = true;
  state.gameLose = false;
  state.timerStopped = false;
  state.score = 0;
  state.time = START_TIME;
  state.clickStrike = 0;
  state.bonusActive = false;
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
      state.leaderboardOpen = stateCheck(state.leaderboardOpen);
      state.gamePaused = true;
      state.timerStopped = true;
    },
    handleLeaderboard: (state) => {
      state.leaderboardOpen = !state.leaderboardOpen;
      state.howToOpen = stateCheck(state.howToOpen);
    },
    addTimer: (state) => {
      state.time += 10;
    },
    addClickStrike: (state) => {
      if (state.clickStrike + 4 > 100 && !state.bonusActive) {
        state.clickStrike = 100;
        state.bonusActive = true;
        return;
      }
      state.clickStrike += 4;
    },
    subtractClickStrike: (state) => {
      if (state.clickStrike - 1 <= 0) {
        state.clickStrike = 0;
        return;
      }
      state.clickStrike--;
    },
    changeBonusState: (state, action: PayloadAction<boolean>) => {
      state.bonusActive = action.payload;
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
      if (state.bonusActive) {
        state.score++;
      }
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
  handleLeaderboard,
  addClickStrike,
  subtractClickStrike,
  changeBonusState,
} = gameState.actions;
export default gameState.reducer;
