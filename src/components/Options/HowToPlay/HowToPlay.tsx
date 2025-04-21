import classNames from "classnames";
import difficultyEasy from "/img/difficulty-1.svg";
import difficultyNormal from "/img/difficulty-2.svg";
import difficultyHard from "/img/difficulty-3.svg";

type Props = {
  isOpen: boolean;
};

const HowToPlay = ({ isOpen }: Props) => {
  return (
    <div
      data-how-to-play
      className={classNames(
        "absolute top-15 right-0 h-auto w-80 px-6 py-3 transition-all duration-150",
        {
          "max-h-fit": isOpen,
          "max-h-0 opacity-0": !isOpen,
        },
      )}
    >
      <h2 className="text-3xl font-bold">Tutorial</h2>
      <h3 className="font-bold">How to play click trainer</h3>
      <p data-how-to-play-paragraph>
        Click on black cells to earn the points. All clicked cells give you 1
        point. After gaining certain amount of point, you gain 10 extra seconds
        to play depends of number of point you earned. You lose if time has run
        out, or you click white cell.
      </p>
      <h3 className="font-bold">Difficulty</h3>
      <p data-how-to-play-paragraph>
        You have 3 levels of difficulty which add 10 more seconds to play: easy
        (every 35 point){" "}
        <span className="inline-block size-4">
          <div className="grid place-items-center rounded-full outline">
            <img src={difficultyEasy} alt="Easy" className="size-full" />
          </div>
        </span>
        , normal (every 40 points){" "}
        <span className="inline-block size-4">
          <div className="grid place-items-center rounded-full outline">
            <img src={difficultyNormal} alt="Normal" className="size-full" />
          </div>
        </span>{" "}
        and hard (every 45 points){" "}
        <span className="inline-block size-4">
          <div className="grid place-items-center rounded-full outline">
            <img src={difficultyHard} alt="hard" className="size-full" />
          </div>
        </span>
        . Choose the optimal difficulty for you and raise it as your confidence
        grows.
      </p>
      <h3 className="font-bold">Hotkeys</h3>
      <div data-how-to-play-paragraph>
        <p>
          <b>S</b> - pause game
        </p>
        <p>
          <b>R</b> - restart game (only if lost)
        </p>
        <p>
          <b>H</b> - open tutorial
        </p>
      </div>
    </div>
  );
};

export default HowToPlay;
