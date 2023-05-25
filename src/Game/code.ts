import { Generator, TGrid, Cell } from "./grid";
import { cleanWord, reverseWord, sortWordList } from "./words";
import { Direction, getWordCoordinates } from "./directions";
import { getRandomRowCol, getRandomDirection, randomBool } from "./random";

const words: string[] = ["Gato", "Cachorro", "Boi", "Vaca", "Cavalo", "Gorila", "Touro", "Abelha", "Girafa", "Passaro", "Anta"];
const maxGridSize = getBiggestWord(words) * 2;

generateGrid(words);

type gameOptions = {
  allowBackwards: boolean;
  allowDiagonals: boolean;
}

function getBiggestWord(wordArray: string[]): number {
  let biggestWordLength = 0
  for (let i = 0; i < wordArray.length; i++) {
    if (wordArray[i].length > biggestWordLength) {
      biggestWordLength = wordArray[i].length;
    }
  }
  return biggestWordLength;
}

function isPlaceable(clonedGrid: TGrid, word: string, direction: Direction, row: number, col: number): boolean {
  for (let i = 0; i < word.length; i++) {
    const { row: r, col: c } = getWordCoordinates(direction, row, col, i);

    //? Get the current cell from the grid and check if it's empty, if it is return false
    //TODO (maybe you can compare if the current word is equal to the current placed word in the grid)
    const cell: Cell = clonedGrid[r]![c];
    console.log(word[i]);
    if (cell != undefined && word[i] != cell) return false;
  }

  return true;
}

function insertWordIntoGrid(word: string, grid: TGrid, options: gameOptions, maxAttempts: number = 1000): TGrid | undefined {
  let newGrid: undefined | TGrid = undefined;
  let attempt = 1;
  do {
    console.log(attempt);
    const clonedGrid = grid;

    let wordToPlace: string;
    const direction = getRandomDirection(options.allowDiagonals);
    
    //? Check if word should be reversed or not and format the word to be placed
    if (options.allowBackwards && randomBool()) wordToPlace = cleanWord(reverseWord(word));
    else wordToPlace = cleanWord(word);

    //? Get random coordinates from the grid
    let xCoord = getRandomRowCol(wordToPlace, clonedGrid, true);
    if (direction === Direction.DiagonalUp) {
      xCoord = grid.length - xCoord - 1;
    }
    const yCoord = getRandomRowCol(wordToPlace, clonedGrid, false);

    //? Check if the word is placeable, if it's placeable, place the word
    
    if (isPlaceable(clonedGrid, wordToPlace, direction, xCoord, yCoord)) {
      for (let j = 0; j < wordToPlace.length; j++) {
        const { row: r, col: c } = getWordCoordinates(direction, xCoord, yCoord, j);
        clonedGrid[r]![c] = wordToPlace[j];
      }
      newGrid = clonedGrid;
    } else {
      newGrid = undefined;
    }
  } while (newGrid === undefined && attempt++ < maxAttempts);

  if (newGrid !== undefined) {
    return newGrid;
  }

  throw new Error(`Could not place word`);

  //TODO - for gods sake make this less chaotic

  //*   iterate the word again

  //TODO - Fix the word insertion 
  //*   check letter coordinates again
  //*   place the letter into the grid coordinates
  //*   return the cloned grid
  //*   return undefined if the grid is not created

  //*   attempt to place the words (add a max attempts variable to count, because it have to try some times to generate a working grid)
  //*   if the grid is created return it, else throw error :(
}

function generateGrid(words: string[]) {
  //* get words
  const sortedWordList = sortWordList(words.map(cleanWord));

  //* create grid
  let grid: TGrid | undefined = new Generator(maxGridSize, maxGridSize).grid;

  const options: gameOptions = {
    allowBackwards: true,
    allowDiagonals: true
  }

  //* create placed words array
  const placedWords: string[] = [];

  //* place words randomly

  sortedWordList.forEach((w) => {
    try {
      grid = insertWordIntoGrid(w, grid as TGrid, options);
      placedWords.push(w);
    } catch (error) {
      console.error(error);
    }
  });

  const alphabet: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  //printMatrix(grid);

  grid = fillEmpty(grid, alphabet);




  console.log(placedWords);

  printMatrix(grid);
  
  //* push placed words into an array
  //* fill blanks
  //* return grid and placedwords
}

function fillEmpty(grid: TGrid, fillLetters: string[]): TGrid {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] == undefined) {
        grid[i][j] = fillLetters[Math.floor(Math.random() * fillLetters.length)];
      }
    }
  }
  return grid;
}

function printMatrix(grid: TGrid) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] == undefined) {
        process.stdout.write(` - `);
      } else {
        process.stdout.write(` ${grid[i][j]} `);
      }
    }
    console.log('');
  } 
}