import { HvacMode, HvacAction } from "../types";

const MODE_ICONS: Record<string, string> = {
  [HvacMode.OFF]: "mdi:power",
  [HvacMode.HEAT]: "mdi:fire",
  [HvacMode.COOL]: "mdi:snowflake",
  [HvacMode.HEAT_COOL]: "mdi:autorenew",
  [HvacMode.AUTO]: "mdi:autorenew",
  [HvacMode.DRY]: "mdi:water-percent",
  [HvacMode.FAN_ONLY]: "mdi:fan",
};

const ACTION_ICONS: Record<string, string> = {
  [HvacAction.HEATING]: "mdi:fire",
  [HvacAction.COOLING]: "mdi:snowflake",
  [HvacAction.DRYING]: "mdi:water-percent",
  [HvacAction.IDLE]: "mdi:clock-outline",
  [HvacAction.FAN]: "mdi:fan",
  [HvacAction.OFF]: "mdi:power",
};

const FAN_ICONS: Record<string, string> = {
  auto: "mdi:fan-auto",
  low: "mdi:fan-speed-1",
  medium: "mdi:fan-speed-2",
  "medium-low": "mdi:fan-speed-1",
  "medium-high": "mdi:fan-speed-2",
  high: "mdi:fan-speed-3",
  on: "mdi:fan",
  off: "mdi:fan-off",
  diffuse: "mdi:weather-windy",
};

const SWING_ICONS: Record<string, string> = {
  on: "mdi:arrow-oscillating",
  off: "mdi:arrow-oscillating-off",
  both: "mdi:arrow-oscillating",
  vertical: "mdi:arrow-up-down",
  horizontal: "mdi:arrow-left-right",
};

const PRESET_ICONS: Record<string, string> = {
  none: "mdi:cancel",
  home: "mdi:home",
  away: "mdi:account-arrow-right",
  boost: "mdi:rocket-launch",
  comfort: "mdi:sofa",
  eco: "mdi:leaf",
  sleep: "mdi:bed",
  activity: "mdi:motion-sensor",
};

export function getModeIcon(mode: string): string {
  return MODE_ICONS[mode] ?? "mdi:thermostat";
}

export function getActionIcon(action: string): string {
  return ACTION_ICONS[action] ?? "mdi:thermostat";
}

export function getFanIcon(mode: string): string {
  return FAN_ICONS[mode.toLowerCase()] ?? "mdi:fan";
}

export function getSwingIcon(mode: string): string {
  return SWING_ICONS[mode.toLowerCase()] ?? "mdi:arrow-oscillating";
}

export function getPresetIcon(mode: string): string {
  return PRESET_ICONS[mode.toLowerCase()] ?? "mdi:tune";
}
