import { Bodies, Body, Vector } from "matter-js";
import { Graphics } from "pixi.js";

const DEFAULT_RED = 0xde3249;

type Coord = { x: number; y: number };

type EntityOptions = {
  velocity?: Vector;
  isStatic?: boolean;
  color?: number;
  visible?: boolean;
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

type PolygonOptions = EntityOptions & {
  type: "Polygon";
  coords: Coord[];
};

type Options = BoxOptions | CircleOptions | PolygonOptions;

export class Entity {
  body!: Body;
  graphics!: Graphics;
  options: Options;

  constructor(pos: Vector, options: Options) {
    this.options = options;

    switch (options.type) {
      case "Polygon":
        this.constructPolygon(pos, options);
        break;
      case "Box":
        this.constructBox(pos, options);
        break;
      case "Circle":
        this.constructCircle(pos, options);
        break;
    }

    if (options.visible !== undefined) {
      this.visible = options.visible;
    }

    if (options?.velocity) {
      this.velocity = options.velocity;
    }
  }

  private constructPolygon(pos: Vector, options: PolygonOptions) {
    const { coords } = options;
    this.body = Bodies.fromVertices(pos.x, pos.y, [coords]);
    this.graphics = new Graphics();
    this.graphics.beginFill(options.color ?? DEFAULT_RED);

    coords.forEach((c, idx) => {
      if (idx === 0) {
        this.graphics.moveTo(c.x, c.y);
      } else {
        this.graphics.lineTo(c.x, c.y);
      }
    });
  }

  private constructBox(pos: Vector, options: BoxOptions) {
    const { width, height, isStatic } = options;
    this.body = Bodies.rectangle(pos.x, pos.y, width, height, { isStatic });
    this.graphics = new Graphics();
    this.graphics.beginFill(options.color ?? DEFAULT_RED);
    this.graphics.drawRect(pos.x - width / 2, pos.y - height / 2, width, height);
    this.graphics.endFill();
    this.graphics.pivot.x = pos.x - width / 2;
    this.graphics.pivot.y = pos.y - height / 2;
  }

  private constructCircle(pos: Vector, options: CircleOptions) {
    const { radius } = options;
    this.body = Bodies.circle(pos.x, pos.y, radius, {
      isStatic: options.isStatic,
    });
    this.graphics = new Graphics();
    this.graphics
      .lineStyle(0)
      .beginFill(options.color ?? DEFAULT_RED, 1)
      .drawCircle(0, 0, radius)
      .endFill();
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
      case "Polygon":
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
