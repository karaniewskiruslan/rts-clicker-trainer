import TableCell from "./TableCell";

type Props = {
  row: ("X" | "O")[];
  rowNum: number;
};

const TableRow = ({ row, rowNum }: Props) => {
  return (
    <div className="grid grid-cols-5">
      {row.map((content, i) => (
        <TableCell key={i} content={content} colNum={i} rowNum={rowNum} />
      ))}
    </div>
  );
};

export default TableRow;
