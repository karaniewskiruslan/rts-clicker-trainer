import { useAppContext } from "../../context/AppContext";
import { useAppSelector } from "../../hooks/useAppSelector.hook";
import { useKeydown } from "../../hooks/useKeydown.hook";
import OptionDifficulties from "./OptionDifficulties";
import OptionPause from "./OptionPause";

const Options = () => {
  const { handleClickPauseGame } = useAppContext();
  const { gamePaused, gameLose } = useAppSelector((state) => state.gameState);

  useKeydown("S", handleClickPauseGame, !gameLose);

  return (
    <section
      data-options
      className="fixed top-4 right-4 flex items-center justify-center gap-2 px-3 py-1.5"
    >
      <OptionDifficulties />
      <OptionPause
        isPaused={gamePaused}
        onClickPauseHandle={handleClickPauseGame}
      />
    </section>
  );
};

export default Options;
