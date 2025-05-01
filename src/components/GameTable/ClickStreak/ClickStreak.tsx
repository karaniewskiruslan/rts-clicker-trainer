import { CSSProperties } from "react";
import { useAppSelector } from "../../../hooks/useAppSelector.hook";
import classNames from "classnames";

const ClickStreak = () => {
  const { clickStrike, bonusActive } = useAppSelector(
    (state) => state.gameState,
  );

  const clickStreakStyle: CSSProperties = {
    width: `${clickStrike}%`,
  };

  return (
    <section data-click-streak className="px-4 py-2">
      <div className="h-2 w-[30dvw] overflow-hidden rounded-full bg-orange-100">
        <div
          style={clickStreakStyle}
          className={classNames("h-full w-1/2 duration-200", {
            "bg-red-300": bonusActive,
            "bg-indigo-300": !bonusActive,
          })}
        ></div>
      </div>
    </section>
  );
};

export default ClickStreak;
