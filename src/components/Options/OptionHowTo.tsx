import classNames from "classnames";
import howTo from "/img/howTo.svg";

type Props = {
  isOpen: boolean;
  onClickOpen: () => void;
};

const OptionsHowTo = ({ onClickOpen, isOpen }: Props) => {
  return (
    <button
      className={classNames(
        "size-8 cursor-pointer rounded-full border duration-150",
        {
          "bg-orange-300": isOpen,
        },
      )}
      onClick={onClickOpen}
    >
      <img src={howTo} alt="How to play" className="size-full" />
    </button>
  );
};

export default OptionsHowTo;
