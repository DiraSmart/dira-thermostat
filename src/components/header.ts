import { html, nothing, TemplateResult } from "lit";
import {
  HomeAssistant,
  HassEntity,
  DiraCardConfig,
  HeaderConfig,
} from "../types";
import { getModeColor, hexToRgb } from "../utils/colors";
import { getModeIcon, getFanIcon } from "../utils/icons";
import { getEntityName, formatTemperature, getUnit } from "../utils/entity";
import { localize } from "../localize";
import { openMoreInfo } from "../utils/fire-event";

export interface HeaderTempControls {
  targetValue: number | undefined;
  isUpdating: boolean;
  minTemp: number;
  maxTemp: number;
  decimals: number;
  unit: string;
  onIncrement: () => void;
  onDecrement: () => void;
}

export function renderHeader(
  host: HTMLElement,
  hass: HomeAssistant,
  stateObj: HassEntity,
  config: DiraCardConfig,
  tempControls?: HeaderTempControls
): TemplateResult | typeof nothing {
  if (config.header === false) return nothing;

  const headerConfig: HeaderConfig =
    typeof config.header === "object" ? config.header : {};

  if (headerConfig.name === false && headerConfig.icon === false) return nothing;

  const lang = hass.language ?? "en";
  const name = getEntityName(stateObj, config.name);
  const hvacMode = stateObj.state;

  // Color and icon always based on HVAC mode (not action)
  const color = getModeColor(hvacMode, config.colors);
  const rgb = hexToRgb(color);
  const isOff = hvacMode === "off" || hvacMode === "unavailable";

  const icon =
    config.icon ?? headerConfig.icon ?? getModeIcon(hvacMode);

  // Secondary text: mode name (action is optional via show_action)
  const modeText = localize(`mode.${hvacMode}`, lang);
  const hvacAction = stateObj.attributes.hvac_action as string | undefined;
  const actionText = hvacAction ? localize(`action.${hvacAction}`, lang) : "";

  let secondary = modeText;
  if (config.show_action && actionText && hvacAction !== "off") {
    secondary = `${modeText} \u00b7 ${actionText}`;
  }

  // Fan speed inline if show_fan_speed and entity is on
  const fanMode = stateObj.attributes.fan_mode as string | undefined;
  if (config.show_fan_speed && fanMode && !isOff) {
    secondary = `${secondary} \u00b7 ${fanMode}`;
  }

  // Current temp + humidity below name
  const currentTemp = stateObj.attributes.current_temperature;
  const humidity = stateObj.attributes.current_humidity;
  const statsUnit = stateObj.attributes.unit_of_measurement ?? "°C";

  const statsItems: string[] = [];
  if (currentTemp !== undefined && currentTemp !== null) {
    statsItems.push(
      `${formatTemperature(currentTemp, config.decimals ?? 1)} ${statsUnit}`
    );
  }
  if (humidity !== undefined && humidity !== null) {
    statsItems.push(`${Math.round(humidity)}%`);
  }

  const iconBg = isOff || icon === false
    ? ""
    : `background-color: rgba(${rgb}, 0.2)`;
  const iconColor = isOff ? "" : `color: ${color}`;

  // Temperature controls on the right (if provided and valid)
  const tc = tempControls;
  const showTempControls = tc && tc.targetValue !== undefined;

  return html`
    <div
      class="header"
      @click=${(e: Event) => {
        const target = e.target as HTMLElement;
        if (
          !target.closest("ha-switch") &&
          !target.closest(".fault-icon") &&
          !target.closest(".temp-button") &&
          !target.closest(".compact-controls")
        ) {
          openMoreInfo(host, config.entity);
        }
      }}
    >
      ${icon !== false
        ? html`
            <div class="icon-shape" style="${iconBg}">
              <ha-icon
                .icon=${icon as string}
                style="${iconColor}"
              ></ha-icon>
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
      ${showTempControls
        ? html`
            <div class="compact-controls">
              <button
                class="temp-button"
                @click=${(e: Event) => {
                  e.stopPropagation();
                  tc!.onDecrement();
                }}
                ?disabled=${tc!.targetValue! <= tc!.minTemp}
              >
                <ha-icon .icon=${"mdi:minus"}></ha-icon>
              </button>
              <div class="compact-temp ${tc!.isUpdating ? "updating" : ""}">
                ${formatTemperature(tc!.targetValue!, tc!.decimals)}
                <span class="unit">${tc!.unit}</span>
              </div>
              <button
                class="temp-button"
                @click=${(e: Event) => {
                  e.stopPropagation();
                  tc!.onIncrement();
                }}
                ?disabled=${tc!.targetValue! >= tc!.maxTemp}
              >
                <ha-icon .icon=${"mdi:plus"}></ha-icon>
              </button>
            </div>
          `
        : html`
            <div class="header-actions">
              ${renderFaults(host, hass, headerConfig.faults)}
              ${renderToggle(host, hass, headerConfig.toggle)}
            </div>
          `}
    </div>
  `;
}

function renderToggle(
  host: HTMLElement,
  hass: HomeAssistant,
  toggle?: { entity: string; name?: string | boolean }
): TemplateResult | typeof nothing {
  if (!toggle?.entity) return nothing;

  const entity = hass.states[toggle.entity];
  if (!entity) return nothing;

  const isOn = entity.state === "on";

  return html`
    <ha-switch
      .checked=${isOn}
      @change=${(e: Event) => {
        e.stopPropagation();
        hass.callService("homeassistant", isOn ? "turn_off" : "turn_on", {
          entity_id: toggle.entity,
        });
      }}
    ></ha-switch>
  `;
}

function renderFaults(
  host: HTMLElement,
  hass: HomeAssistant,
  faults?: Array<{ entity: string; icon?: string; hide_inactive?: boolean }>
): TemplateResult | typeof nothing {
  if (!faults || faults.length === 0) return nothing;

  const faultItems = faults
    .map((fault) => {
      const entity = hass.states[fault.entity];
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
            openMoreInfo(host, fault.entity);
          }}
        ></ha-icon>
      `;
    })
    .filter((item) => item !== nothing);

  if (faultItems.length === 0) return nothing;
  return html`${faultItems}`;
}
