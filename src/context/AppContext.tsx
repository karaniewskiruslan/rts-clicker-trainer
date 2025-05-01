/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAppDispatch } from "../hooks/useAppDispatch.hook";
import {
  addClickStrike,
  addTimer,
  changeBonusState,
  changeDifficulty,
  endGame,
  handleHowToPlay,
  handleLeaderboard,
  handlePause,
  loseText,
  scoreChange,
  secondPass,
  startGame,
  subtractClickStrike,
} from "../slices/gameState.slice";
import { resetTable, deleteCell, setNewCell } from "../slices/gameTable.slice";
import { useAppSelector } from "../hooks/useAppSelector.hook";
import { v4 as uuid } from "uuid";
import {
  ADD_TIMER_SCORE_EASY,
  ADD_TIMER_SCORE_HARD,
  ADD_TIMER_SCORE_NORMAL,
} from "../constants/constants";
import { useKeydown } from "../hooks/useKeydown.hook";
import useLocalStorage from "../hooks/useLocalStorage.hook";
import { Leaderboard } from "../types/leaderboard";

type Props = {
  children: ReactNode;
};

type AppContextProps = {
  leaderboard: Leaderboard[];
  addPoint: boolean;
  handleClickStartGame: () => void;
  handleClickDeleteCell: (content: "X" | "O", r: number, c: number) => void;
  handleClickPauseGame: () => void;
  handleClickChangeDifficulty: () => void;
  addPointText: () => void;
  handleClickHowToPlay: () => void;
  handleClickLeaderboard: () => void;
};

const AppContext = createContext({} as AppContextProps);

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("Context must be used within an AppContextContainer");
  }

  return context;
};

const AppContextContainer = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const [addPoint, setAddPoint] = useState(false);
  const {
    score,
    gamePaused,
    difficulty,
    howToOpen,
    gameLose,
    bonusActive,
    time,
    timerStopped,
    clickStrike,
  } = useAppSelector((state) => state.gameState);
  const [leaderboard, setLeaderboard] = useLocalStorage<Leaderboard[]>(
    "leaderboard",
    [],
  );

  const gameEnded = useCallback(
    (text: string) => {
      dispatch(endGame());
      dispatch(loseText(text));
      if (howToOpen) {
        dispatch(handleHowToPlay());
      }
      setLeaderboard((prev) => [
        ...prev,
        {
          date: new Date(),
          score,
          difficulty,
          id: uuid(),
        },
      ]);
    },
    [difficulty, dispatch, howToOpen, leaderboard, score, setLeaderboard],
  );

  const spawnInitialCells = () => {
    for (let i = 0; i < 4; i++) {
      dispatch(setNewCell());
    }
  };

  const handleClickStartGame = () => {
    dispatch(startGame());
    dispatch(resetTable());
    spawnInitialCells();
  };

  const handleClickDeleteCell = (content: "X" | "O", r: number, c: number) => {
    if (gamePaused) {
      return;
    }

    if (content === "X") {
      dispatch(setNewCell());
      dispatch(scoreChange());
      dispatch(deleteCell([r, c]));
      if (!bonusActive) {
        dispatch(addClickStrike());
      }
      return;
    }

    gameEnded("You clicked white cell!");
  };

  const handleClickPauseGame = () => {
    if (howToOpen) return;

    dispatch(handlePause());
  };

  const handleClickHowToPlay = () => {
    dispatch(handleHowToPlay());
  };

  const handleClickChangeDifficulty = () => {
    dispatch(changeDifficulty());
    dispatch(resetTable());
    spawnInitialCells();
  };

  const handleClickLeaderboard = () => {
    dispatch(handleLeaderboard());
  };

  const addPointText = () => {
    setAddPoint(false);
  };

  useEffect(() => {
    handleClickStartGame();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (timerStopped) return;
      if (time > 0) {
        dispatch(secondPass());
      }
    }, 100);

    if (time === 0) {
      gameEnded("Time is out!");
    }

    return () => clearInterval(timer);
  }, [time, timerStopped, dispatch, gameEnded]);

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
    if (leaderboard.length > 1000) {
      setLeaderboard((prev) =>
        prev.sort((a, b) => b.score - a.score).slice(0, 1000),
      );
    }
  }, [leaderboard, setLeaderboard]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (gamePaused || gameLose || bonusActive) return;
      dispatch(subtractClickStrike());
    }, 75);

    return () => clearInterval(timer);
  }, [gameLose, gamePaused, bonusActive]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (gamePaused || gameLose || !bonusActive) return;
      dispatch(subtractClickStrike());

      if (clickStrike <= 0) {
        dispatch(changeBonusState(false));
      }
    }, 5);

    return () => clearInterval(timer);
  }, [gamePaused, gameLose, bonusActive, clickStrike]);

  useKeydown("S", handleClickPauseGame, !gameLose);
  useKeydown("H", handleClickHowToPlay, !gameLose);
  useKeydown("R", handleClickStartGame, gameLose);
  useKeydown("E", handleClickLeaderboard, !gameLose);

  return (
    <AppContext.Provider
      value={{
        leaderboard,
        addPoint,
        handleClickStartGame,
        handleClickDeleteCell,
        handleClickPauseGame,
        handleClickChangeDifficulty,
        addPointText,
        handleClickHowToPlay,
        handleClickLeaderboard,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextContainer;
