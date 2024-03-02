import {} from "pixi.js";
import { Engine } from "./engine/Engine";
import { Entity } from "./engine/Entity";

function main() {
  // const world = new World();
  const engine = new Engine();
  const ball = new Entity({ x: 500, y: 500 }, { type: "Circle", radius: 50 });

  for (let x = 0; x < 1000; x += 50) {
    for (let y = 0; y < 1000; y += 50) {
      const b = new Entity(
        { x, y },
        { type: "Circle", radius: 10, velocity: { x: (Math.random() - 0.5) * 10, y: (Math.random() - 0.5) * 10 } },
      );
      engine.add(b);
    }
  }

  // Walls
  const topWall = new Entity({ x: 500, y: 0 }, { type: "Box", width: 1000, height: 20, isStatic: true });
  const bottomWall = new Entity({ x: 500, y: 1000 }, { type: "Box", width: 1000, height: 20, isStatic: true });
  const leftWall = new Entity({ x: 0, y: 500 }, { type: "Box", width: 20, height: 1000, isStatic: true });
  const rightWall = new Entity({ x: 1000, y: 500 }, { type: "Box", width: 20, height: 1000, isStatic: true });

  engine.add(ball);
  engine.add([topWall, bottomWall, leftWall, rightWall]);
}

window.onload = main;
