/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useContext, useEffect } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch.hook";
import {
  addTimer,
  changeDifficulty,
  endGame,
  handlePause,
  scoreChange,
  secondPass,
  startGame,
} from "../slices/gameState.slice";
import { resetTable, deleteCell, setNewCell } from "../slices/gameTable.slice";
import { useAppSelector } from "../hooks/useAppSelector.hook";
import {
  ADD_TIMER_SCORE_EASY,
  ADD_TIMER_SCORE_HARD,
  ADD_TIMER_SCORE_NORMAL,
} from "../constants/constants";

type Props = {
  children: ReactNode;
};

type AppContextProps = {
  handleClickStartGame: () => void;
  handleClickDeleteCell: (content: "X" | "O", r: number, c: number) => void;
  handleClickPauseGame: () => void;
  handleClickChangeDifficulty: () => void;
};

const AppContext = createContext({} as AppContextProps);

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("Context must be used within an AppContextContainer");
  }

  return context;
};

const AppContextContainer = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const { time, score, timerStopped, gamePaused, difficulty } = useAppSelector(
    (state) => state.gameState,
  );

  const handleClickStartGame = () => {
    dispatch(startGame());
    dispatch(resetTable());
    for (let i = 0; i < 4; i++) {
      dispatch(setNewCell());
    }
  };

  const handleClickDeleteCell = (content: "X" | "O", r: number, c: number) => {
    if (gamePaused) {
      return;
    }

    if (content === "X") {
      dispatch(setNewCell());
      dispatch(scoreChange());
      dispatch(deleteCell([r, c]));
      return;
    }

    dispatch(endGame());
    return;
  };

  const handleClickPauseGame = () => {
    dispatch(handlePause());
  };

  const handleClickChangeDifficulty = () => {
    dispatch(changeDifficulty());
    dispatch(resetTable());
    for (let i = 0; i < 4; i++) {
      dispatch(setNewCell());
    }
  };

  useEffect(() => {
    const diffPoints = () => {
      switch (difficulty) {
        case 0:
          return ADD_TIMER_SCORE_EASY;
        case 1:
          return ADD_TIMER_SCORE_NORMAL;
        default:
          return ADD_TIMER_SCORE_HARD;
      }
    };

    if (score % diffPoints() === 0 && score !== 0) {
      dispatch(addTimer());
    }
  }, [dispatch, score, difficulty]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (time > 0 && !timerStopped) {
        dispatch(secondPass());
      }
    }, 1000);

    if (time === 0) {
      dispatch(endGame());
    }
    return () => clearInterval(timer);
  }, [dispatch, time, timerStopped]);

  return (
    <AppContext.Provider
      value={{
        handleClickStartGame,
        handleClickDeleteCell,
        handleClickPauseGame,
        handleClickChangeDifficulty,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextContainer;
