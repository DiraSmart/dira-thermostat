import { LitElement, html, nothing, PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import {
  HomeAssistant,
  HassEntity,
  DiraCardConfig,
  ControlConfig,
  ControlType,
} from "./types";
import { cardStyles } from "./styles";
import { localize } from "./localize";
import { getModeColor, hexToRgb } from "./utils/colors";
import { getModeIcon } from "./utils/icons";
import { isDualSetpoint, formatTemperature, getUnit, getEntityName } from "./utils/entity";
import { debounce } from "./utils/debounce";
import { fireEvent, forwardHaptic, openMoreInfo } from "./utils/fire-event";
import { renderHeader } from "./components/header";
import { renderTemperature, TemperatureCallbacks } from "./components/temperature";
import { renderAllControls } from "./components/mode-buttons";
import { renderSensors } from "./components/sensors";

const DEBOUNCE_TIMEOUT = 500;

export class DiraThermostatCard extends LitElement {
  @state() private _hass!: HomeAssistant;
  @state() private _config!: DiraCardConfig;
  @state() private _showPopup = false;
  @state() private _pendingValues: Record<string, number> = {};

  private _debouncedCallService = debounce((data: Record<string, any>) => {
    const serviceConfig = this._config.service;
    const domain = serviceConfig?.domain ?? "climate";
    const service = serviceConfig?.service ?? "set_temperature";
    this._hass
      .callService(domain, service, {
        entity_id: this._config.entity,
        ...data,
        ...(serviceConfig?.data ?? {}),
      })
      .then(() => {
        this._pendingValues = {};
      })
      .catch(() => {
        this._pendingValues = {};
      });
  }, DEBOUNCE_TIMEOUT);

  static get styles() {
    return cardStyles;
  }

  // ---- HA Card Interface ----

  static getConfigElement(): HTMLElement {
    return document.createElement("dira-thermostat-editor");
  }

  static getStubConfig(): Record<string, any> {
    return { entity: "" };
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
  }

  get hass(): HomeAssistant {
    return this._hass;
  }

  setConfig(config: DiraCardConfig): void {
    if (!config.entity) {
      throw new Error("You must define an entity");
    }
    this._config = {
      ...config,
      control: this._normalizeControl(config.control),
    };
  }

  getCardSize(): number {
    if (this._config?.popup) return 2;
    return 4;
  }

  // ---- Config Normalization ----

  private _normalizeControl(
    control: DiraCardConfig["control"]
  ): ControlConfig | false {
    if (control === false) return false;
    if (control === undefined || control === null) {
      return { hvac: true };
    }
    if (Array.isArray(control)) {
      const result: Record<string, boolean> = {};
      (control as string[]).forEach((key: string) => {
        result[key] = true;
      });
      return result as unknown as ControlConfig;
    }
    return control;
  }

  // ---- Temperature Callbacks ----

  private _getTemperatureCallbacks(): TemperatureCallbacks {
    const stateObj = this._hass.states[this._config.entity];
    if (!stateObj) {
      return {
        onIncrement: () => {},
        onDecrement: () => {},
      };
    }
    const step =
      this._config.step_size ?? stateObj.attributes.target_temp_step ?? 0.5;

    return {
      onIncrement: (key: string) => {
        const currentValue =
          this._pendingValues[key] ?? stateObj.attributes[key];
        if (currentValue === undefined) return;
        const newValue =
          Math.round((Number(currentValue) + step) * 10) / 10;
        this._setPendingTemperature(key, newValue, stateObj);
      },
      onDecrement: (key: string) => {
        const currentValue =
          this._pendingValues[key] ?? stateObj.attributes[key];
        if (currentValue === undefined) return;
        const newValue =
          Math.round((Number(currentValue) - step) * 10) / 10;
        this._setPendingTemperature(key, newValue, stateObj);
      },
    };
  }

  private _setPendingTemperature(
    key: string,
    value: number,
    stateObj: HassEntity
  ): void {
    const minTemp = stateObj.attributes.min_temp ?? 7;
    const maxTemp = stateObj.attributes.max_temp ?? 35;
    const clamped = Math.max(minTemp, Math.min(maxTemp, value));

    this._pendingValues = { ...this._pendingValues, [key]: clamped };

    // Build service call data
    if (isDualSetpoint(stateObj)) {
      const data: Record<string, number> = {
        target_temp_low:
          this._pendingValues["target_temp_low"] ??
          stateObj.attributes.target_temp_low,
        target_temp_high:
          this._pendingValues["target_temp_high"] ??
          stateObj.attributes.target_temp_high,
      };
      this._debouncedCallService(data);
    } else {
      this._debouncedCallService({ [key]: clamped });
    }

    forwardHaptic(this, "light");
  }

  // ---- Mode Select Handler ----

  private _onModeSelect(type: ControlType, value: string): void {
    const serviceMap: Record<ControlType, [string, string, string]> = {
      hvac: ["climate", "set_hvac_mode", "hvac_mode"],
      fan: ["climate", "set_fan_mode", "fan_mode"],
      preset: ["climate", "set_preset_mode", "preset_mode"],
      swing: ["climate", "set_swing_mode", "swing_mode"],
    };

    const [domain, service, attr] = serviceMap[type];
    this._hass
      .callService(domain, service, {
        entity_id: this._config.entity,
        [attr]: value,
      })
      .then(() => forwardHaptic(this, "light"))
      .catch(() => forwardHaptic(this, "failure"));
  }

  // ---- Render ----

  render() {
    if (!this._hass || !this._config) return nothing;

    const stateObj = this._hass.states[this._config.entity];
    if (!stateObj) {
      return html`
        <ha-card>
          <div class="not-found">
            ${localize("card.not_found", this._hass.language)}: ${this._config.entity}
          </div>
        </ha-card>
      `;
    }

    // Popup mode: compact card
    if (this._config.popup && !this._showPopup) {
      return html`
        <ha-card>
          ${this._renderCompact(stateObj)}
        </ha-card>
        ${this._showPopup ? this._renderPopup(stateObj) : nothing}
      `;
    }

    // Full card
    return html`
      <ha-card>
        ${renderHeader(this, this._hass, stateObj, this._config)}
        ${this._config.hide?.temperature !== true
          ? renderTemperature(
              this,
              this._hass,
              stateObj,
              this._config,
              this._pendingValues,
              this._getTemperatureCallbacks()
            )
          : nothing}
        ${renderAllControls(
          this._hass,
          stateObj,
          this._config,
          (type, value) => this._onModeSelect(type, value)
        )}
        ${this._config.hide?.state !== true
          ? renderSensors(this, this._hass, stateObj, this._config)
          : nothing}
      </ha-card>
      ${this._showPopup ? this._renderPopup(stateObj) : nothing}
    `;
  }

  // ---- Compact Render (for popup mode) ----

  private _renderCompact(stateObj: HassEntity) {
    const name = getEntityName(stateObj, this._config.name);
    const hvacMode = stateObj.state;
    const lang = this._hass.language ?? "en";

    // Color and icon always by HVAC mode
    const color = getModeColor(hvacMode, this._config.colors);
    const rgb = hexToRgb(color);
    const isOff = hvacMode === "off" || hvacMode === "unavailable";
    const icon = this._config.icon ?? getModeIcon(hvacMode);

    // Secondary: mode + optional fan speed
    const modeText = localize(`mode.${hvacMode}`, lang);
    const fanMode = stateObj.attributes.fan_mode as string | undefined;
    let secondary = modeText;
    if (this._config.show_fan_speed && fanMode && !isOff) {
      secondary = `${modeText} \u00b7 ${fanMode}`;
    }

    // Stats: current temp + humidity
    const currentTemp = stateObj.attributes.current_temperature;
    const humidity = stateObj.attributes.current_humidity;
    const unit = getUnit(stateObj, this._config.unit);
    const decimals = this._config.decimals ?? 1;

    const statsItems: string[] = [];
    if (currentTemp !== undefined && currentTemp !== null) {
      statsItems.push(`${formatTemperature(currentTemp, decimals)} ${unit}`);
    }
    if (humidity !== undefined && humidity !== null) {
      statsItems.push(`${Math.round(humidity)}%`);
    }

    // Target temp for +/- controls
    const targetValue =
      this._pendingValues["temperature"] ?? stateObj.attributes.temperature;
    const isUpdating = this._pendingValues["temperature"] !== undefined;
    const minTemp = stateObj.attributes.min_temp ?? 7;
    const maxTemp = stateObj.attributes.max_temp ?? 35;
    const callbacks = this._getTemperatureCallbacks();

    const iconBg = isOff ? "" : `background-color: rgba(${rgb}, 0.2)`;
    const iconColor = isOff ? "" : `color: ${color}`;

    return html`
      <div class="compact">
        <div
          class="compact-left"
          @click=${() => (this._showPopup = true)}
        >
          <div class="icon-shape" style="${iconBg}">
            <ha-icon .icon=${icon} style="${iconColor}"></ha-icon>
          </div>
          <div class="info">
            <div class="name">${name}</div>
            <div class="secondary">
              ${secondary}
              ${statsItems.length > 0
                ? html` <span class="stats">\u00b7 ${statsItems.join(" \u00b7 ")}</span>`
                : nothing}
            </div>
          </div>
        </div>
        ${!isOff && targetValue !== undefined
          ? html`
              <div class="compact-controls">
                <button
                  class="temp-button"
                  @click=${(e: Event) => {
                    e.stopPropagation();
                    callbacks.onDecrement("temperature");
                  }}
                  ?disabled=${targetValue <= minTemp}
                >
                  <ha-icon .icon=${"mdi:minus"}></ha-icon>
                </button>
                <div class="compact-temp ${isUpdating ? "updating" : ""}">
                  ${formatTemperature(targetValue, decimals)}
                  <span class="unit">${unit}</span>
                </div>
                <button
                  class="temp-button"
                  @click=${(e: Event) => {
                    e.stopPropagation();
                    callbacks.onIncrement("temperature");
                  }}
                  ?disabled=${targetValue >= maxTemp}
                >
                  <ha-icon .icon=${"mdi:plus"}></ha-icon>
                </button>
              </div>
            `
          : nothing}
      </div>
    `;
  }

  // ---- Popup Render ----

  private _renderPopup(stateObj: HassEntity) {
    const name = getEntityName(stateObj, this._config.name);

    return html`
      <div
        class="popup-overlay"
        @click=${(e: Event) => {
          if ((e.target as HTMLElement).classList.contains("popup-overlay")) {
            this._showPopup = false;
          }
        }}
      >
        <div class="popup-content">
          <div class="popup-header">
            <div class="name" style="font-size: 18px; font-weight: 600;">${name}</div>
            <button class="popup-close" @click=${() => (this._showPopup = false)}>
              <ha-icon .icon=${"mdi:close"}></ha-icon>
            </button>
          </div>
          ${this._config.hide?.temperature !== true
            ? renderTemperature(
                this,
                this._hass,
                stateObj,
                this._config,
                this._pendingValues,
                this._getTemperatureCallbacks()
              )
            : nothing}
          ${renderAllControls(
            this._hass,
            stateObj,
            this._config,
            (type, value) => this._onModeSelect(type, value)
          )}
          ${this._config.hide?.state !== true
            ? renderSensors(this, this._hass, stateObj, this._config)
            : nothing}
        </div>
      </div>
    `;
  }

  updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    // Clear pending values when entity state changes externally
    if (changedProps.has("_hass") && Object.keys(this._pendingValues).length > 0) {
      const oldHass = changedProps.get("_hass") as HomeAssistant | undefined;
      if (oldHass) {
        const oldState = oldHass.states[this._config.entity];
        const newState = this._hass.states[this._config.entity];
        if (
          oldState &&
          newState &&
          oldState.attributes.temperature !== newState.attributes.temperature
        ) {
          // External update received, clear pending
          this._pendingValues = {};
        }
      }
    }
  }
}
