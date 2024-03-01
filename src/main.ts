import {} from "pixi.js";
import { Engine } from "./engine/Engine";
import { Circle } from "./engine/entities/Circle";

function main() {
  // const world = new World();
  const engine = new Engine();
  const ball = new Circle();
  engine.add(ball);
}

window.onload = main;
