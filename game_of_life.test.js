const test = require('node:test');
const assert = require('node:assert');
const { nextGeneration } = require('./game_of_life');

test('blinker pattern', () => {
  const board = [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
  ];
  const expected = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ];
  assert.deepStrictEqual(nextGeneration(board), expected);
  assert.deepStrictEqual(nextGeneration(expected), board);
});
