import { html, nothing, TemplateResult } from "lit";
import {
  HomeAssistant,
  HassEntity,
  DiraCardConfig,
  SensorConfig,
} from "../types";
import { formatTemperature } from "../utils/entity";
import { openMoreInfo } from "../utils/fire-event";

export function renderSensors(
  host: HTMLElement,
  hass: HomeAssistant,
  stateObj: HassEntity,
  config: DiraCardConfig
): TemplateResult | typeof nothing {
  if (config.sensors === false || !config.sensors || config.sensors.length === 0) {
    return nothing;
  }

  const layout = config.layout?.sensors ?? {};
  const isTable = layout.type === "table";
  const showLabels = layout.labels !== false;

  const items = config.sensors
    .map((sensor) => renderSensorItem(host, hass, stateObj, sensor, showLabels))
    .filter((item) => item !== nothing);

  if (items.length === 0) return nothing;

  return html`
    <div class="sensors ${isTable ? "table" : ""}">
      ${items}
    </div>
  `;
}

function renderSensorItem(
  host: HTMLElement,
  hass: HomeAssistant,
  stateObj: HassEntity,
  sensor: SensorConfig,
  showLabels: boolean
): TemplateResult | typeof nothing {
  // Determine source entity
  const sourceEntityId = sensor.entity ?? stateObj.entity_id;
  const sourceEntity = hass.states[sourceEntityId];
  if (!sourceEntity) return nothing;

  // Get value
  let value: string | number | undefined;
  if (sensor.attribute) {
    value = sourceEntity.attributes[sensor.attribute];
  } else if (sensor.entity) {
    value = sourceEntity.state;
  } else {
    return nothing;
  }

  if (value === undefined || value === null) return nothing;

  // Format value
  let displayValue: string;
  if (sensor.type === "relativetime") {
    // Will be rendered differently - for now show time ago
    const date = new Date(value as string);
    displayValue = formatRelativeTime(date);
  } else if (
    sensor.decimals !== undefined &&
    typeof value === "number"
  ) {
    displayValue = formatTemperature(value, sensor.decimals);
  } else {
    displayValue = String(value);
  }

  // Unit
  const unit =
    sensor.unit ??
    (sensor.attribute
      ? ""
      : sourceEntity.attributes.unit_of_measurement ?? "");

  // Name/label
  const name =
    sensor.name ??
    (sensor.attribute
      ? sensor.attribute.replace(/_/g, " ")
      : sourceEntity.attributes.friendly_name ?? sourceEntityId);

  return html`
    <div
      class="sensor-item"
      @click=${() => openMoreInfo(host, sourceEntityId)}
    >
      ${sensor.icon
        ? html`<ha-icon .icon=${sensor.icon}></ha-icon>`
        : nothing}
      ${showLabels && !sensor.icon
        ? html`<span class="sensor-label">${name}:</span>`
        : nothing}
      <span class="sensor-value">${displayValue}${unit ? ` ${unit}` : ""}</span>
    </div>
  `;
}

function formatRelativeTime(date: Date): string {
  const now = Date.now();
  const diff = Math.floor((now - date.getTime()) / 1000);

  if (diff < 60) return `${diff}s`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  return `${Math.floor(diff / 86400)}d`;
}
