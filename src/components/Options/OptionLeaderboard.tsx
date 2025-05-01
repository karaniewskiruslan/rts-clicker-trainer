import classNames from "classnames";
import records from "/img/records.svg";
import { useAppSelector } from "../../hooks/useAppSelector.hook";
import { useAppContext } from "../../context/AppContext";

const OptionLeaderboard = () => {
  const { handleClickLeaderboard } = useAppContext();
  const { leaderboardOpen } = useAppSelector((state) => state.gameState);

  return (
    <button
      onClick={handleClickLeaderboard}
      className={classNames(
        "size-8 cursor-pointer rounded-full border duration-150",
        {
          "bg-orange-300": leaderboardOpen,
        },
      )}
    >
      <img src={records} alt="difficulty" className="size-full" />
    </button>
  );
};

export default OptionLeaderboard;
