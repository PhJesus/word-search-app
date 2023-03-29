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

insertWord(separado, grid, 'Diagonal');

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

function insertWord(word: string[], grid: string[][], direction: string): void {
  let wordPointerX: number = 0;
  let wordPointerY: number = 0;
  
  for (let i = 0; i < word.length; i++) {
    if (direction == directions[0]) {
      grid[wordPointerX][wordPointerY] = word[i];
      wordPointerY++;
    }
    if (direction == directions[1]) {
      grid[wordPointerX][wordPointerY] = word[i];
      wordPointerX++;
    }
    if (direction == directions[2]) {
      grid[wordPointerX][wordPointerY] = word[i];
      wordPointerX++;
      wordPointerY++;
    }
  }
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