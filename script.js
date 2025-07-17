"use strict";

// Conway's Game of Life helper functions for the browser

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

function renderBoard(board, container) {
  container.innerHTML = "";
  for (let r = 0; r < board.length; r++) {
    const rowDiv = document.createElement("div");
    rowDiv.className = "row";
    for (let c = 0; c < board[r].length; c++) {
      const cell = document.createElement("span");
      cell.className = board[r][c] ? "alive" : "dead";
      cell.dataset.row = r;
      cell.dataset.col = c;
      rowDiv.appendChild(cell);
    }
    container.appendChild(rowDiv);
  }
}

function startGame() {
  const container = document.getElementById("board");
  const select = document.getElementById("pattern");
  const size = 25;

  function createBoard() {
    return Array.from({ length: size }, () => Array(size).fill(0));
  }

  const patterns = {
    Glider: [
      [0, 1],
      [1, 2],
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    Blinker: [
      [0, -1],
      [0, 0],
      [0, 1],
    ],
  };

  function applyPattern(board, coords) {
    const center = Math.floor(size / 2);
    for (const [r, c] of coords) {
      const rr = center + r;
      const cc = center + c;
      if (rr >= 0 && rr < size && cc >= 0 && cc < size) {
        board[rr][cc] = 1;
      }
    }
  }

  function resetBoard(name) {
    const b = createBoard();
    if (name === "Random") {
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          b[r][c] = Math.random() < 0.3 ? 1 : 0;
        }
      }
    } else if (patterns[name]) {
      applyPattern(b, patterns[name]);
    }
    return b;
  }

  let board = resetBoard("Glider");
  let running = true;

  function step() {
    renderBoard(board, container);
    board = nextGeneration(board);
    if (running) {
      setTimeout(step, 500);
    }
  }

  document.getElementById("toggle").addEventListener("click", () => {
    running = !running;
    document.getElementById("toggle").textContent = running ? "Pause" : "Start";
    if (running) step();
  });

  select.addEventListener("change", () => {
    board = resetBoard(select.value);
    renderBoard(board, container);
  });

  container.addEventListener("click", (e) => {
    if (!running && e.target.tagName === "SPAN") {
      const row = parseInt(e.target.dataset.row, 10);
      const col = parseInt(e.target.dataset.col, 10);
      board[row][col] = board[row][col] ? 0 : 1;
      renderBoard(board, container);
    }
  });

  step();
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", startGame);
}

// Export for Node.js tests
if (typeof module !== "undefined") {
  module.exports = { nextGeneration };
}
