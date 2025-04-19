/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useContext, useEffect } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch.hook";
import {
  addTimer,
  endGame,
  scoreChange,
  secondPass,
  startGame,
} from "../slices/gameState.slice";
import { resetTable, deleteCell, setNewCell } from "../slices/gameTable.slice";
import { useAppSelector } from "../hooks/useAppSelector.hook";
import { ADD_TIMER_SCORE } from "../constants/constants";

type Props = {
  children: ReactNode;
};

type AppContextProps = {
  onClickStartGame: () => void;
  onClickDeleteCell: (content: "X" | "O", r: number, c: number) => void;
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
  const { time, score } = useAppSelector((state) => state.gameState);

  const onClickStartGame = () => {
    dispatch(startGame());
    dispatch(resetTable());
    for (let i = 0; i < 4; i++) {
      dispatch(setNewCell());
    }
  };

  const onClickDeleteCell = (content: "X" | "O", r: number, c: number) => {
    if (content === "X") {
      dispatch(setNewCell());
      dispatch(scoreChange());
      dispatch(deleteCell([r, c]));
      return;
    }

    dispatch(endGame());
    return;
  };

  useEffect(() => {
    if (score % ADD_TIMER_SCORE === 0 && score !== 0) {
      dispatch(addTimer());
    }
  }, [dispatch, score]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (time > 0) {
        dispatch(secondPass());
      }
    }, 1000);

    if (time === 0) {
      dispatch(endGame());
    }
    return () => clearInterval(timer);
  }, [dispatch, time]);

  return (
    <AppContext.Provider value={{ onClickStartGame, onClickDeleteCell }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextContainer;
