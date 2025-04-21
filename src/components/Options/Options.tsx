import { useAppContext } from "../../context/AppContext";
import { useAppSelector } from "../../hooks/useAppSelector.hook";
import { useKeydown } from "../../hooks/useKeydown.hook";
import HowToPlay from "./HowToPlay/HowToPlay";
import OptionDifficulties from "./OptionDifficulties";
import OptionsHowTo from "./OptionHowTo";
import OptionPause from "./OptionPause";
import { useAppDispatch } from "../../hooks/useAppDispatch.hook";
import { handlePause } from "../../slices/gameState.slice";

const Options = () => {
  const { handleClickPauseGame, handleClickHowToPlay } = useAppContext();
  const { gamePaused, gameLose, howToOpen } = useAppSelector(
    (state) => state.gameState,
  );
  const dispatch = useAppDispatch();

  const handleClickOpenHowToPlay = () => {
    handleClickHowToPlay();
    dispatch(handlePause());
  };

  useKeydown("S", handleClickPauseGame, !gameLose);
  useKeydown("H", handleClickOpenHowToPlay, !gameLose);

  return (
    <section
      data-options
      className="fixed top-4 right-4 flex items-center justify-center gap-2 px-3 py-1.5"
    >
      <OptionsHowTo isOpen={howToOpen} onClickOpen={handleClickOpenHowToPlay} />
      <OptionDifficulties />
      <OptionPause
        isFaded={howToOpen}
        isPaused={gamePaused}
        onClickPauseHandle={handleClickPauseGame}
      />
      <HowToPlay isOpen={howToOpen} />
    </section>
  );
};

export default Options;
