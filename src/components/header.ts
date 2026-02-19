import { html, nothing, TemplateResult } from "lit";
import {
  HomeAssistant,
  HassEntity,
  DiraCardConfig,
  HeaderConfig,
} from "../types";
import { getModeColor, getActionColor, hexToRgb } from "../utils/colors";
import { getModeIcon, getActionIcon } from "../utils/icons";
import { getEntityName } from "../utils/entity";
import { localize } from "../localize";
import { openMoreInfo } from "../utils/fire-event";

export function renderHeader(
  host: HTMLElement,
  hass: HomeAssistant,
  stateObj: HassEntity,
  config: DiraCardConfig
): TemplateResult | typeof nothing {
  if (config.header === false) return nothing;

  const headerConfig: HeaderConfig =
    typeof config.header === "object" ? config.header : {};

  if (headerConfig.name === false && headerConfig.icon === false) return nothing;

  const lang = hass.language ?? "en";
  const name = getEntityName(stateObj, config.name);
  const hvacAction = stateObj.attributes.hvac_action as string | undefined;
  const hvacMode = stateObj.state;

  // Determine color
  const color = hvacAction
    ? getActionColor(hvacAction)
    : getModeColor(hvacMode, config.colors);
  const rgb = hexToRgb(color);
  const isOff = hvacMode === "off" || hvacMode === "unavailable";

  // Determine icon
  const icon =
    config.icon ??
    headerConfig.icon ??
    (hvacAction ? getActionIcon(hvacAction) : getModeIcon(hvacMode));

  // Secondary text: action + current temp
  const actionText = hvacAction
    ? localize(`action.${hvacAction}`, lang)
    : localize(`mode.${hvacMode}`, lang);
  const currentTemp = stateObj.attributes.current_temperature;
  const unit = stateObj.attributes.unit_of_measurement ?? "°C";
  const secondary =
    currentTemp !== undefined && currentTemp !== null
      ? `${actionText} \u00b7 ${Number(currentTemp).toFixed(config.decimals ?? 1)} ${unit}`
      : actionText;

  const iconBg =
    isOff || icon === false
      ? ""
      : `background-color: rgba(${rgb}, 0.2)`;
  const iconColor = isOff ? "" : `color: ${color}`;

  return html`
    <div
      class="header"
      @click=${(e: Event) => {
        const target = e.target as HTMLElement;
        if (!target.closest("ha-switch") && !target.closest(".fault-icon")) {
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
        <div class="secondary">${secondary}</div>
      </div>
      <div class="header-actions">
        ${renderFaults(host, hass, headerConfig.faults)}
        ${renderToggle(host, hass, headerConfig.toggle)}
      </div>
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
