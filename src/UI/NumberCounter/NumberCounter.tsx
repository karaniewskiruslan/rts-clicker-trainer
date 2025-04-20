import { AnimatePresence, LayoutGroup, motion, Variants } from "motion/react";
import NumberStroke from "./NumberStroke";
import { useMemo } from "react";

type Props = {
  name: string;
  number: number;
  size: number;
};

const numberVariants: Variants = {
  initial: {
    width: 0,
  },
  animate: {
    width: "auto",
    transition: { duration: 0.3 },
  },
  exit: {
    width: 0,
    transition: { duration: 0.2 },
  },
};

const NumberCounter = ({ name, number, size }: Props) => {
  const numberArray = useMemo(() => {
    return number.toString().split("").map(Number);
  }, [number]);
  const NumberStrokeMotion = motion(NumberStroke);

  return (
    <section className="flex justify-center">
      <AnimatePresence>
        <LayoutGroup id={`number-counter-${name}`}>
          {numberArray.map((n, i) => (
            <NumberStrokeMotion
              key={i}
              layout
              variants={numberVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              numberSize={size}
              position={n}
            />
          ))}
        </LayoutGroup>
      </AnimatePresence>
    </section>
  );
};

export default NumberCounter;
