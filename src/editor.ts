import { LitElement, html, css } from "lit";
import { property, state } from "lit/decorators.js";
import { HomeAssistant, DiraCardConfig } from "./types";
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

  render() {
    if (!this._hass || !this._config) return html``;

    return html`
      <div class="editor">
        <ha-entity-picker
          .hass=${this._hass}
          .value=${this._config.entity ?? ""}
          .includeDomains=${["climate"]}
          .label=${localize("editor.entity", this._lang)}
          @value-changed=${(e: CustomEvent) =>
            this._updateConfig({ entity: e.detail.value })}
          allow-custom-entity
        ></ha-entity-picker>

        <ha-textfield
          .label=${localize("editor.name", this._lang)}
          .value=${this._config.name ?? ""}
          @input=${(e: Event) =>
            this._updateConfig({
              name: (e.target as HTMLInputElement).value || undefined,
            })}
        ></ha-textfield>

        <ha-icon-picker
          .hass=${this._hass}
          .value=${this._config.icon ?? ""}
          .label=${localize("editor.icon", this._lang)}
          @value-changed=${(e: CustomEvent) =>
            this._updateConfig({ icon: e.detail.value || undefined })}
        ></ha-icon-picker>

        <div class="row">
          <ha-textfield
            .label=${localize("editor.step_size", this._lang)}
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
            .label=${localize("editor.decimals", this._lang)}
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

        <ha-formfield .label=${localize("editor.popup", this._lang)}>
          <ha-switch
            .checked=${this._config.popup ?? false}
            @change=${(e: Event) =>
              this._updateConfig({
                popup: (e.target as any).checked,
              })}
          ></ha-switch>
        </ha-formfield>

        <ha-formfield .label=${localize("editor.show_header", this._lang)}>
          <ha-switch
            .checked=${this._config.header !== false}
            @change=${(e: Event) =>
              this._updateConfig({
                header: (e.target as any).checked ? {} : false,
              })}
          ></ha-switch>
        </ha-formfield>
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
      ha-formfield {
        display: flex;
        align-items: center;
        --mdc-theme-secondary: var(--primary-color);
      }
    `;
  }
}
