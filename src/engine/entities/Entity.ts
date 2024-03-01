import { Body } from "matter-js";
import { Graphics } from "pixi.js";

export abstract class Entity {
  abstract body: Body;
  abstract graphics: Graphics;

  update() {
    this.graphics.x = this.body.position.x;
    this.graphics.y = this.body.position.y;
  }
}
