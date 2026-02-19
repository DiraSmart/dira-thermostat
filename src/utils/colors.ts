import { HvacMode, HvacAction } from "../types";

const MODE_COLORS: Record<string, string> = {
  [HvacMode.HEAT]: "#ff8100",
  [HvacMode.COOL]: "#2b9af9",
  [HvacMode.AUTO]: "#4caf50",
  [HvacMode.HEAT_COOL]: "#4caf50",
  [HvacMode.DRY]: "#efbd07",
  [HvacMode.FAN_ONLY]: "#8a8a8a",
  [HvacMode.OFF]: "#8a8a8a",
};

const ACTION_COLORS: Record<string, string> = {
  [HvacAction.HEATING]: "#ff8100",
  [HvacAction.COOLING]: "#2b9af9",
  [HvacAction.DRYING]: "#efbd07",
  [HvacAction.IDLE]: "#8a8a8a",
  [HvacAction.FAN]: "#8a8a8a",
  [HvacAction.OFF]: "#8a8a8a",
};

export function getModeColor(
  mode: string,
  customColors?: Record<string, string>
): string {
  return customColors?.[mode] ?? MODE_COLORS[mode] ?? "#8a8a8a";
}

export function getActionColor(action: string): string {
  return ACTION_COLORS[action] ?? "#8a8a8a";
}

export function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "138, 138, 138";
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}
