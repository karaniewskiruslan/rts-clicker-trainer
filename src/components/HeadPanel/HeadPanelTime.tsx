import { motion } from "framer-motion";
import { useAppContext } from "../../context/AppContext";

type Props = {
  title: string;
  time: number;
};

const HeadPanelTime = ({ title, time }: Props) => {
  const { addPoint, addPointText } = useAppContext();

  return (
    <article className="relative flex w-20 flex-col justify-center gap-1 text-center">
      <p className="text-sm">{title}</p>
      <p className="animate-number relative text-3xl" key={Math.ceil(time)}>
        {Math.ceil(time)}
        {addPoint && (
          <motion.span
            initial={{ x: 20, opacity: 1 }}
            animate={{ x: 0, opacity: 0 }}
            transition={{ duration: 0.05 }}
            onAnimationComplete={addPointText}
            className="absolute top-0 left-2 text-3xl text-green-400"
          >
            +10
          </motion.span>
        )}
      </p>
    </article>
  );
};

export default HeadPanelTime;
