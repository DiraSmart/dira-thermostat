import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { HomeAssistant, DiraCardConfig, HeaderConfig } from "./types";
import { fireEvent } from "./utils/fire-event";
import { localize } from "./localize";

export class DiraThermostatEditor extends LitElement {
  @state() private _hass!: HomeAssistant;
  @state() private _config!: DiraCardConfig;

  set hass(hass: HomeAssistant) {
    this._hass = hass;
  }

  setConfig(config: DiraCardConfig): void {
    this._config = { ...config };
  }

  private get _lang(): string {
    return this._hass?.language ?? "en";
  }

  private _updateConfig(changes: Partial<DiraCardConfig>): void {
    this._config = { ...this._config, ...changes };
    fireEvent(this, "config-changed", { config: this._config });
  }

  private _getControlBool(key: "fan" | "preset" | "swing"): boolean {
    const control = this._config.control;
    if (control === false) return false;
    if (control === undefined || control === null) return true; // auto
    if (Array.isArray(control)) return (control as string[]).includes(key);
    if (typeof control === "object") return control[key] !== false;
    return true;
  }

  private _setControlBool(key: "fan" | "preset" | "swing", value: boolean): void {
    let control = this._config.control;

    // Normalize to object
    let obj: Record<string, any> = {};
    if (typeof control === "object" && control !== null && !Array.isArray(control)) {
      obj = { ...control };
    }

    if (value) {
      // Set to true (auto-detect)
      obj[key] = true;
    } else {
      obj[key] = false;
    }

    this._updateConfig({ control: obj as any });
  }

  private _getHeaderConfig(): HeaderConfig {
    return typeof this._config.header === "object" ? this._config.header : {};
  }

  private _updateHeader(changes: Partial<HeaderConfig>): void {
    const current = this._getHeaderConfig();
    this._updateConfig({ header: { ...current, ...changes } });
  }

  render() {
    if (!this._hass || !this._config) return html``;

    const lang = this._lang;
    const headerConfig = this._getHeaderConfig();

    return html`
      <div class="editor">
        <!-- Entity picker -->
        <ha-entity-picker
          .hass=${this._hass}
          .value=${this._config.entity ?? ""}
          .includeDomains=${["climate"]}
          .label=${localize("editor.entity", lang)}
          @value-changed=${(e: CustomEvent) =>
            this._updateConfig({ entity: e.detail.value })}
          allow-custom-entity
        ></ha-entity-picker>

        <!-- Name + Icon -->
        <div class="row">
          <ha-textfield
            .label=${localize("editor.name", lang)}
            .value=${this._config.name ?? ""}
            @input=${(e: Event) =>
              this._updateConfig({
                name: (e.target as HTMLInputElement).value || undefined,
              })}
          ></ha-textfield>

          <ha-icon-picker
            .hass=${this._hass}
            .value=${this._config.icon ?? ""}
            .label=${localize("editor.icon", lang)}
            @value-changed=${(e: CustomEvent) =>
              this._updateConfig({ icon: e.detail.value || undefined })}
          ></ha-icon-picker>
        </div>

        <!-- Step size + Decimals -->
        <div class="row">
          <ha-textfield
            .label=${localize("editor.step_size", lang)}
            type="number"
            .value=${String(this._config.step_size ?? 0.5)}
            @input=${(e: Event) => {
              const val = parseFloat((e.target as HTMLInputElement).value);
              if (!isNaN(val) && val > 0) {
                this._updateConfig({ step_size: val });
              }
            }}
          ></ha-textfield>

          <ha-textfield
            .label=${localize("editor.decimals", lang)}
            type="number"
            .value=${String(this._config.decimals ?? 1)}
            @input=${(e: Event) => {
              const val = parseInt((e.target as HTMLInputElement).value, 10);
              if (!isNaN(val) && val >= 0 && val <= 3) {
                this._updateConfig({ decimals: val });
              }
            }}
          ></ha-textfield>
        </div>

        <!-- Toggle entity -->
        <ha-entity-picker
          .hass=${this._hass}
          .value=${headerConfig.toggle?.entity ?? ""}
          .includeDomains=${["switch", "light", "input_boolean"]}
          .label=${localize("editor.toggle_entity", lang)}
          @value-changed=${(e: CustomEvent) => {
            const val = e.detail.value;
            if (val) {
              this._updateHeader({ toggle: { ...headerConfig.toggle, entity: val } });
            } else {
              const { toggle, ...rest } = this._getHeaderConfig();
              this._updateConfig({ header: Object.keys(rest).length > 0 ? rest : undefined });
            }
          }}
          allow-custom-entity
        ></ha-entity-picker>

        <!-- Switches section -->
        <div class="switches">
          <ha-formfield .label=${localize("editor.compact", lang)}>
            <ha-switch
              .checked=${this._config.popup ?? false}
              @change=${(e: Event) =>
                this._updateConfig({
                  popup: (e.target as any).checked || undefined,
                })}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label=${localize("editor.show_header", lang)}>
            <ha-switch
              .checked=${this._config.header !== false}
              @change=${(e: Event) =>
                this._updateConfig({
                  header: (e.target as any).checked ? {} : false,
                })}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label=${localize("editor.show_fan", lang)}>
            <ha-switch
              .checked=${this._getControlBool("fan")}
              @change=${(e: Event) =>
                this._setControlBool("fan", (e.target as any).checked)}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label=${localize("editor.show_preset", lang)}>
            <ha-switch
              .checked=${this._getControlBool("preset")}
              @change=${(e: Event) =>
                this._setControlBool("preset", (e.target as any).checked)}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label=${localize("editor.show_swing", lang)}>
            <ha-switch
              .checked=${this._getControlBool("swing")}
              @change=${(e: Event) =>
                this._setControlBool("swing", (e.target as any).checked)}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label=${localize("editor.show_fan_speed", lang)}>
            <ha-switch
              .checked=${this._config.show_fan_speed ?? false}
              @change=${(e: Event) =>
                this._updateConfig({
                  show_fan_speed: (e.target as any).checked || undefined,
                })}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label=${localize("editor.show_action", lang)}>
            <ha-switch
              .checked=${this._config.show_action ?? false}
              @change=${(e: Event) =>
                this._updateConfig({
                  show_action: (e.target as any).checked || undefined,
                })}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label=${localize("editor.hide_temp", lang)}>
            <ha-switch
              .checked=${this._config.hide?.temperature ?? false}
              @change=${(e: Event) =>
                this._updateConfig({
                  hide: {
                    ...this._config.hide,
                    temperature: (e.target as any).checked || undefined,
                  },
                })}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label=${localize("editor.hide_state", lang)}>
            <ha-switch
              .checked=${this._config.hide?.state ?? false}
              @change=${(e: Event) =>
                this._updateConfig({
                  hide: {
                    ...this._config.hide,
                    state: (e.target as any).checked || undefined,
                  },
                })}
            ></ha-switch>
          </ha-formfield>
        </div>
      </div>
    `;
  }

  static get styles() {
    return css`
      .editor {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 16px 0;
      }
      .row {
        display: flex;
        gap: 16px;
      }
      .row > * {
        flex: 1;
      }
      .switches {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px 16px;
      }
      ha-formfield {
        display: flex;
        align-items: center;
        --mdc-theme-secondary: var(--primary-color);
      }
    `;
  }
}
