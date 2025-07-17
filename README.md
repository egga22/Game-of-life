# Game of Life

This repository contains a small browser-based version of [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway's_Game_of_Life). Open `index.html` in your browser or enable GitHub Pages on this repository to see it running.

The core rules are implemented in `script.js` and displayed on a simple grid. A **Start/Pause** button lets you control the simulation.

## Running locally

Just open `index.html` in a web browser. No build step or additional dependencies are required.

## Running Tests

Node.js is only used for unit tests of the `nextGeneration` helper. If you wish to run them locally:

```bash
npm test
```
