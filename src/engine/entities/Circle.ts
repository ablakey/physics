import { Bodies, Body } from "matter-js";
import { Entity } from "./Entity";
import { Graphics } from "pixi.js";

export class Circle extends Entity {
  body: Body;
  graphics: Graphics;

  constructor() {
    super();
    this.body = Bodies.circle(0, 0, 50);

    this.graphics = new Graphics();
    this.graphics.lineStyle(0);
    this.graphics.beginFill(0xde3249, 1);
    this.graphics.drawCircle(0, 0, 50);
    this.graphics.endFill();
  }
}
