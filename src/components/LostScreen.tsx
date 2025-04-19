import { AnimatePresence, motion } from "framer-motion";
import { useAppContext } from "../context/AppContext";
import { useKeydown } from "../hooks/useKeydown.hook";
import { useAppSelector } from "../hooks/useAppSelector.hook";

const lostScreenVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const LostScreen = () => {
  const { gameLost } = useAppSelector((state) => state.gameState);
  const { onClickStartGame } = useAppContext();

  useKeydown("R", onClickStartGame, gameLost);

  return (
    <AnimatePresence>
      <motion.section
        variants={lostScreenVariants}
        initial="initial"
        exit="exit"
        animate="animate"
        transition={{ duration: 0.3 }}
        className="bg-lost-screen fixed top-0 left-0 z-30 flex h-full w-full flex-col items-center justify-center gap-4 backdrop-blur-md"
      >
        <div className="text-center text-white">
          <h2 className="mb-2 text-5xl font-bold">You lost!</h2>
          <p>Click the button or click R to try again.</p>
        </div>
        <button
          onClick={onClickStartGame}
          className="cursor-pointer rounded-md bg-orange-200 px-4 py-2 duration-300 hover:bg-orange-300 active:scale-90"
        >
          TRY AGAIN
        </button>
      </motion.section>
    </AnimatePresence>
  );
};

export default LostScreen;
