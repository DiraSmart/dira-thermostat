import { HassEntity } from "../types";

export function isDualSetpoint(stateObj: HassEntity): boolean {
  const attrs = stateObj.attributes;
  return (
    typeof attrs.target_temp_low === "number" &&
    typeof attrs.target_temp_high === "number"
  );
}

export function formatTemperature(
  value: number | undefined | null,
  decimals: number = 1,
  fallback: string = "N/A"
): string {
  if (value === undefined || value === null || isNaN(value)) return fallback;
  return Number(value).toFixed(decimals);
}

export function getUnit(
  stateObj: HassEntity,
  configUnit?: string | boolean
): string {
  if (configUnit === false) return "";
  if (typeof configUnit === "string") return configUnit;
  return stateObj.attributes.unit_of_measurement ?? "°C";
}

export function getEntityName(stateObj: HassEntity, configName?: string): string {
  if (configName) return configName;
  return stateObj.attributes.friendly_name ?? stateObj.entity_id;
}
