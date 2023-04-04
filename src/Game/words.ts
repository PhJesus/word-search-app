
export const reverseWord = (word: string): string => { return word.split('').reverse().join() };

//TODO - Remove ^~´` from words
export const cleanWord = (word: string): string => { return word.toUpperCase().replace(/[,]/g, '') };

export const sortWordList = (words: string[]): string[] => words.sort((a, b) => b.length - a.length);
