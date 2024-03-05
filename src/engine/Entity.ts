import { Bodies, Body, Vector } from "matter-js";
import { Graphics } from "pixi.js";

type EntityOptions = {
  velocity?: Vector;
  isStatic?: boolean;
};

type BoxOptions = EntityOptions & {
  type: "Box";
  width: number;
  height: number;
};

type CircleOptions = EntityOptions & {
  type: "Circle";
  radius: number;
};

export class Entity {
  body: Body;
  graphics: Graphics;
  options: BoxOptions | CircleOptions;

  constructor(pos: Vector, options: BoxOptions | CircleOptions) {
    this.options = options;

    switch (options.type) {
      case "Box":
        const { width, height, isStatic } = options;
        this.body = Bodies.rectangle(pos.x, pos.y, width, height, { isStatic });

        this.graphics = new Graphics();
        this.graphics.beginFill(0xde3249);
        this.graphics.drawRect(pos.x - width / 2, pos.y - height / 2, width, height);
        this.graphics.endFill();
        this.graphics.pivot.x = pos.x - width / 2;
        this.graphics.pivot.y = pos.y - height / 2;
        break;
      case "Circle":
        const { radius } = options;
        this.body = Bodies.circle(pos.x, pos.y, radius, {
          isStatic: options.isStatic,
          inertia: Infinity,
          restitution: 1,
          friction: 0,
          frictionAir: 0,
          frictionStatic: 0,
        });

        this.graphics = new Graphics();
        this.graphics.lineStyle(0).beginFill(0xde3249, 1).drawCircle(0, 0, radius).endFill();
        break;
    }

    if (options?.velocity) {
      this.velocity = options.velocity;
    }
  }

  update() {
    switch (this.options.type) {
      case "Box":
        this.graphics.x = this.body.position.x - this.options.width / 2;
        this.graphics.y = this.body.position.y - this.options.height / 2;
        break;
      case "Circle":
        this.graphics.x = this.body.position.x;
        this.graphics.y = this.body.position.y;
        break;
    }
  }

  get velocity() {
    return this.body.velocity;
  }

  set velocity(velocity: Vector) {
    Body.setVelocity(this.body, velocity);
  }

  get speed() {
    return this.body.speed;
  }

  get visible() {
    return this.graphics.visible;
  }

  set visible(visible: boolean) {
    this.graphics.visible = visible;
  }
}
