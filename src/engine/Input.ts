const inputButtons = [
  { name: "up", codes: ["ArrowUp", "KeyW"] },
  { name: "down", codes: ["ArrowDown", "KeyS"] },
  { name: "left", codes: ["ArrowLeft", "KeyA"] },
  { name: "right", codes: ["ArrowRight", "KeyD"] },
  { name: "action", codes: ["Space", "Enter"] },
] as const;

export type ButtonName = (typeof inputButtons)[number]["name"];

const inputEvents = [
  "down:press",
  "down:release",
  "up:press",
  "up:release",
  "left:press",
  "left:release",
  "right:press",
  "right:release",
  "action:press",
  "action:release",
] as const;

export type InputEvent = (typeof inputEvents)[number];

/**
 * Wires up controls.
 * Add `controls.css` to any future project along with the necessary HTML.
 */
export class Input {
  public buttons = Object.fromEntries(inputButtons.map(({ name }) => [name, false])) as Record<ButtonName, boolean>;

  private enabledButtons: Set<ButtonName> = new Set();
  private inputPromises: ((button: ButtonName) => void)[] = [];
  private listeners: Partial<Record<InputEvent, Record<string, VoidFunction>>> = {};
  private nextListenerId = 0;

  constructor() {
    const buttonDown = (name: ButtonName, e: Event) => {
      if (!this.enabledButtons.has(name)) {
        return;
      }

      document.querySelector(`#button${name}`)!.classList.add("active");
      this.buttons[name] = true;
      e.preventDefault();
      this.inputPromises.forEach((res) => res(name));
      this.inputPromises = [];

      Object.values(this.listeners[`${name}:press`] ?? {}).forEach((l) => l());
    };

    const buttonUp = (name: ButtonName) => {
      // Only trigger buttonUp if the button was pressed (addresses mouseleave).
      if (!this.buttons[name] || !this.enabledButtons.has(name)) {
        return;
      }
      document.querySelector(`#button${name}`)!.classList.remove("active");
      this.buttons[name] = false;

      Object.values(this.listeners[`${name}:release`] ?? {}).forEach((l) => l());
    };

    // Bind mouse and touch inputs for buttons.
    inputButtons.forEach(({ name }) => {
      const buttonEl = document.querySelector<HTMLButtonElement>(`#button${name}`)!;
      ["mousedown", "touchstart"].forEach((c) => buttonEl.addEventListener(c, (e: Event) => buttonDown(name, e)));
      ["mouseup", "mouseleave", "touchend"].forEach((c) => buttonEl.addEventListener(c, () => buttonUp(name)));
    });

    // Bind keydown.
    document.addEventListener("keydown", (e) => {
      const button = inputButtons.find((b) => (b.codes as readonly string[]).includes(e.code));
      if (button) {
        buttonDown(button.name, e);
      }
    });

    // Bind keyup.
    document.addEventListener("keyup", (e) => {
      const button = inputButtons.find((b) => (b.codes as readonly string[]).includes(e.code));
      if (button) {
        buttonUp(button.name);
      }
    });
  }

  setEnabledButtons(buttons: ButtonName[]) {
    this.enabledButtons = new Set(buttons);
    inputButtons.forEach(({ name }) => {
      const el = document.querySelector(`#button${name}`)!;
      if (buttons.includes(name)) {
        el.classList.remove("hidden");
      } else {
        el.classList.add("hidden");
      }
    });
  }

  on(event: InputEvent, callback: VoidFunction): string {
    const id = `${event}_${this.nextListenerId++}`;
    const callbacks = this.listeners[event] ?? {};
    callbacks[id] = callback;
    this.listeners[event] = callbacks;
    return id;
  }

  off(eventId: string) {
    Object.values(this.listeners).forEach((l) => {
      delete l[eventId];
    });
  }

  async awaitInput() {
    return new Promise<ButtonName>((res) => {
      this.inputPromises.push(res);
    });
  }
}
