import { Words } from "./words";
import { Direction, getWordCoordinates } from "./directions";
import { getRandomRowCol, getRandomDirection, randomBool } from "./random";

export type Cell = string | undefined;

export type TGrid = Cell[][];

export type gameOptions = {
  allowBackwards: boolean;
  allowDiagonals: boolean;
}

export type configParams = {
  allowBackwards: boolean;
  allowDiagonals: boolean;
  size: {
    x: number,
    y: number
  },
  words?: string[]
}

const wordArr: string[] = ["Gato", "Cachorro", "Boi", "Vaca", "Cavalo", "Gorila", "Touro", "Abelha", "Girafa", "Passaro", "Anta", "Preguiça", "Cabra"];

export class Generator {
  width: number;
  heigth: number;
  grid: TGrid = [];
  options: gameOptions;
  words: Words;
  maxAttempts: number = 1000;

  constructor(configParams: configParams) {
    this.width = configParams.size.x;
    this.heigth = configParams.size.y;
    this.words = new Words(wordArr);
    this.options = { allowBackwards: true, allowDiagonals: true };
    this.grid = this.Generate();
  }

  createGrid() {
    for (let i = 0; i < this.width; i++) {
      this.grid[i] = [];
      for (let j = 0; j < this.heigth; j++) {
        this.grid[i][j] = undefined;
      }
    }
  }

  Generate(): TGrid {
    this.words.sortWordList(this.words.selectedWords);
    this.createGrid();
    this.InsertWords();
    this.FillEmpty();
    //this.PrintGrid();
    //this.PrintWords();
    return this.grid;
  }

  InsertWords() {
    this.words.selectedWords.forEach((w) => {
      try {
        let newGrid: undefined | TGrid = undefined;
        let attempt = 1;
        do {
          const clonedGrid = this.grid;
          let wordToPlace: string;
          const direction = getRandomDirection(this.options.allowDiagonals);
          
          //? Check if word should be reversed or not and format the word to be placed
          if (this.options.allowBackwards && randomBool()) wordToPlace = this.words.cleanWord(this.words.reverseWord(w));
          else wordToPlace = this.words.cleanWord(w);

          //? Get random coordinates from the grid
          let xCoord = getRandomRowCol(wordToPlace, clonedGrid, true);
          if (direction === Direction.DiagonalUp) {
            xCoord = this.grid.length - xCoord - 1;
          }
          const yCoord = getRandomRowCol(wordToPlace, clonedGrid, false); 
          
          //? Check if the word is placeable, if it's placeable, place the word
          if (this.words.isPlaceable(clonedGrid, wordToPlace, direction, xCoord, yCoord)) {
            for (let j = 0; j < wordToPlace.length; j++) {
              const { row: r, col: c } = getWordCoordinates(direction, xCoord, yCoord, j);
              clonedGrid[r]![c] = wordToPlace[j];
            }
            newGrid = clonedGrid;
          } else {
            newGrid = undefined;
          }


        } while (newGrid === undefined && attempt++ < this.maxAttempts);

        if (newGrid !== undefined) {
          this.words.placedWords.push(w);
          this.grid = newGrid;
        }
        else {
          throw new Error(`Could not place word`);
        }
      } catch (error) {
        console.error(error);
      }
    });
  }

  FillEmpty() {
    const fillLetters: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        if (this.grid[i][j] == undefined) {
          this.grid[i][j] = fillLetters[Math.floor(Math.random() * fillLetters.length)];
        }
      }
    }
  }

  PrintGrid() {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        if (this.grid[i][j] == undefined) {
          process.stdout.write(` - `);
        } else {
          process.stdout.write(` ${this.grid[i][j]} `);
        }
      }
      console.log('');
    } 
  }

  PrintWords() {
    this.words.placedWords.forEach(x => {
      process.stdout.write(`\x1b[31m ${x}\x1b[0m`);
    });
  }
}

const gridors = new Generator({
  allowBackwards: true,
  allowDiagonals: true,
  size: {
    x: 30,
    y: 30
  }
});

console.log(gridors.grid);
console.log(gridors.words.selectedWords);
