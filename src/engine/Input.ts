const Buttons = [
  { name: "Up", codes: ["ArrowUp", "KeyW"] },
  { name: "Down", codes: ["ArrowDown", "KeyS"] },
  { name: "Left", codes: ["ArrowLeft", "KeyA"] },
  { name: "Right", codes: ["ArrowRight", "KeyD"] },
  { name: "Action", codes: ["Space", "Enter"] },
] as const;

export type ButtonName = (typeof Buttons)[number]["name"];

/**
 * Wires up controls.
 * Add `controls.css` to any future project along with the necessary HTML.
 */
export class Controls {
  public buttons = Object.fromEntries(Buttons.map(({ name }) => [name, false])) as Record<
    ButtonName,
    boolean
  >;

  private inputPromises: ((button: ButtonName) => void)[] = [];

  constructor() {
    const buttonDown = (name: ButtonName, e: Event) => {
      document.querySelector(`#button${name}`)!.classList.add("active");
      this.buttons[name] = true;
      e.preventDefault();
      this.inputPromises.forEach((res) => res(name));
      this.inputPromises = [];
    };

    const buttonUp = (name: ButtonName) => {
      this.buttons[name] = false;
      document.querySelector(`#button${name}`)!.classList.remove("active");
    };

    // Bind mouse and touch inputs for buttons.
    Buttons.forEach(({ name }) => {
      const buttonEl = document.querySelector<HTMLButtonElement>(`#button${name}`)!;
      ["mousedown", "touchstart"].forEach((c) =>
        buttonEl.addEventListener(c, (e: Event) => buttonDown(name, e)),
      );
      ["mouseup", "mouseleave", "touchend"].forEach((c) =>
        buttonEl.addEventListener(c, () => buttonUp(name)),
      );
    });

    // Bind keydown.
    document.addEventListener("keydown", (e) => {
      const button = Buttons.find((b) => (b.codes as readonly string[]).includes(e.code));
      if (button) {
        buttonDown(button.name, e);
      }
    });

    // Bind keyup.
    document.addEventListener("keyup", (e) => {
      const button = Buttons.find((b) => (b.codes as readonly string[]).includes(e.code));
      if (button) {
        buttonUp(button.name);
      }
    });
  }

  async awaitInput() {
    return new Promise<ButtonName>((res) => {
      this.inputPromises.push(res);
    });
  }
}
