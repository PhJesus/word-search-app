export type Cell = string | undefined;

export type TGrid = Cell[][];

export class Grid {
  width: number;
  heigth: number;
  grid: TGrid;

  constructor(width: number, heigth: number) {
    this.width = width;
    this.heigth = heigth;
    this.grid = this.createGrid();
  }

  createGrid(): TGrid {
    let grid: TGrid = [];
    for (let i = 0; i < this.width; i++) {
      grid[i] = [];
      for (let j = 0; j < this.heigth; j++) {
        grid[i][j] = undefined;
      }
    }
    return grid;
  }
}
