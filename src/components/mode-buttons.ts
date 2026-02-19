import { html, nothing, TemplateResult } from "lit";
import {
  HomeAssistant,
  HassEntity,
  DiraCardConfig,
  ControlConfig,
  ModeControlConfig,
  ModeOptionConfig,
  ControlType,
  ProcessedModeOption,
} from "../types";
import { getModeColor, hexToRgb } from "../utils/colors";
import {
  getModeIcon,
  getFanIcon,
  getSwingIcon,
  getPresetIcon,
} from "../utils/icons";
import { localize } from "../localize";

interface ModeTypeConfig {
  type: ControlType;
  attributeModes: string;
  attributeActive: string;
  headingKey: string;
  getIcon: (mode: string) => string;
  getColor: (mode: string, colors?: Record<string, string>) => string;
}

const MODE_TYPES: Record<ControlType, ModeTypeConfig> = {
  hvac: {
    type: "hvac",
    attributeModes: "hvac_modes",
    attributeActive: "__state__",
    headingKey: "card.hvac_modes",
    getIcon: getModeIcon,
    getColor: getModeColor,
  },
  fan: {
    type: "fan",
    attributeModes: "fan_modes",
    attributeActive: "fan_mode",
    headingKey: "card.fan_modes",
    getIcon: getFanIcon,
    getColor: () => "#8a8a8a",
  },
  preset: {
    type: "preset",
    attributeModes: "preset_modes",
    attributeActive: "preset_mode",
    headingKey: "card.preset_modes",
    getIcon: getPresetIcon,
    getColor: () => "#8a8a8a",
  },
  swing: {
    type: "swing",
    attributeModes: "swing_modes",
    attributeActive: "swing_mode",
    headingKey: "card.swing_modes",
    getIcon: getSwingIcon,
    getColor: () => "#8a8a8a",
  },
};

// HVAC mode sort order
const HVAC_ORDER = ["off", "heat", "cool", "heat_cool", "auto", "dry", "fan_only"];

export function renderAllControls(
  hass: HomeAssistant,
  stateObj: HassEntity,
  config: DiraCardConfig,
  onModeSelect: (type: ControlType, value: string) => void
): TemplateResult | typeof nothing {
  if (config.control === false) return nothing;

  const control: ControlConfig =
    typeof config.control === "object" && config.control !== null
      ? config.control
      : { hvac: true };

  const lang = hass.language ?? "en";
  const layout = config.layout?.mode ?? {};
  const showNames = layout.names !== false;
  const showIcons = layout.icons !== false;
  const showHeadings = layout.headings !== false;

  const sections: TemplateResult[] = [];

  for (const typeKey of ["hvac", "fan", "preset", "swing"] as ControlType[]) {
    const typeConfig = control[typeKey];
    if (typeConfig === false || typeConfig === undefined) continue;

    const modeType = MODE_TYPES[typeKey];
    const section = renderModeSection(
      hass,
      stateObj,
      config,
      modeType,
      typeConfig,
      lang,
      showNames,
      showIcons,
      showHeadings,
      (value: string) => onModeSelect(typeKey, value)
    );

    if (section !== nothing) {
      sections.push(section as TemplateResult);
    }
  }

  if (sections.length === 0) return nothing;
  return html`${sections}`;
}

function renderModeSection(
  hass: HomeAssistant,
  stateObj: HassEntity,
  config: DiraCardConfig,
  modeType: ModeTypeConfig,
  typeConfig: boolean | ModeControlConfig,
  lang: string,
  showNames: boolean,
  showIcons: boolean,
  showHeadings: boolean,
  onSelect: (value: string) => void
): TemplateResult | typeof nothing {
  // Get available modes from entity
  const availableModes: string[] =
    stateObj.attributes[modeType.attributeModes] ?? [];
  if (availableModes.length === 0) return nothing;

  // Check _hide_when_off
  if (
    typeof typeConfig === "object" &&
    typeConfig._hide_when_off &&
    stateObj.state === "off"
  ) {
    return nothing;
  }

  // Get active mode
  const activeMode =
    modeType.attributeActive === "__state__"
      ? stateObj.state
      : (stateObj.attributes[modeType.attributeActive] as string) ?? "";

  // Custom heading
  const heading =
    typeof typeConfig === "object" && typeConfig._name
      ? typeConfig._name
      : localize(modeType.headingKey, lang);

  // Build options
  let modes = [...availableModes];

  // Sort HVAC modes
  if (modeType.type === "hvac") {
    modes.sort(
      (a, b) =>
        (HVAC_ORDER.indexOf(a) ?? 99) - (HVAC_ORDER.indexOf(b) ?? 99)
    );
  }

  const options: ProcessedModeOption[] = [];

  for (const mode of modes) {
    let optConfig: ModeOptionConfig | undefined;
    if (typeof typeConfig === "object") {
      const raw = typeConfig[mode];
      if (raw === false || (typeof raw === "object" && raw?.include === false)) {
        continue;
      }
      if (typeof raw === "object") {
        optConfig = raw as ModeOptionConfig;
      }
    }

    const name =
      optConfig?.name !== undefined && optConfig.name !== false
        ? (optConfig.name as string)
        : localize(`mode.${mode}`, lang) !== `mode.${mode}`
          ? localize(`mode.${mode}`, lang)
          : mode.replace(/_/g, " ");

    const icon =
      optConfig?.icon !== undefined && optConfig.icon !== false
        ? (optConfig.icon as string)
        : modeType.getIcon(mode);

    const color = modeType.getColor(mode, config.colors);

    options.push({ value: mode, name, icon, color });
  }

  if (options.length === 0) return nothing;

  return html`
    <div class="mode-section">
      ${showHeadings ? html`<div class="mode-heading">${heading}</div>` : nothing}
      <div class="mode-buttons">
        ${options.map((opt) => {
          const isActive = opt.value === activeMode;
          const rgb = hexToRgb(opt.color);
          const activeBg = `background-color: rgba(${rgb}, 0.2)`;
          const activeColor = `color: ${opt.color}`;
          const style = isActive ? `${activeBg}; ${activeColor}` : "";
          const iconOnly = showIcons && !showNames;

          return html`
            <button
              class="mode-btn ${isActive ? "active" : ""} ${iconOnly ? "icon-only" : ""}"
              style="${style}"
              @click=${() => onSelect(opt.value)}
            >
              ${showIcons
                ? html`<ha-icon .icon=${opt.icon}></ha-icon>`
                : nothing}
              ${showNames && !iconOnly
                ? html`<span>${opt.name}</span>`
                : nothing}
            </button>
          `;
        })}
      </div>
    </div>
  `;
}
