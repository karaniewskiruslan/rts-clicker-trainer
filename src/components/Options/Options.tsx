import { useAppContext } from "../../context/AppContext";
import { useAppSelector } from "../../hooks/useAppSelector.hook";
import HowToPlay from "./HowToPlay/HowToPlay";
import OptionDifficulties from "./OptionDifficulties";
import OptionsHowTo from "./OptionHowTo";
import OptionPause from "./OptionPause";
import OptionLeaderboard from "./OptionLeaderboard";
import Leaderboard from "./Leaderboard/Leaderboard";

const Options = () => {
  const { handleClickPauseGame } = useAppContext();
  const { gamePaused, howToOpen, leaderboardOpen } = useAppSelector(
    (state) => state.gameState,
  );

  return (
    <section
      data-options
      className="fixed top-4 right-4 flex items-center justify-center gap-2 px-3 py-1.5"
    >
      <OptionLeaderboard />
      <OptionsHowTo isOpen={howToOpen} />
      <OptionDifficulties />
      <OptionPause
        isFaded={howToOpen}
        isPaused={gamePaused}
        onClickPauseHandle={handleClickPauseGame}
      />
      <HowToPlay isOpen={howToOpen} />
      <Leaderboard isOpen={leaderboardOpen} />
    </section>
  );
};

export default Options;
