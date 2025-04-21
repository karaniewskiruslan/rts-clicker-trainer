import { Table } from "../types/table";

const TABLE_SIZE = 5;

export const INITIAL_TABLE: Table = new Array(TABLE_SIZE).fill(
  new Array(TABLE_SIZE).fill("O"),
);

export const START_TIME = 10;

export const ADD_TIMER_SCORE_EASY = 35;
export const ADD_TIMER_SCORE_NORMAL = 40;
export const ADD_TIMER_SCORE_HARD = 45;
