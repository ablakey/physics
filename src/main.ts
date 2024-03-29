import { Engine } from "./engine";
import { RocketScene } from "./scenes";

function main() {
  const engine = new Engine();

  const scene = new RocketScene(engine);
  engine.loadScene(scene);
}

window.onload = main;
