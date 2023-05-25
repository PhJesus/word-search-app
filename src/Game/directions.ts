export const enum Direction {
  Horizontal,
  Vertical,
  DiagonalUp,
  DiagonalDown
}

export const getWordCoordinates = (direction: Direction, row: number, col: number, index: number) => {
  let r = row;
  let c = col;

  switch (true) {
    case (direction === Direction.Horizontal):
      r += index;
      break;
    case (direction === Direction.Vertical):
      c+= index;
      break;
    case (direction === Direction.DiagonalDown):
      r += index;
      c += index;
      break;
    case (direction === Direction.DiagonalUp):
      r -= index;
      c += index;
      break;
  }
  return { row: r, col: c };
}