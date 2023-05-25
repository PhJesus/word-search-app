
import { TGrid, Cell } from "./grid";
import { Direction, getWordCoordinates } from "./directions";

export const reverseWord = (word: string): string => { return word.split('').reverse().join() };

//TODO - Remove ^~´` from words
export const cleanWord = (word: string): string => { return word.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replaceAll(",", "") };

export const sortWordList = (words: string[]): string[] => words.sort((a, b) => b.length - a.length);

export class Words {
  selectedWords: string[];
  placedWords: string[] = [];


  constructor(wordArr: string[]) {
    this.selectedWords = this.sortWordList(wordArr);
    
  }

  getBiggestWord(wordArray: string[]): number {
    let wordLength: number = 0;
    for (let i = 0; i < wordArray.length; i++) {
      if (wordArray[i].length > wordLength) {
        wordLength = wordArray[i].length;
      }
    }
    return wordLength;
  }

  isPlaceable(clonedGrid: TGrid, word: string, direction: Direction, row: number, col: number): boolean {
    console.log("");
    for (let i = 0; i < word.length; i++) {
      const { row: r, col: c } = getWordCoordinates(direction, row, col, i);
  
      //? Get the current cell from the grid and check if it's empty, if it is return false
      //TODO (maybe you can compare if the current word is equal to the current placed word in the grid)
      const cell: Cell = clonedGrid[r]![c];
      console.log({ row: r, col: c });
      if (cell != undefined && word[i] != cell) return false;
    }
    return true;
  }

  sortWordList(words: string[]): string[] { 
    return words.sort((a, b) => b.length - a.length);
  }

  cleanWord(word: string): string {
    return word.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replaceAll(",", "");
  }

  reverseWord(word: string): string {
    return word.split('').reverse().join();
  }
}