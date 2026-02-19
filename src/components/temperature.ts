import { html, nothing, TemplateResult } from "lit";
import {
  HomeAssistant,
  HassEntity,
  DiraCardConfig,
} from "../types";
import { formatTemperature, isDualSetpoint, getUnit } from "../utils/entity";
import { openMoreInfo } from "../utils/fire-event";
import { localize } from "../localize";

export interface TemperatureCallbacks {
  onIncrement(key: string): void;
  onDecrement(key: string): void;
}

export function renderTemperature(
  host: HTMLElement,
  hass: HomeAssistant,
  stateObj: HassEntity,
  config: DiraCardConfig,
  pendingValues: Record<string, number>,
  callbacks: TemperatureCallbacks
): TemplateResult | typeof nothing {
  if (config.setpoints === false) return nothing;

  const attrs = stateObj.attributes;
  const decimals = config.decimals ?? 1;
  const fallback = config.fallback ?? "N/A";
  const unit = getUnit(stateObj, config.unit);
  const minTemp = attrs.min_temp ?? 7;
  const maxTemp = attrs.max_temp ?? 35;

  if (isDualSetpoint(stateObj)) {
    return renderDualSetpoint(
      host,
      hass,
      stateObj,
      config,
      pendingValues,
      callbacks,
      decimals,
      fallback,
      unit,
      minTemp,
      maxTemp
    );
  }

  return renderSingleSetpoint(
    host,
    stateObj,
    config,
    pendingValues,
    callbacks,
    decimals,
    fallback,
    unit,
    minTemp,
    maxTemp
  );
}

function renderSingleSetpoint(
  host: HTMLElement,
  stateObj: HassEntity,
  config: DiraCardConfig,
  pendingValues: Record<string, number>,
  callbacks: TemperatureCallbacks,
  decimals: number,
  fallback: string,
  unit: string,
  minTemp: number,
  maxTemp: number
): TemplateResult {
  const rawValue = stateObj.attributes.temperature;
  const value = pendingValues["temperature"] ?? rawValue;
  const isUpdating = pendingValues["temperature"] !== undefined;
  const step = config.step_size ?? stateObj.attributes.target_temp_step ?? 0.5;

  // Check setpoints config for hide
  if (
    config.setpoints &&
    typeof config.setpoints === "object" &&
    config.setpoints.temperature?.hide
  ) {
    return html``;
  }

  return html`
    <div class="temperature-control">
      <button
        class="temp-button"
        @click=${() => callbacks.onDecrement("temperature")}
        ?disabled=${value !== undefined && value <= minTemp}
      >
        <ha-icon .icon=${"mdi:minus"}></ha-icon>
      </button>
      <div
        class="temp-display ${isUpdating ? "updating" : ""}"
        @click=${() => openMoreInfo(host, stateObj.entity_id)}
      >
        ${formatTemperature(value, decimals, fallback)}
        <span class="unit">${unit}</span>
      </div>
      <button
        class="temp-button"
        @click=${() => callbacks.onIncrement("temperature")}
        ?disabled=${value !== undefined && value >= maxTemp}
      >
        <ha-icon .icon=${"mdi:plus"}></ha-icon>
      </button>
    </div>
  `;
}

function renderDualSetpoint(
  host: HTMLElement,
  hass: HomeAssistant,
  stateObj: HassEntity,
  config: DiraCardConfig,
  pendingValues: Record<string, number>,
  callbacks: TemperatureCallbacks,
  decimals: number,
  fallback: string,
  unit: string,
  minTemp: number,
  maxTemp: number
): TemplateResult {
  const lang = hass.language ?? "en";
  const step = config.step_size ?? stateObj.attributes.target_temp_step ?? 0.5;

  const setpoints = [
    {
      key: "target_temp_low",
      label: localize("card.low", lang),
      rawValue: stateObj.attributes.target_temp_low,
    },
    {
      key: "target_temp_high",
      label: localize("card.high", lang),
      rawValue: stateObj.attributes.target_temp_high,
    },
  ];

  const rows = setpoints
    .filter((sp) => {
      if (
        config.setpoints &&
        typeof config.setpoints === "object" &&
        (config.setpoints as any)[sp.key]?.hide
      ) {
        return false;
      }
      return true;
    })
    .map((sp) => {
      const value = pendingValues[sp.key] ?? sp.rawValue;
      const isUpdating = pendingValues[sp.key] !== undefined;

      return html`
        <div class="setpoint-row">
          <span class="setpoint-label">${sp.label}</span>
          <button
            class="temp-button"
            @click=${() => callbacks.onDecrement(sp.key)}
            ?disabled=${value !== undefined && value <= minTemp}
          >
            <ha-icon .icon=${"mdi:minus"}></ha-icon>
          </button>
          <div
            class="temp-display ${isUpdating ? "updating" : ""}"
            @click=${() => openMoreInfo(host, stateObj.entity_id)}
          >
            ${formatTemperature(value, decimals, fallback)}
            <span class="unit">${unit}</span>
          </div>
          <button
            class="temp-button"
            @click=${() => callbacks.onIncrement(sp.key)}
            ?disabled=${value !== undefined && value >= maxTemp}
          >
            <ha-icon .icon=${"mdi:plus"}></ha-icon>
          </button>
        </div>
      `;
    });

  return html`<div class="dual-setpoints">${rows}</div>`;
}
