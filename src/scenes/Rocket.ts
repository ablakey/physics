import { Entity, Scene } from "../engine";

export class RocketScene extends Scene {
  particles: Entity[] = [];

  load(): void {
    this.engine.input.setEnabledButtons(["action"]);
    // Ball

    const ball = new Entity(
      { x: 500, y: 500 },
      {
        type: "Polygon",
        coords: [
          { x: 0, y: 0 },
          { x: 80, y: 80 },
          { x: 0, y: 80 },
        ],
      },
    );

    // Walls
    const topWall = new Entity({ x: 500, y: -5 }, { type: "Box", width: 1000, height: 10, isStatic: true });
    const bottomWall = new Entity({ x: 500, y: 1005 }, { type: "Box", width: 1000, height: 10, isStatic: true });
    const leftWall = new Entity({ x: -5, y: 500 }, { type: "Box", width: 10, height: 1000, isStatic: true });
    const rightWall = new Entity({ x: 1005, y: 500 }, { type: "Box", width: 10, height: 1000, isStatic: true });

    this.engine.add(ball);
    this.engine.add([topWall, bottomWall, leftWall, rightWall]);
  }

  update(): void {
    // console.log(this.particles[0].speed);
  }
}
