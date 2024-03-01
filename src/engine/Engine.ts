import { Bodies, Composite, Engine as MatterEngine } from "matter-js";
import { Viewport } from "pixi-viewport";
import { Renderer } from "pixi.js";
import { Entity } from "./entities/Entity";

export class Engine {
  renderer: Renderer;
  viewport: Viewport;
  physics: MatterEngine;
  entities: Entity[] = [];

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
    this.viewport.moveCenter(0, 0);

    /**
     * Matter
     */
    this.physics = MatterEngine.create();
    /**
     * Controls
     */

    this.addWalls();
    this.loop(0);
  }
  add(entity: Entity) {
    Composite.add(this.physics.world, entity.body);
    this.viewport.addChild(entity.graphics);
    this.entities.push(entity);
  }

  addWalls() {
    const ground = Bodies.rectangle(0, 500, 1000, 10, { isStatic: true });
    Composite.add(this.physics.world, [ground]);
  }

  loop(ms: DOMHighResTimeStamp) {
    // console.log(ms);
    // Accept input

    // Make changes

    // Calculate physics
    MatterEngine.update(this.physics);

    // Update entities
    this.entities.forEach((e) => e.update());

    // Render results
    this.renderer.render(this.viewport);

    requestAnimationFrame(this.loop.bind(this));
  }
}
