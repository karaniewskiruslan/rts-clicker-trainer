import { useAppContext } from "../../../context/AppContext";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useAppSelector } from "../../../hooks/useAppSelector.hook";
import classNames from "classnames";

type Props = {
  content: "X" | "O";
  colNum: number;
  rowNum: number;
};

const cellVariant: Variants = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
};

const cellEnterVariant: Variants = {
  initial: {
    opacity: 1,
    scale: 1,
  },
  animate: {
    opacity: 0,
    scale: 0,
  },
};

const TableCell = ({ content, colNum, rowNum }: Props) => {
  const { handleClickDeleteCell } = useAppContext();
  const { gamePaused, timerStopped, bonusActive } = useAppSelector(
    (state) => state.gameState,
  );

  const handleClickCell = () => {
    handleClickDeleteCell(content, rowNum, colNum);
  };

  return (
    <div
      className="h-[8dvh] w-[6dvw] cursor-pointer bg-orange-100 outline outline-gray-300"
      onMouseDown={handleClickCell}
    >
      <AnimatePresence>
        {content === "X" ? (
          <motion.div
            initial="initial"
            animate="animate"
            variants={cellVariant}
            transition={{ duration: 0.1 }}
            className="size-full bg-black"
          ></motion.div>
        ) : (
          (!gamePaused || !timerStopped) && (
            <motion.div
              initial="initial"
              animate="animate"
              variants={cellEnterVariant}
              transition={{ duration: 0.3 }}
              className={classNames(
                "grid size-full place-items-center bg-green-400 select-none",
                {
                  "text-3xl text-red-500": bonusActive,
                  "text-2xl": !bonusActive,
                },
              )}
            >
              {bonusActive ? "+2" : "+1"}
            </motion.div>
          )
        )}
      </AnimatePresence>
    </div>
  );
};

export default TableCell;
