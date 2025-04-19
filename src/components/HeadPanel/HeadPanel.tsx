import { useAppSelector } from "../../hooks/useAppSelector.hook";
import HeadPanelInfo from "./HeadPanelInfo";

const HeadPanel = () => {
  const { score, time } = useAppSelector((state) => state.gameState);

  return (
    <div
      data-game-options
      className="flex items-center justify-center gap-12 px-8 py-4"
    >
      <HeadPanelInfo title="Score" info={score} />
      <h1 className="text-7xl font-bold">Click trainer</h1>
      <HeadPanelInfo title="Time" info={time} />
    </div>
  );
};

export default HeadPanel;
