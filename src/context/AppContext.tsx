/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAppDispatch } from "../hooks/useAppDispatch.hook";
import {
  addTimer,
  changeDifficulty,
  endGame,
  handleHowToPlay,
  handlePause,
  loseText,
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
  addPoint: boolean;
  handleClickStartGame: () => void;
  handleClickDeleteCell: (content: "X" | "O", r: number, c: number) => void;
  handleClickPauseGame: () => void;
  handleClickChangeDifficulty: () => void;
  addPointText: () => void;
  handleClickHowToPlay: () => void;
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
  const [addPoint, setAddPoint] = useState(false);
  const { time, score, timerStopped, gamePaused, difficulty, howToOpen } =
    useAppSelector((state) => state.gameState);

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
    if (howToOpen) {
      dispatch(handleHowToPlay());
    }
    dispatch(loseText("You clicked white cell!"));
    return;
  };

  const handleClickPauseGame = () => {
    if (howToOpen) return;

    dispatch(handlePause());
  };

  const handleClickHowToPlay = () => {
    if (gamePaused) {
      dispatch(handlePause());
    }

    dispatch(handleHowToPlay());
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
      setAddPoint(true);
    }
  }, [dispatch, score, difficulty]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (time > 0 && !timerStopped) {
        dispatch(secondPass());
      }
    }, 100);

    if (time === 0) {
      dispatch(endGame());
      dispatch(loseText("Time is out!"));
    }
    return () => clearInterval(timer);
  }, [dispatch, time, timerStopped]);

  const addPointText = () => {
    setAddPoint(false);
  };

  return (
    <AppContext.Provider
      value={{
        addPoint,
        handleClickStartGame,
        handleClickDeleteCell,
        handleClickPauseGame,
        handleClickChangeDifficulty,
        addPointText,
        handleClickHowToPlay,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextContainer;
