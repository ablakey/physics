import { Entity, Scene } from "../engine";

export class Brownian extends Scene {
  particles: Entity[] = [];

  load(): void {
    this.engine.input.setEnabledButtons(["action"]);
    // Ball
    const ball = new Entity({ x: 500, y: 500 }, { type: "Circle", radius: 50 });

    // Particles
    for (let x = 0; x < 1000; x += 25) {
      for (let y = 0; y < 1000; y += 25) {
        const p = new Entity(
          { x, y },
          {
            type: "Circle",
            color: 0x89cff0,
            radius: 5,
            visible: false,
            velocity: { x: (Math.random() - 0.5) * 20, y: (Math.random() - 0.5) * 20 },
          },
        );
        this.particles.push(p);
        this.engine.add(p);
      }
    }

    // Walls
    const topWall = new Entity({ x: 500, y: -5 }, { type: "Box", width: 1000, height: 10, isStatic: true });
    const bottomWall = new Entity({ x: 500, y: 1005 }, { type: "Box", width: 1000, height: 10, isStatic: true });
    const leftWall = new Entity({ x: -5, y: 500 }, { type: "Box", width: 10, height: 1000, isStatic: true });
    const rightWall = new Entity({ x: 1005, y: 500 }, { type: "Box", width: 10, height: 1000, isStatic: true });

    this.engine.add(ball);
    this.engine.add([topWall, bottomWall, leftWall, rightWall]);

    this.engine.input.on("action:press", () => {
      this.particles.forEach((p) => (p.visible = true));
    });

    this.engine.input.on("action:release", () => {
      this.particles.forEach((p) => (p.visible = false));
    });
  }

  update(): void {
    // console.log(this.particles[0].speed);
  }
}
