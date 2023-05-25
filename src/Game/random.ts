import { Direction } from "./directions";
import { TGrid } from "./grid";

export const getRandomRowCol = (word: string, grid: TGrid, isRow: boolean): number => {
  if (word.length > grid.length) throw new Error(`Word ${word} is too long!`);
  if (word[0]!.length > grid.length) throw new Error(`Word ${word} is too long!`);

  const min = 0;
  
  let max: number;
  if (isRow) max = grid.length - word.length;
  else max = grid[0]!.length - word.length;

  return Math.floor(Math.random() * (Math.ceil(max) - Math.floor(min) + 1)) + Math.ceil(min);
}

export const getRandomDirection = (allowDiagonal = true): Direction => {
  if (allowDiagonal)
    return Math.floor(Math.random() * 4)
  else
    return Math.floor(Math.random() * 2)
}

export const randomBool = () => Math.random() >= 0.5;