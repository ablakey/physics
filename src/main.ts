import { Brownian } from "./boards/Brownian";
import { Engine } from "./engine/Engine";

// const boards = [Brownian];

function main() {
  const engine = new Engine();

  const brownian = new Brownian(engine);
  engine.loadBoard(brownian);
}

window.onload = main;
