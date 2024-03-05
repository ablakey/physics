import { Engine } from "./Engine";

export abstract class Board {
  engine: Engine;

  constructor(engine: Engine) {
    this.engine = engine;
  }

  load(): void {}

  update(): void {}
}
