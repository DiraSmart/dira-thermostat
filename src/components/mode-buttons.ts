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
    getColor: (_mode: string, colors?: Record<string, string>) =>
      colors?.fan ?? "var(--primary-color)",
  },
  preset: {
    type: "preset",
    attributeModes: "preset_modes",
    attributeActive: "preset_mode",
    headingKey: "card.preset_modes",
    getIcon: getPresetIcon,
    getColor: (_mode: string, colors?: Record<string, string>) =>
      colors?.preset ?? "#b39ddb",
  },
  swing: {
    type: "swing",
    attributeModes: "swing_modes",
    attributeActive: "swing_mode",
    headingKey: "card.swing_modes",
    getIcon: getSwingIcon,
    getColor: (_mode: string, colors?: Record<string, string>) =>
      colors?.swing ?? "#ffb74d",
  },
};

const HVAC_ORDER = [
  "off",
  "heat",
  "cool",
  "heat_cool",
  "auto",
  "dry",
  "fan_only",
];

export function renderAllControls(
  hass: HomeAssistant,
  stateObj: HassEntity,
  config: DiraCardConfig,
  effectiveControl: ControlConfig | false,
  onModeSelect: (type: ControlType, value: string) => void
): TemplateResult | typeof nothing {
  if (effectiveControl === false) return nothing;

  const lang = hass.language ?? "en";

  const sections: TemplateResult[] = [];

  for (const typeKey of ["hvac", "fan", "preset", "swing"] as ControlType[]) {
    const typeConfig = effectiveControl[typeKey];
    if (typeConfig === false || typeConfig === undefined) continue;

    const modeType = MODE_TYPES[typeKey];

    // Each type reads its own layout section; layout.mode is an alias for hvac
    const typeLayout =
      typeKey === "hvac"
        ? (config.layout?.hvac ?? config.layout?.mode)
        : config.layout?.[typeKey];
    const showNames = typeLayout?.names !== false;
    const showIcons = typeLayout?.icons !== false;
    const showHeadings = typeLayout?.headings === true;

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
  const availableModes: string[] =
    stateObj.attributes[modeType.attributeModes] ?? [];
  if (availableModes.length === 0) return nothing;

  // For non-hvac types, hide when off by default (user can override with _hide_when_off: false)
  const hideWhenOff =
    typeof typeConfig === "object" && typeConfig._hide_when_off !== undefined
      ? typeConfig._hide_when_off
      : modeType.type !== "hvac"; // default: true for fan/preset/swing, false for hvac

  if (hideWhenOff && (stateObj.state === "off" || stateObj.state === "unavailable")) {
    return nothing;
  }

  const activeMode =
    modeType.attributeActive === "__state__"
      ? stateObj.state
      : (stateObj.attributes[modeType.attributeActive] as string) ?? "";

  const heading =
    typeof typeConfig === "object" && typeConfig._name
      ? typeConfig._name
      : localize(modeType.headingKey, lang);

  // If user defined modes in config, use their key order; otherwise use entity order
  let modes: string[];
  const hasCustomOrder =
    typeof typeConfig === "object" &&
    Object.keys(typeConfig).some((k) => !k.startsWith("_"));

  if (hasCustomOrder) {
    // User-defined keys first (in YAML order), then any remaining from entity
    const configKeys = Object.keys(typeConfig as ModeControlConfig).filter(
      (k) => !k.startsWith("_")
    );
    const ordered = configKeys.filter((k) => availableModes.includes(k));
    const remaining = availableModes.filter((m) => !configKeys.includes(m));
    modes = [...ordered, ...remaining];
  } else {
    modes = [...availableModes];
    if (modeType.type === "hvac") {
      modes.sort(
        (a, b) =>
          (HVAC_ORDER.indexOf(a) !== -1 ? HVAC_ORDER.indexOf(a) : 99) -
          (HVAC_ORDER.indexOf(b) !== -1 ? HVAC_ORDER.indexOf(b) : 99)
      );
    }
  }

  const options: ProcessedModeOption[] = [];

  for (const mode of modes) {
    let optConfig: ModeOptionConfig | undefined;
    if (typeof typeConfig === "object") {
      const raw = typeConfig[mode];
      if (
        raw === false ||
        (typeof raw === "object" && raw?.include === false)
      ) {
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

  // Segmented control style
  return html`
    <div class="mode-section">
      ${showHeadings
        ? html`<div class="mode-heading">${heading}</div>`
        : nothing}
      <div class="segmented-control">
        ${options.map((opt) => {
          const isActive = opt.value === activeMode;
          const rgb = hexToRgb(opt.color);
          const style = isActive
            ? `background-color: ${opt.color}; color: var(--text-primary-color, #fff);`
            : "";

          return html`
            <button
              class="segment ${isActive ? "active" : ""}"
              style="${style}"
              @click=${() => onSelect(opt.value)}
              title=${opt.name}
            >
              ${showIcons
                ? html`<ha-icon .icon=${opt.icon}></ha-icon>`
                : nothing}
              ${showNames
                ? html`<span class="segment-label">${opt.name}</span>`
                : nothing}
            </button>
          `;
        })}
      </div>
    </div>
  `;
}
