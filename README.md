# Dira Thermostat

A modern thermostat card for [Home Assistant](https://www.home-assistant.io/) with Mushroom-style design and full climate control.

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
[![GitHub Release](https://img.shields.io/github/v/release/DiraSmart/dira-thermostat)](https://github.com/DiraSmart/dira-thermostat/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Features

- Mushroom-style design with smooth animations (280ms)
- HVAC, Fan, Swing, and Preset mode controls with auto-detection
- Compact mode with inline expand/collapse
- Toggle badge on icon for controlling lights, switches, etc.
- Configurable header stats (temperature, humidity, external sensors)
- Fault indicators from binary sensors
- Per-type layout control (icons/names per section)
- Custom colors, icons, and names per mode
- YAML key order respected for button ordering
- Visual editor for basic setup
- Dark and light mode support
- English and Spanish (auto-detected)
- No external dependencies

## Installation

### HACS (Recommended)

1. Open HACS > **Frontend** > **Custom repositories**
2. Add `https://github.com/DiraSmart/dira-thermostat` as **Lovelace**
3. Search for **Dira Thermostat** and install
4. Refresh your browser

### Manual

1. Download `dira-thermostat.js` from the [latest release](https://github.com/DiraSmart/dira-thermostat/releases)
2. Copy to `/config/www/dira-thermostat.js`
3. **Settings** > **Dashboards** > **Resources** > Add `/local/dira-thermostat.js` as JavaScript Module

## Quick Start

```yaml
type: custom:dira-thermostat
entity: climate.living_room
```

The card auto-detects available modes and displays them.

---

## Configuration

### Basic

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | **required** | Climate entity ID |
| `name` | string | Entity name | Custom card name |
| `icon` | string | Auto by mode | Custom icon (e.g. `mdi:air-conditioner`) |
| `step_size` | number | `0.5` | Temperature step per button press |
| `decimals` | number | `1` | Decimal places for temperature |
| `unit` | string/boolean | Entity unit | Temperature unit. `false` to hide |
| `fallback` | string | `"N/A"` | Text when value is unavailable |
| `popup` | boolean | `false` | Compact mode (tap to expand) |
| `show_action` | boolean | `false` | Show current action in header (heating/cooling/idle) |
| `show_fan_speed` | boolean | `false` | Show fan speed in header |

---

### Header

The top row: icon, name, secondary text, toggle, faults, and temperature controls.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `header` | object/false | `{}` | Header config. `false` to hide entirely |
| `header.name` | string/false | Entity name | Custom name. `false` to hide |
| `header.icon` | string/false | Auto | Custom icon. `false` to hide |

#### Toggle

A badge on the HVAC icon that toggles a separate entity (light, switch, etc.). Tap the icon to toggle.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `header.toggle.entity` | string | **required** | Entity to toggle |
| `header.toggle.icon_on` | string | `mdi:circle` | Icon when on |
| `header.toggle.icon_off` | string | `mdi:circle-outline` | Icon when off |

#### Faults

Icons that show when binary sensors are active (filter dirty, compressor error, etc.).

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `faults[].entity` | string | **required** | Binary sensor entity |
| `faults[].icon` | string | Entity icon | Custom icon |
| `faults[].hide_inactive` | boolean | `false` | Hide when not active |

#### Stats

The values shown in the header secondary text (e.g. "Cool · 24 °C · 60%"). By default shows `current_temperature` and `current_humidity` from the climate entity. You can override with custom entities.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `header.stats` | array/false | Auto (temp + humidity) | Custom stats. `false` to hide all |
| `stats[].entity` | string | Climate entity | External sensor entity |
| `stats[].attribute` | string | — | Attribute to read (e.g. `current_humidity`) |
| `stats[].unit` | string | — | Unit to display |
| `stats[].decimals` | number | — | Decimal places |

```yaml
header:
  toggle:
    entity: switch.ac_light
    icon_on: mdi:lightbulb
    icon_off: mdi:lightbulb-off
  faults:
    - entity: binary_sensor.filter_dirty
      icon: mdi:air-filter
      hide_inactive: true
  stats:
    - entity: sensor.room_temperature
      unit: °C
      decimals: 1
    - entity: sensor.room_humidity
      unit: "%"
```

To hide the default stats without replacing them:

```yaml
header:
  stats: false
```

---

### Control

Configure which mode buttons are shown. Four types: `hvac`, `fan`, `preset`, `swing`.

If `control` is not set, the card auto-detects available modes from the entity.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `control` | object/false | Auto | `false` to hide all controls |
| `control.hvac` | boolean/object | `true` | HVAC mode buttons |
| `control.fan` | boolean/object | Auto | Fan mode buttons |
| `control.preset` | boolean/object | Auto | Preset mode buttons |
| `control.swing` | boolean/object | Auto | Swing mode buttons |

#### Simple: show/hide

```yaml
control:
  hvac: true
  fan: true
  preset: false
  swing: false
```

#### Advanced: customize per mode

Each control type accepts an object. Keys starting with `_` are section settings; other keys are mode values from your entity.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `_name` | string | Auto | Section heading (visible with `layout.*.headings: true`) |
| `_hide_when_off` | boolean | `true` (fan/preset/swing), `false` (hvac) | Hide when entity is off |
| `{mode}` | boolean/object | `true` | `false` to exclude a mode |
| `{mode}.name` | string/false | Auto | Custom display name |
| `{mode}.icon` | string/false | Auto | Custom icon |
| `{mode}.include` | boolean | `true` | `false` to exclude |

**Order:** Modes display in the order you write them in YAML. Unspecified modes are appended at the end.

```yaml
control:
  hvac:
    cool:
      name: "Cold"
      icon: mdi:snowflake
    heat:
      name: "Warm"
    auto: true
    dry: false
  fan:
    _hide_when_off: true
    low:
      name: "Low"
    medium:
      name: "Med"
    high:
      name: "High"
    auto:
      name: "Auto"
  preset: true
  swing: false
```

---

### Layout

Control icons, names, and headings **per control type**. Each section is independent.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `layout.mode` | object | — | Layout for HVAC buttons (alias for `layout.hvac`) |
| `layout.hvac` | object | — | Layout for HVAC buttons |
| `layout.fan` | object | — | Layout for fan buttons |
| `layout.preset` | object | — | Layout for preset buttons |
| `layout.swing` | object | — | Layout for swing buttons |

Each accepts:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `names` | boolean | `true` | Show text names |
| `icons` | boolean | `true` | Show icons |
| `headings` | boolean | `false` | Show section heading |

```yaml
layout:
  mode:
    names: false      # HVAC: icons only
  fan:
    icons: false      # Fan: names only
  preset:
    names: false      # Preset: icons only
    headings: true    # Show "Preset" heading
```

`layout.mode` and `layout.hvac` are equivalent. Each type reads **only its own section** — setting `layout.mode.names: false` does NOT affect fan, preset, or swing.

#### Sensors layout

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `layout.sensors.type` | string | `"list"` | `"list"` or `"table"` |
| `layout.sensors.labels` | boolean | `true` | Show sensor labels |

---

### Sensors

Display additional values below the controls. Independent from header stats.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `sensors` | array/false | — | Array of sensors. `false` to hide |

Each sensor requires `entity` or `attribute` (at least one):

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | Climate entity | External sensor entity |
| `attribute` | string | — | Attribute to read from the entity |
| `name` | string | Auto | Display label |
| `icon` | string | — | Icon (e.g. `mdi:water-percent`) |
| `unit` | string | Entity unit | Custom unit |
| `decimals` | number | — | Decimal places |
| `type` | string | — | `"relativetime"` for time-ago display |

```yaml
sensors:
  - entity: sensor.outdoor_temp
    name: "Outside"
    icon: mdi:thermometer
    decimals: 1
  - attribute: current_humidity
    name: "Humidity"
    icon: mdi:water-percent
    unit: "%"
```

---

### Hide

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `hide.temperature` | boolean | `false` | Hide temperature +/- controls |
| `hide.state` | boolean | `false` | Hide stats from header (temp, humidity) |

```yaml
hide:
  temperature: true   # No +/- buttons
  state: true         # No "24 °C · 60%" in header
```

Note: `hide.state` hides the stats in the header secondary text. The `sensors` section at the bottom is always shown if configured.

---

### Colors

Override default colors for HVAC modes and control sections.

| Key | Default | Description |
|-----|---------|-------------|
| `heat` | `#ff8100` | Heat mode |
| `cool` | `#2b9af9` | Cool mode |
| `auto` / `heat_cool` | `#4caf50` | Auto modes |
| `dry` | `#efbd07` | Dry mode |
| `fan_only` / `off` | `#8a8a8a` | Fan only / Off |
| `fan` | `var(--primary-color)` | Fan section active color |
| `preset` | `#b39ddb` | Preset section active color |
| `swing` | `#ffb74d` | Swing section active color |

```yaml
colors:
  heat: "#ff6b35"
  cool: "#00b4d8"
  fan: "#4dd0e1"
  preset: "#e91e63"
```

---

### Service Override

Override the service call for temperature changes.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `service.domain` | string | `"climate"` | Service domain |
| `service.service` | string | `"set_temperature"` | Service name |
| `service.data` | object | `{}` | Extra data merged into call |

---

### Setpoints

Configure dual setpoint display.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `setpoints.temperature.hide` | boolean | `false` | Hide single setpoint |
| `setpoints.target_temp_low.hide` | boolean | `false` | Hide low setpoint |
| `setpoints.target_temp_high.hide` | boolean | `false` | Hide high setpoint |

---

## Interaction

| Action | Compact mode (`popup: true`) | Full card mode |
|--------|------------------------------|----------------|
| **Tap header** | Toggle expand/collapse | Nothing |
| **Long press header** | Open more-info dialog | Open more-info dialog |
| **Tap icon** (with toggle) | Toggle the configured entity | Toggle the configured entity |
| **Tap mode button** | Change mode | Change mode |

Compact mode auto-collapses after 10 seconds of inactivity. Also collapses when navigating to another view/tab.

---

## Visual Editor

Available from the dashboard UI for basic setup:

- Entity picker (climate)
- Name and icon
- Step size and decimals
- Toggle entity
- Compact mode on/off
- Show/hide: header, fan, preset, swing, fan speed, action, temperature, sensors

For advanced options (custom mode names, icons, colors, faults, stats, sensors, layout), use the YAML editor.

---

## Smart Behavior

| Entity state | Temperature +/- | HVAC modes | Fan/Preset/Swing |
|-------------|-----------------|------------|------------------|
| `off` | Hidden | Visible | Hidden |
| `fan_only` | Hidden | Visible | Fan visible |
| `heat` / `cool` / `auto` / `dry` | Visible | Visible | Visible |

Fan, preset, and swing hide when off by default. Override with `_hide_when_off: false`:

```yaml
control:
  fan:
    _hide_when_off: false
```

---

## Default Icons

**HVAC:** off (`mdi:power`), heat (`mdi:fire`), cool (`mdi:snowflake`), auto (`mdi:autorenew`), dry (`mdi:water-percent`), fan_only (`mdi:fan`)

**Fan:** auto (`mdi:fan-auto`), low (`mdi:fan-speed-1`), medium (`mdi:fan-speed-2`), high (`mdi:fan-speed-3`)

**Preset:** home (`mdi:home`), away (`mdi:account-arrow-right`), eco (`mdi:leaf`), sleep (`mdi:bed`), boost (`mdi:rocket-launch`), comfort (`mdi:sofa`)

**Swing:** on (`mdi:arrow-oscillating`), off (`mdi:arrow-oscillating-off`), vertical (`mdi:arrow-up-down`), horizontal (`mdi:arrow-left-right`)

---

## Full Example

```yaml
type: custom:dira-thermostat
entity: climate.living_room
name: "Living Room"
icon: mdi:home-thermometer
step_size: 0.5
decimals: 1
popup: true
show_action: true
show_fan_speed: true

header:
  toggle:
    entity: switch.ac_light
    icon_on: mdi:lightbulb
    icon_off: mdi:lightbulb-off
  faults:
    - entity: binary_sensor.filter_dirty
      icon: mdi:air-filter
      hide_inactive: true
  stats:
    - entity: sensor.room_temperature
      unit: °C
      decimals: 1
    - entity: sensor.room_humidity
      unit: "%"

control:
  hvac:
    cool:
      name: "Cool"
      icon: mdi:snowflake
    heat:
      name: "Heat"
    auto: true
    dry: false
  fan:
    low: true
    medium: true
    high: true
    auto: true
  preset: true
  swing: false

sensors:
  - entity: sensor.outdoor_temp
    name: "Outside"
    icon: mdi:thermometer
    decimals: 1
  - attribute: current_humidity
    name: "Humidity"
    icon: mdi:water-percent
    unit: "%"

layout:
  mode:
    names: false
    icons: true
  fan:
    icons: false
    names: true
  sensors:
    type: list

colors:
  heat: "#ff6b35"
  cool: "#00b4d8"
  fan: "#4dd0e1"

hide:
  temperature: false
  state: false
```

---

## Development

```bash
npm install
npm run build
npm run watch    # auto-rebuild on changes
```

### Release

```bash
git tag v1.0.0
git push --tags
# GitHub Actions builds and creates the release
```

## License

[MIT](LICENSE) - DiraSmart
