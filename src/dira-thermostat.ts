import { DiraThermostatCard } from "./card";
import { DiraThermostatEditor } from "./editor";

declare global {
  interface HTMLElementTagNameMap {
    "dira-thermostat": DiraThermostatCard;
    "dira-thermostat-editor": DiraThermostatEditor;
  }
}

customElements.define("dira-thermostat", DiraThermostatCard);
customElements.define("dira-thermostat-editor", DiraThermostatEditor);

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: "dira-thermostat",
  name: "Dira Thermostat",
  description:
    "A modern thermostat card with Mushroom-style design and full climate control",
  preview: true,
  documentationURL: "https://github.com/DiraSmart/dira-thermostat",
});

console.info(
  `%c DIRA-THERMOSTAT %c v1.0.0 `,
  "color: white; background: #ff8100; font-weight: 700; padding: 2px 8px; border-radius: 4px 0 0 4px;",
  "color: #ff8100; background: #fff3e0; font-weight: 700; padding: 2px 8px; border-radius: 0 4px 4px 0;"
);
