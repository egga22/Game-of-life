# Game of Life

This repository contains a simple implementation of [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway's_Game_of_Life) written in JavaScript using Node.js.

The project provides a basic command line interface that simulates the cellular automaton in the terminal. It also exposes helper functions for computing the next board state which are covered by unit tests.

## Requirements

- Node.js 18 or later

## Installation

Clone the repository. No additional dependencies are required.

## Usage

Run the simulation with an initial board defined inside `game_of_life.js`:

```bash
npm start
```

The program will print successive generations to the terminal until interrupted with `Ctrl+C`.

## Running Tests

Execute unit tests with:

```bash
npm test
```

