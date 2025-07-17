"use strict";

/** Simple implementation of Conway's Game of Life. */

function nextGeneration(board) {
  const rows = board.length;
  const cols = rows > 0 ? board[0].length : 0;
  const newBoard = Array.from({ length: rows }, () => Array(cols).fill(0));

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let liveNeighbours = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
            liveNeighbours += board[nr][nc];
          }
        }
      }
      if (board[r][c] === 1 && (liveNeighbours === 2 || liveNeighbours === 3)) {
        newBoard[r][c] = 1;
      } else if (board[r][c] === 0 && liveNeighbours === 3) {
        newBoard[r][c] = 1;
      } else {
        newBoard[r][c] = 0;
      }
    }
  }
  return newBoard;
}

function printBoard(board) {
  for (const row of board) {
    console.log(row.map((cell) => (cell ? "#" : ".")).join(""));
  }
}

function main() {
  let board = [
    [0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0],
    [1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];

  const interval = setInterval(() => {
    console.clear();
    printBoard(board);
    console.log();
    board = nextGeneration(board);
  }, 500);

  process.on("SIGINT", () => {
    clearInterval(interval);
    process.exit();
  });
}

if (require.main === module) {
  main();
}

module.exports = { nextGeneration, printBoard };
