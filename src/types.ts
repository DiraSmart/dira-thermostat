// ---- Home Assistant types (own definitions, no external deps) ----

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
  last_changed: string;
  last_updated: string;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  callService(
    domain: string,
    service: string,
    data?: Record<string, any>
  ): Promise<void>;
  language: string;
  selectedLanguage?: string;
  localize(key: string, ...args: any[]): string;
}

// ---- Enums ----

export enum HvacMode {
  OFF = "off",
  HEAT = "heat",
  COOL = "cool",
  HEAT_COOL = "heat_cool",
  AUTO = "auto",
  DRY = "dry",
  FAN_ONLY = "fan_only",
}

export enum HvacAction {
  OFF = "off",
  HEATING = "heating",
  COOLING = "cooling",
  DRYING = "drying",
  IDLE = "idle",
  FAN = "fan",
}

// ---- Config interfaces ----

export interface SensorConfig {
  entity?: string;
  attribute?: string;
  name?: string;
  icon?: string;
  unit?: string;
  decimals?: number;
  type?: "relativetime";
}

export interface FaultConfig {
  entity: string;
  icon?: string;
  hide_inactive?: boolean;
}

export interface ToggleConfig {
  entity: string;
  name?: string | boolean;
  icon_on?: string;
  icon_off?: string;
}

export interface HeaderStatConfig {
  entity?: string;
  attribute?: string;
  unit?: string;
  decimals?: number;
}

export interface HeaderConfig {
  name?: string | false;
  icon?: string | false;
  toggle?: ToggleConfig;
  faults?: FaultConfig[];
  stats?: HeaderStatConfig[] | false;
}

export interface ModeOptionConfig {
  name?: string | false;
  icon?: string | false;
  include?: boolean;
}

export interface ModeControlConfig {
  _name?: string;
  _hide_when_off?: boolean;
  [mode: string]: string | boolean | ModeOptionConfig | undefined;
}

export interface ControlConfig {
  hvac?: boolean | ModeControlConfig;
  fan?: boolean | ModeControlConfig;
  preset?: boolean | ModeControlConfig;
  swing?: boolean | ModeControlConfig;
}

export interface SetpointItemConfig {
  hide?: boolean;
}

export interface SetpointsConfig {
  temperature?: SetpointItemConfig;
  target_temp_low?: SetpointItemConfig;
  target_temp_high?: SetpointItemConfig;
  [key: string]: SetpointItemConfig | undefined;
}

export interface ModeLayoutConfig {
  names?: boolean;
  icons?: boolean;
  headings?: boolean;
}

export interface LayoutConfig {
  step?: "row" | "column";
  mode?: ModeLayoutConfig;
  hvac?: ModeLayoutConfig;
  fan?: ModeLayoutConfig;
  preset?: ModeLayoutConfig;
  swing?: ModeLayoutConfig;
  sensors?: {
    type?: "table" | "list";
    labels?: boolean;
  };
}

export interface ServiceConfig {
  domain?: string;
  service?: string;
  data?: Record<string, any>;
}

export interface DiraCardConfig {
  type: string;
  entity: string;
  name?: string;
  icon?: string;
  header?: HeaderConfig | false;
  setpoints?: SetpointsConfig | false;
  control?: ControlConfig | false;
  sensors?: SensorConfig[] | false;
  step_size?: number;
  decimals?: number;
  unit?: string | boolean;
  fallback?: string;
  hide?: {
    temperature?: boolean;
    state?: boolean;
  };
  show_action?: boolean;
  show_fan_speed?: boolean;
  layout?: LayoutConfig;
  service?: ServiceConfig;
  label?: {
    temperature?: string;
    state?: string;
  };
  colors?: Record<string, string>;
  popup?: boolean;
}

// ---- Internal processed types ----

export interface ProcessedModeOption {
  value: string;
  name: string;
  icon: string;
  color: string;
}

export type ControlType = "hvac" | "fan" | "preset" | "swing";
