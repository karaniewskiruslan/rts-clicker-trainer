import { motion } from "motion/react";
import { CSSProperties } from "react";

type Props = {
  position: number;
  numberSize: number;
};

const NumberStroke = ({ position, numberSize }: Props) => {
  const numbers = new Array(10).fill(0).map((_, i) => i);

  const containerHeight = numberSize * 4 * 1.5;

  const containerStyle: CSSProperties = {
    maxHeight: containerHeight,
  };

  const numberStyle: CSSProperties = {
    fontSize: numberSize * 4,
  };

  console.log(numbers);

  return (
    <article style={containerStyle} className="overflow-hidden">
      <motion.ul
        animate={{ y: -position * containerHeight }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex w-full flex-col text-center"
      >
        {numbers.map((n) => (
          <li key={n} style={numberStyle}>
            {n}
          </li>
        ))}
      </motion.ul>
    </article>
  );
};

export default NumberStroke;
