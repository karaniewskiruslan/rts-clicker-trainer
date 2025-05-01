import classNames from "classnames";
import { useAppContext } from "../../../context/AppContext";
import difficultyEasy from "/img/difficulty-1.svg";
import difficultyNormal from "/img/difficulty-2.svg";
import difficultyHard from "/img/difficulty-3.svg";
import { useMemo } from "react";

type Props = {
  isOpen: boolean;
};

const Leaderboard = ({ isOpen }: Props) => {
  const { leaderboard } = useAppContext();
  const leaderboardTopFive = useMemo(() => {
    return leaderboard
      .slice()
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  }, [leaderboard]);
  const image = (dif: number) => {
    switch (dif) {
      case 0:
        return difficultyEasy;
      case 1:
        return difficultyNormal;
      default:
        return difficultyHard;
    }
  };

  const dateString = (date: Date | string) => {
    const d = new Date(date);
    const month = d.getMonth() + 1;
    return `${d.getDate()}.${month.toString().length === 1 ? `0${month}` : month}.${d.getFullYear()}`;
  };

  return (
    <div
      data-leaderboard
      className={classNames(
        "absolute top-15 right-0 h-auto w-80 px-6 py-3 transition-all duration-150",
        {
          "max-h-fit": isOpen,
          "max-h-0 opacity-0": !isOpen,
        },
      )}
    >
      <h2 className="mb-2 text-center">Top 5</h2>
      <ul className="flex flex-col gap-2">
        {leaderboardTopFive.map((pos) => (
          <li
            key={pos.id}
            className="flex items-center justify-between rounded-full px-2 py-1 text-center text-xl outline"
          >
            <b className="w-10">{pos.score}</b>
            <div className="grid size-6 place-items-center rounded-full outline">
              <img
                src={image(pos.difficulty)}
                alt="Difficulty on run"
                className="size-5"
              />
            </div>
            <p className="text-md">{dateString(pos.date)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
