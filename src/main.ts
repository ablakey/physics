import {} from "pixi.js";
import { Engine } from "./engine/Engine";
import { Circle } from "./engine/entities/Circle";
import { Box } from "./engine/entities/Box";

function main() {
  // const world = new World();
  const engine = new Engine();
  const ball = new Circle();

  const floor = new Box(0, 400, 1000, 20, { isStatic: true });

  engine.add(ball);
  engine.add(floor);
}

window.onload = main;
