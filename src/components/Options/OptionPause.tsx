import classNames from "classnames";
import pause from "/img/pause.svg";
import resume from "/img/resume.svg";
import { motion } from "framer-motion";

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
        <motion.p
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 20,
            duration: 0.25,
          }}
          initial={{ x: 0 }}
          animate={{ x: isPaused ? 0 : "125%" }}
          className="text-2xl font-bold text-nowrap"
        >
          Game Paused
        </motion.p>
      </text>
    </>
  );
};

export default OptionPause;
