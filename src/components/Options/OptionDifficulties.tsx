import { useAppContext } from "../../context/AppContext";
import { useAppSelector } from "../../hooks/useAppSelector.hook";
import difficultyEasy from "/img/difficulty-1.svg";
import difficultyNormal from "/img/difficulty-2.svg";
import difficultyHard from "/img/difficulty-3.svg";

const OptionDifficulties = () => {
  const { handleClickChangeDifficulty } = useAppContext();
  const { difficulty } = useAppSelector((state) => state.gameState);

  const image = () => {
    switch (difficulty) {
      case 0:
        return difficultyEasy;
      case 1:
        return difficultyNormal;
      default:
        return difficultyHard;
    }
  };

  return (
    <button
      className="size-8 cursor-pointer rounded-full border"
      onClick={handleClickChangeDifficulty}
    >
      <img src={image()} alt="difficulty" className="size-full" />
    </button>
  );
};

export default OptionDifficulties;
