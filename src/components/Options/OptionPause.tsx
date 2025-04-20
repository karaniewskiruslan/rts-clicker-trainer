import classNames from "classnames";
import pause from "/img/pause.svg";
import resume from "/img/resume.svg";

type Props = {
  isPaused: boolean;
  onClickPauseHandle: () => void;
};

const OptionPause = ({ isPaused, onClickPauseHandle }: Props) => {
  return (
    <>
      <button
        className="size-8 cursor-pointer rounded-full border"
        onClick={onClickPauseHandle}
      >
        <img
          src={isPaused ? resume : pause}
          alt={isPaused ? "resume" : "pause"}
          className="size-full"
        />
      </button>
      <text className="pointer-events-none absolute -left-[10rem] w-fit overflow-hidden">
        <p
          className={classNames(
            "ease-in-outs text-2xl font-bold text-nowrap transition-transform duration-300",
            { "translate-x-full": !isPaused },
          )}
        >
          Game Paused
        </p>
      </text>
    </>
  );
};

export default OptionPause;
