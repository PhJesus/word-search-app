type Cell = string | undefined;

type Grid = Cell[][];

export class Game {
  width: number;
  heigth: number;
  grid: Grid;

  constructor() {
    this.width = 10;
    this.heigth = 10;
    this.grid = this.createGrid();
  }

  createGrid(): Grid {
    let grid: Grid = [];
    for (let i = 0; i < this.width; i++) {
      grid[i] = [];
      for (let j = 0; j < this.heigth; j++) {
        grid[i][j] = undefined;
      }
    }
    console.log(grid);
    return grid
  }
}

new Game();