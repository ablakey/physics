import { Entity, Scene } from "../engine";

export class RocketScene extends Scene {
  particles: Entity[] = [];
  rocket!: Entity;

  load(): void {
    this.engine.input.setEnabledButtons(["action"]);

    this.rocket = new Entity(
      { x: 500, y: 500 },
      {
        type: "Polygon",
        coords: [
          { x: 0, y: 0 },
          { x: 200, y: 200 },
          { x: 0, y: 200 },
        ],
      },
    );

    this.rocket.body.angle = 0.1;

    // Walls
    const topWall = new Entity({ x: 500, y: 0 }, { type: "Box", width: 1000, height: 10, isStatic: true });
    const bottomWall = new Entity({ x: 500, y: 1000 }, { type: "Box", width: 1000, height: 10, isStatic: true });
    const leftWall = new Entity({ x: -5, y: 500 }, { type: "Box", width: 10, height: 1000, isStatic: true });
    const rightWall = new Entity({ x: 1005, y: 500 }, { type: "Box", width: 10, height: 1000, isStatic: true });

    this.engine.add(this.rocket);
    this.engine.add([topWall, bottomWall, leftWall, rightWall]);
  }

  update(): void {
    // console.log(this.rocket.body.angle);
    this.rocket.graphics.angle = this.rocket.body.angle * (180 / Math.PI);
    console.log(this.rocket.graphics.angle);
    // console.log(this.particles[0].speed);
  }
}
