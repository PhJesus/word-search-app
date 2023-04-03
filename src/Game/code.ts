import { Grid, TGrid } from "./grid";
import { cleanWord, sortWordList } from "./words";
import { Direction } from "./directions";
import { getRandomRowCol } from "./random";

const words: string[] = ["Teste", "Banana", "Frango"];

const directions: string[] = ["Horizontal", "Vertical", "Diagonal"];

let grid: string[][] = [];

const maxGridSize = getBiggestWord(words) * 2; //! Da pra deixar o numero * ele mesmo depois sla

for (let i = 0; i < maxGridSize; i++) {
  grid[i] = [];
  for (let j = 0; j < maxGridSize; j++) {
    grid[i][j] = "";
  }
}

const separado = words[0].split('');

//insertWords(separado, grid, 'Diagonal');

//console.log(grid);

function getBiggestWord(wordArray: string[]): number {
  let biggestWordLength = 0
  for (let i = 0; i < wordArray.length; i++) {
    if (wordArray[i].length > biggestWordLength) {
      biggestWordLength = wordArray[i].length;
    }
  }
  return biggestWordLength;
}

function insertWordsIntoGrid(word: string[], grid: TGrid, options: Object): void {
  let wordPointerX: number = 0;
  let wordPointerY: number = 0;
  //*   check game options

  
  //*   clone the grid
  const clonedGrid = grid;


  for (let i = 0; i < word.length; i++) {

    //*   get random direction
    const direction = getRandomDirection();

    //*   check if word should be reversed or not
    //if (isReversed && randomBool())

    //*   get random row from the grid (if is diagonal up use row = grid length - row - 1 , also check why)
    const xCoord = getRandomRowCol(word[i], clonedGrid, true);
    //*   get random col from the grid
    const yCoord = getRandomRowCol(word[i], clonedGrid, false);
    //*   check if the word is placeable
    //! if (!wordPlaceable())

    //? Case directions
    if (direction == Direction.Horizontal) {
      grid[wordPointerX][wordPointerY] = word[i];
      wordPointerY++;
    }
    if (direction == Direction.Vertical) {
      grid[wordPointerX][wordPointerY] = word[i];
      wordPointerX++;
    }
    if (direction == Direction.DiagonalDown) {
      grid[wordPointerX][wordPointerY] = word[i];
      wordPointerX++;
      wordPointerY++;
    }

    if (direction == Direction.DiagonalUp) {
      grid[wordPointerX][wordPointerY] = word[i];
      wordPointerX++;
      wordPointerY--;
    }
  }
    
  //*     iterate word letters

  //*     check the letter coordinates by getting the current letter index and the generated row and col and the selected direction

  //*     get the current cell from the grid and check if it's empty, if it is return false (maybe you can compare if the current word is equal to the current placed word in the grid)

  //*     if the iteration finishes, return true

  //*   iterate the word again
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
  const grid = new Grid(maxGridSize, maxGridSize);

  //* create placed words array
  const placedWords: string[] = [];

  //* place words randomly
  insertWordsIntoGrid()
  
  //* push placed words into an array
  //* fill blanks
  //* return grid and placedwords
}

/*

  ['T', '', '', '', '', '',  '', '', '', ''],
  ['e', '', '', '', '', '',  '', '', '', ''],
  ['s', '', '', '', '', '',  '', '', '', ''],
  ['t', '', '', '', '', '',  '', '', '', ''],
  ['e', '', '', '', '', '',  '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', '']

  ['T', 'e', 's', 't', 'e', '',  '',  '', '', ''],
  ['', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', '']

  ['T', '', '', '', '','',  '', '', '', ''],
  ['', 'e', '', '', '','', '',  '', '', ''],
  ['', '', 's', '', '','', '', '',  '', ''],
  ['', '', '', 't', '','', '', '', '',  ''],
  ['', '', '', '', 'e','', '', '', '', ''],
  ['', '', '', '', '','', '', '', '', ''],
  ['', '', '', '', '','', '', '', '', ''],
  ['', '', '', '', '','', '', '', '', ''],
  ['', '', '', '', '','', '', '', '', ''],
  ['', '', '', '', '','', '', '', '', '']

*/