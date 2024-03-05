import { Composite, Engine as MatterEngine } from "matter-js";
import { Viewport } from "pixi-viewport";
import { Renderer } from "pixi.js";
import { Entity } from "./Entity";
import { Board } from "./Board";
import { Input } from "./Input";

export class Engine {
  public input: Input;
  public enabled = true;

  private renderer: Renderer;
  private viewport: Viewport;
  private physics: MatterEngine;
  private entities: Set<Entity> = new Set();
  private board: Board | null = null;
  private lastStamp: number = 0;

  constructor() {
    const viewportEl = document.querySelector<HTMLCanvasElement>(".viewport")!;

    this.input = new Input();

    this.renderer = new Renderer({
      antialias: true,
      view: viewportEl,
      width: viewportEl.offsetWidth * window.devicePixelRatio,
      height: viewportEl.offsetHeight * window.devicePixelRatio,
      backgroundColor: 0x000000,
    });

    this.viewport = new Viewport({
      screenWidth: this.renderer.width,
      screenHeight: this.renderer.height,
      events: this.renderer.events,
    });

    this.viewport.fitWidth(1000);

    this.physics = MatterEngine.create({ gravity: { y: 0 } });

    document.addEventListener("visibilitychange", () => {
      this.enabled = !document.hidden;
      console.log(document.hidden, document.visibilityState);
    });
    requestAnimationFrame(this.loop.bind(this));
  }

  add(entity: Entity | Entity[]) {
    const entities = Array.isArray(entity) ? entity : [entity];

    entities.forEach((e) => {
      Composite.add(this.physics.world, e.body);
      this.viewport.addChild(e.graphics);
      this.entities.add(e);
    });
  }

  remove(entity: Entity) {
    Composite.remove(this.physics.world, entity.body);
    this.viewport.removeChild(entity.graphics);
    this.entities.delete(entity);
  }

  loadBoard(board: Board) {
    this.board = board;
    this.board.load();
  }

  private loop(ms: number) {
    const delta = ms - this.lastStamp;
    this.lastStamp = ms;

    // If timestamp has fallen far behind, just drop all time.
    if (this.enabled && delta < 500) {
      this.board?.update();
      MatterEngine.update(this.physics, delta);
      this.entities.forEach((e) => e.update());
      this.renderer.render(this.viewport);
    }

    requestAnimationFrame(this.loop.bind(this));
  }
}
