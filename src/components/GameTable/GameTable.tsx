import { useEffect } from "react";
import { useAppSelector } from "../../hooks/useAppSelector.hook";
import TableRow from "./Table/TableRow";
import { useAppContext } from "../../context/AppContext";

const GameTable = () => {
  const { handleClickStartGame } = useAppContext();
  const { table } = useAppSelector((state) => state.table);

  useEffect(() => {
    handleClickStartGame();
  }, []);

  return (
    <section data-game-table className="p-10">
      {table.map((row, i) => (
        <TableRow key={i} row={row} rowNum={i} />
      ))}
    </section>
  );
};

export default GameTable;
