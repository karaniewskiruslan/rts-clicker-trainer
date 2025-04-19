import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INITIAL_TABLE } from "../constants/constants";
import { Table } from "../types/table";

type TableState = {
  table: Table;
};

const initialState: TableState = { table: INITIAL_TABLE };

const tableSlice = createSlice({
  name: "tableState",
  initialState,
  reducers: {
    resetTable: (state) => {
      state.table = INITIAL_TABLE;
    },
    setNewCell: (state) => {
      const filledCells: [number, number][] = [];

      state.table.forEach((row, r) => {
        row.forEach((col, c) => {
          if (col === "O") {
            filledCells.push([r, c]);
          }
        });
      });

      const [row, col] =
        filledCells[Math.floor(Math.random() * filledCells.length)];

      state.table[row][col] = "X";
    },
    deleteCell: (state, action: PayloadAction<[number, number]>) => {
      const [row, col] = action.payload;
      state.table[row][col] = "O";
    },
  },
});

export const { resetTable, setNewCell, deleteCell } = tableSlice.actions;
export default tableSlice.reducer;
