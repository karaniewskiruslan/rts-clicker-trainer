import classNames from "classnames";
import howTo from "/img/howTo.svg";
import { useAppContext } from "../../context/AppContext";

type Props = {
  isOpen: boolean;
};

const OptionsHowTo = ({ isOpen }: Props) => {
  const { handleClickHowToPlay } = useAppContext();

  return (
    <button
      className={classNames(
        "size-8 cursor-pointer rounded-full border duration-150",
        {
          "bg-orange-300": isOpen,
        },
      )}
      onClick={handleClickHowToPlay}
    >
      <img src={howTo} alt="How to play" className="size-full" />
    </button>
  );
};

export default OptionsHowTo;
