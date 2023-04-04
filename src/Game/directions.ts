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
    case (direction === Direction.Horizontal || direction === Direction.DiagonalDown):
      r += index;
    case (direction === Direction.DiagonalUp):
      r -= index;
  }

  if (direction === Direction.Vertical || direction === Direction.DiagonalDown || direction === Direction.DiagonalUp)
    c += index;

  return { row: r, col: c };
}