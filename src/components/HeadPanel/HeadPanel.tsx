import { useAppSelector } from "../../hooks/useAppSelector.hook";
import HeadPanelScore from "./HeadPanelScore";
import HeadPanelTime from "./HeadPanelTime";

const HeadPanel = () => {
  const { score, time } = useAppSelector((state) => state.gameState);

  return (
    <div
      data-game-options
      className="flex items-center justify-center gap-12 px-8 py-4"
    >
      <HeadPanelScore title="Score" score={score} />
      <h1 className="text-7xl font-bold">Click trainer</h1>
      <HeadPanelTime title="Time" time={time} />
    </div>
  );
};

export default HeadPanel;
