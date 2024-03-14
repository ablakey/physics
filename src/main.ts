import { Engine } from "./engine";
import { Brownian } from "./scenes/Brownian";

function main() {
  const engine = new Engine();

  const brownian = new Brownian(engine);
  engine.loadScene(brownian);
}

window.onload = main;
