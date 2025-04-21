import classNames from "classnames";
import pause from "/img/pause.svg";
import resume from "/img/resume.svg";

type Props = {
  isPaused: boolean;
  isFaded: boolean;
  onClickPauseHandle: () => void;
};

const OptionPause = ({ isPaused, onClickPauseHandle, isFaded }: Props) => {
  return (
    <>
      <button
        className={classNames("size-8 rounded-full border duration-150", {
          "cursor-not-allowed opacity-50": isFaded,
          "cursor-pointer": !isFaded,
        })}
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
