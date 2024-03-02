import { Composite, Engine as MatterEngine } from "matter-js";
import { Viewport } from "pixi-viewport";
import { Renderer } from "pixi.js";
import { Entity } from "./Entity";

export class Engine {
  private renderer: Renderer;
  private viewport: Viewport;
  private physics: MatterEngine;
  private entities: Set<Entity> = new Set();

  private lastStamp: number = 0;

  constructor() {
    /**
     * Pixi
     */
    const viewportEl = document.querySelector<HTMLCanvasElement>(".viewport")!;

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

    this.viewport.fitWidth(1000); // The width is always 1000 pixi units.
    // this.viewport.moveCenter(0, 0);

    /**
     * Matter
     */
    this.physics = MatterEngine.create({ gravity: { y: 0 } });

    /**
     * Controls
     */

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

  // addWalls() {
  //   const ground = Bodies.rectangle(0, 500, 1000, 10, { isStatic: true });
  //   Composite.add(this.physics.world, [ground]);
  // }

  loop(ms: number) {
    const delta = ms - this.lastStamp;
    this.lastStamp = ms;
    // console.log(ms);
    // Accept input

    // Make changes

    // Calculate physics
    MatterEngine.update(this.physics, delta);

    // Update entities
    this.entities.forEach((e) => e.update());

    // Render results
    this.renderer.render(this.viewport);

    requestAnimationFrame(this.loop.bind(this));
  }
}
