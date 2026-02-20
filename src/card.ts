import { LitElement, html, nothing, PropertyValues } from "lit";
import { state } from "lit/decorators.js";
import {
  HomeAssistant,
  HassEntity,
  DiraCardConfig,
  ControlConfig,
  ControlType,
  HeaderConfig,
} from "./types";
import { cardStyles } from "./styles";
import { localize } from "./localize";
import { getModeColor, hexToRgb } from "./utils/colors";
import { getModeIcon } from "./utils/icons";
import { isDualSetpoint, formatTemperature, getUnit, getEntityName } from "./utils/entity";
import { debounce } from "./utils/debounce";
import { fireEvent, forwardHaptic, openMoreInfo } from "./utils/fire-event";
import { TemperatureCallbacks } from "./components/temperature";
import { renderAllControls } from "./components/mode-buttons";
import { renderSensors } from "./components/sensors";

const DEBOUNCE_TIMEOUT = 500;

const AUTO_COLLAPSE_MS = 10_000;

export class DiraThermostatCard extends LitElement {
  @state() private _hass!: HomeAssistant;
  @state() private _config!: DiraCardConfig;
  @state() private _expanded = false;
  @state() private _pendingValues: Record<string, number> = {};

  private _collapseTimer?: ReturnType<typeof setTimeout>;
  private _longPressTimer?: ReturnType<typeof setTimeout>;
  private _longPressFired = false;

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
    this._normalizedControl = this._normalizeControl(config.control);
    this._config = config;
  }

  getCardSize(): number {
    if (this._config?.popup) return 2;
    return 4;
  }

  // ---- Config Normalization ----

  private _normalizedControl: ControlConfig | false | "auto" = "auto";

  private _normalizeControl(
    control: DiraCardConfig["control"]
  ): ControlConfig | false | "auto" {
    if (control === false) return false;
    if (control === undefined || control === null) {
      return "auto";
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

  private _getEffectiveControl(stateObj: HassEntity): ControlConfig | false {
    const control = this._normalizedControl;
    if (control === false) return false;
    if (control === "auto") {
      const result: ControlConfig = { hvac: true };
      if (stateObj.attributes.fan_modes?.length > 0) result.fan = true;
      if (stateObj.attributes.preset_modes?.length > 0) result.preset = true;
      if (stateObj.attributes.swing_modes?.length > 0) result.swing = true;
      return result;
    }
    return control as ControlConfig;
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
    this._resetCollapseTimer();
  }

  // ---- Long Press ----

  private _onPointerDown = (): void => {
    this._longPressFired = false;
    this._longPressTimer = setTimeout(() => {
      this._longPressFired = true;
      forwardHaptic(this, "light");
    }, 500);
  };

  private _onPointerUp = (): void => {
    clearTimeout(this._longPressTimer);
    if (this._longPressFired) {
      openMoreInfo(this, this._config.entity);
      return;
    }
    // Short click
    if (this._config.popup) {
      this._expanded ? this._collapse() : this._expand();
    }
  };

  private _onPointerCancel = (): void => {
    clearTimeout(this._longPressTimer);
  };

  // ---- Expand / Collapse (for compact mode) ----

  private _expand(): void {
    this._expanded = true;
    this._resetCollapseTimer();
  }

  private _collapse(): void {
    this._expanded = false;
    this._clearCollapseTimer();
  }

  private _resetCollapseTimer(): void {
    this._clearCollapseTimer();
    this._collapseTimer = setTimeout(() => {
      this._expanded = false;
    }, AUTO_COLLAPSE_MS);
  }

  private _clearCollapseTimer(): void {
    if (this._collapseTimer !== undefined) {
      clearTimeout(this._collapseTimer);
      this._collapseTimer = undefined;
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._clearCollapseTimer();
    clearTimeout(this._longPressTimer);
    this._expanded = false;
  }

  // ---- Mode Select Handler ----

  private _onModeSelect(type: ControlType, value: string): void {
    this._resetCollapseTimer();
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

  // ---- Helpers ----

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

    // Compact mode (popup config): show compact, expand inline on click
    if (this._config.popup) {
      const effectiveControl = this._getEffectiveControl(stateObj);
      return html`
        <ha-card>
          ${this._renderCompact(stateObj)}
          ${this._expanded
            ? html`
                <div class="expand-section">
                  ${renderAllControls(
                    this._hass,
                    stateObj,
                    this._config,
                    effectiveControl,
                    (type, value) => this._onModeSelect(type, value)
                  )}
                  ${renderSensors(this, this._hass, stateObj, this._config)}
                </div>
              `
            : nothing}
        </ha-card>
      `;
    }

    // Full card: same header row as compact + always-visible controls
    const effectiveControl = this._getEffectiveControl(stateObj);

    return html`
      <ha-card>
        ${this._config.header !== false ? this._renderCompact(stateObj) : nothing}
        ${renderAllControls(
          this._hass,
          stateObj,
          this._config,
          effectiveControl,
          (type, value) => this._onModeSelect(type, value)
        )}
        ${renderSensors(this, this._hass, stateObj, this._config)}
      </ha-card>
    `;
  }

  // ---- Header Row Render (shared by compact and full mode) ----

  private _renderCompact(stateObj: HassEntity) {
    const headerConfig: HeaderConfig =
      typeof this._config.header === "object" ? this._config.header : {};

    const headerName = headerConfig.name !== false ? headerConfig.name : undefined;
    const name = getEntityName(stateObj, headerName ?? this._config.name);
    const hvacMode = stateObj.state;
    const lang = this._hass.language ?? "en";

    // Color and icon always by HVAC mode
    const color = getModeColor(hvacMode, this._config.colors);
    const rgb = hexToRgb(color);
    const isOff = hvacMode === "off" || hvacMode === "unavailable";
    const hideTemp = isOff || hvacMode === "fan_only" || this._config.hide?.temperature === true;
    const icon =
      this._config.icon ?? headerConfig.icon ?? getModeIcon(hvacMode);

    // Secondary: mode + optional action + optional fan speed
    const modeText = localize(`mode.${hvacMode}`, lang);
    const hvacAction = stateObj.attributes.hvac_action as string | undefined;
    const actionText = hvacAction ? localize(`action.${hvacAction}`, lang) : "";
    let secondary = modeText;
    if (this._config.show_action && actionText && hvacAction !== "off") {
      secondary = `${modeText} \u00b7 ${actionText}`;
    }
    const fanMode = stateObj.attributes.fan_mode as string | undefined;
    if (this._config.show_fan_speed && fanMode && !isOff) {
      secondary = `${secondary} \u00b7 ${fanMode}`;
    }

    // Stats: current temp + humidity (hidden with hide.state)
    const unit = getUnit(stateObj, this._config.unit);
    const decimals = this._config.decimals ?? 1;

    const statsItems: string[] = [];
    if (this._config.hide?.state !== true) {
      const currentTemp = stateObj.attributes.current_temperature;
      const humidity = stateObj.attributes.current_humidity;
      if (currentTemp !== undefined && currentTemp !== null) {
        statsItems.push(`${formatTemperature(currentTemp, decimals)} ${unit}`);
      }
      if (humidity !== undefined && humidity !== null) {
        statsItems.push(`${Math.round(humidity)}%`);
      }
    }

    // Target temp for +/- controls
    const targetValue =
      this._pendingValues["temperature"] ?? stateObj.attributes.temperature;
    const isUpdating = this._pendingValues["temperature"] !== undefined;
    const minTemp = stateObj.attributes.min_temp ?? 7;
    const maxTemp = stateObj.attributes.max_temp ?? 35;
    const callbacks = this._getTemperatureCallbacks();

    const showIcon = icon !== false && headerConfig.icon !== false;
    const iconBg = isOff || !showIcon ? "" : `background-color: rgba(${rgb}, 0.2)`;
    const iconColor = isOff ? "" : `color: ${color}`;

    // Right side: temp controls when active, toggle+faults when temp hidden
    const showTempControls = !hideTemp && targetValue !== undefined;

    return html`
      <div class="compact">
        <div
          class="compact-left"
          @pointerdown=${this._onPointerDown}
          @pointerup=${this._onPointerUp}
          @pointercancel=${this._onPointerCancel}
        >
          ${showIcon
            ? html`
                <div
                  class="icon-wrapper ${headerConfig.toggle?.entity ? "toggleable" : ""}"
                  @click=${headerConfig.toggle?.entity
                    ? (e: Event) => {
                        e.stopPropagation();
                        this._handleToggle(headerConfig);
                      }
                    : nothing}
                >
                  <div class="icon-shape" style="${iconBg}">
                    <ha-icon .icon=${icon as string} style="${iconColor}"></ha-icon>
                  </div>
                  ${this._renderToggleBadge(headerConfig)}
                </div>
              `
            : nothing}
          <div class="info">
            ${headerConfig.name !== false
              ? html`<div class="name">${name}</div>`
              : nothing}
            <div class="secondary">
              ${secondary}
              ${statsItems.length > 0
                ? html` <span class="stats">\u00b7 ${statsItems.join(" \u00b7 ")}</span>`
                : nothing}
            </div>
          </div>
        </div>
        <div class="compact-right">
          ${this._renderFaults(headerConfig)}
          ${showTempControls
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
      </div>
    `;
  }

  // ---- Toggle + Faults ----

  private _handleToggle(headerConfig: HeaderConfig): void {
    const toggle = headerConfig.toggle;
    if (!toggle?.entity) return;

    const entity = this._hass.states[toggle.entity];
    if (!entity) return;

    const isOn = entity.state === "on";
    this._hass.callService(
      "homeassistant",
      isOn ? "turn_off" : "turn_on",
      { entity_id: toggle.entity }
    );
    forwardHaptic(this, "light");
  }

  private _renderToggleBadge(headerConfig: HeaderConfig) {
    const toggle = headerConfig.toggle;
    if (!toggle?.entity) return nothing;

    const entity = this._hass.states[toggle.entity];
    if (!entity) return nothing;

    const isOn = entity.state === "on";
    const badgeIcon = isOn
      ? (toggle.icon_on ?? "mdi:circle")
      : (toggle.icon_off ?? "mdi:circle-outline");

    return html`
      <div class="toggle-badge ${isOn ? "on" : "off"}">
        <ha-icon .icon=${badgeIcon}></ha-icon>
      </div>
    `;
  }

  private _renderFaults(headerConfig: HeaderConfig) {
    const faults = headerConfig.faults;
    if (!faults || faults.length === 0) return nothing;

    const items = faults
      .map((fault) => {
        const entity = this._hass.states[fault.entity];
        if (!entity) return nothing;

        const isActive = entity.state === "on";
        if (!isActive && fault.hide_inactive) return nothing;

        const icon =
          fault.icon ?? entity.attributes.icon ?? "mdi:alert-circle";

        return html`
          <ha-icon
            class="fault-icon ${isActive ? "active" : "inactive"}"
            .icon=${icon}
            @click=${(e: Event) => {
              e.stopPropagation();
              openMoreInfo(this, fault.entity);
            }}
          ></ha-icon>
        `;
      })
      .filter((item) => item !== nothing);

    if (items.length === 0) return nothing;
    return html`${items}`;
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
