import { AnimatePresence } from "motion/react";
import Footer from "./components/Footer";
import GameTable from "./components/GameTable/GameTable";
import HeadPanel from "./components/HeadPanel/HeadPanel";
import Options from "./components/Options/Options";
import { useAppSelector } from "./hooks/useAppSelector.hook";
import LoseScreen from "./components/LoseScreen";

const App = () => {
  const { gameLose } = useAppSelector((state) => state.gameState);

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4">
      <HeadPanel />
      <GameTable />
      <AnimatePresence>{gameLose && <LoseScreen />}</AnimatePresence>
      <Footer />
      <Options />
    </main>
  );
};

export default App;
