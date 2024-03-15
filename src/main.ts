import { Engine } from "./engine";
import { BrownianScene, RocketScene } from "./scenes";

function main() {
  const engine = new Engine();

  const scene = new BrownianScene(engine);
  engine.loadScene(scene);
}

window.onload = main;
