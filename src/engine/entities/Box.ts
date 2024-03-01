import { Bodies, Body } from "matter-js";
import { Entity } from "./Entity";
import { Graphics } from "pixi.js";

export class Box extends Entity {
  body: Body;
  graphics: Graphics;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    options?: { isStatic?: boolean },
  ) {
    super();
    this.body = Bodies.rectangle(x, y, width, height, {
      isStatic: options?.isStatic,
    });

    this.graphics = new Graphics();
    this.graphics.beginFill(0xde3249);
    this.graphics.drawRect(x - width / 2, y - height / 2, 1000, 20);
    this.graphics.endFill();
  }

  update(): void {}
}
