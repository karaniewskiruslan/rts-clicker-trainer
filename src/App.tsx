import GameTable from "./components/GameTable/GameTable";
import HeadPanel from "./components/HeadPanel/HeadPanel";
import LostScreen from "./components/LostScreen";
import { useAppSelector } from "./hooks/useAppSelector.hook";

const App = () => {
  const { gameLost } = useAppSelector((state) => state.gameState);

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4">
      <HeadPanel />
      <GameTable />
      {gameLost && <LostScreen />}
    </main>
  );
};

export default App;
