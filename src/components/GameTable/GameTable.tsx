import { useAppSelector } from "../../hooks/useAppSelector.hook";
import TableRow from "./Table/TableRow";

const GameTable = () => {
  const { table } = useAppSelector((state) => state.table);

  

  return (
    <section data-game-table className="p-10">
      {table.map((row, i) => (
        <TableRow key={i} row={row} rowNum={i} />
      ))}
    </section>
  );
};

export default GameTable;
