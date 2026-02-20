# Dira Thermostat

A modern thermostat card for [Home Assistant](https://www.home-assistant.io/) with Mushroom-style design and full climate control.

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
[![GitHub Release](https://img.shields.io/github/v/release/DiraSmart/dira-thermostat)](https://github.com/DiraSmart/dira-thermostat/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Features

- Mushroom-style modern design with segmented controls and smooth animations
- Full HVAC, Fan, Swing, and Preset mode controls
- Auto-detection of available modes from entity (fan, preset, swing)
- Smart behavior: hides temperature and secondary modes when off or fan_only
- Single and dual setpoint temperature support
- External sensor display (humidity, temperature, etc.)
- Compact mode with inline expand/collapse (auto-collapses after 10s)
- Long press to open more-info dialog on any mode
- Toggle badge on icon (control lights, switches, etc.)
- Fault indicators from binary sensors
- YAML key order respected for mode button ordering
- Visual editor with all major options
- Dark mode and light mode support
- English and Spanish localization (auto-detected)
- Fully customizable: colors, icons, names, layout per mode
- No external HACS dependencies

## Installation

### HACS (Recommended)

1. Open HACS in your Home Assistant
2. Go to **Frontend** > **Custom repositories**
3. Add `https://github.com/DiraSmart/dira-thermostat` as a **Lovelace** repository
4. Search for **Dira Thermostat** and install it
5. Refresh your browser

### Manual

1. Download `dira-thermostat.js` from the [latest release](https://github.com/DiraSmart/dira-thermostat/releases)
2. Copy it to `/config/www/dira-thermostat.js`
3. Go to **Settings** > **Dashboards** > **Resources**
4. Add `/local/dira-thermostat.js` as a **JavaScript Module**
5. Refresh your browser

## Quick Start

```yaml
type: custom:dira-thermostat
entity: climate.living_room
```

That's it! The card will automatically display your climate entity with HVAC modes.

---

## Configuration Reference

### Basic Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | **required** | Climate entity ID (e.g., `climate.living_room`) |
| `name` | string | Entity friendly name | Custom card name |
| `icon` | string | Auto by mode | Custom header icon (e.g., `mdi:thermostat`) |
| `step_size` | number | `0.5` | Temperature increment per button press |
| `decimals` | number | `1` | Decimal places for temperature display |
| `unit` | string/boolean | Entity unit | Temperature unit (`"°F"`, `"°C"`, `false` to hide) |
| `fallback` | string | `"N/A"` | Text shown when value is unavailable |
| `popup` | boolean | `false` | Enable compact mode (tap to expand inline, auto-collapses after 10s) |
| `show_action` | boolean | `false` | Show HVAC action (heating/cooling/idle) in header secondary text |
| `show_fan_speed` | boolean | `false` | Show current fan speed in header secondary text |

### Example

```yaml
type: custom:dira-thermostat
entity: climate.bedroom
name: "Bedroom A/C"
icon: mdi:air-conditioner
step_size: 1
decimals: 0
popup: false
```

---

### Header

Controls the top section of the card with icon, name, toggle switch, and fault indicators.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `header` | object/false | `{}` | Header config, or `false` to hide completely |
| `header.name` | string/false | Entity name | Custom name, `false` to hide |
| `header.icon` | string/false | Auto | Custom icon, `false` to hide |
| `header.toggle` | object | — | Toggle switch config (see below) |
| `header.faults` | array | — | Fault indicator config (see below) |

#### Toggle Badge

Shows a small badge icon on the bottom-right of the main HVAC icon. Tap it to toggle a separate entity on/off (e.g., A/C light, power switch). Supports custom icons for on/off states.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `header.toggle.entity` | string | **required** | Entity to toggle (e.g., `switch.hvac_light`) |
| `header.toggle.icon_on` | string | `mdi:circle` | Icon when entity is on |
| `header.toggle.icon_off` | string | `mdi:circle-outline` | Icon when entity is off |
| `header.toggle.name` | string/boolean | — | Label text (reserved for future use) |

#### Fault Indicators

Shows icons when binary sensors indicate faults (e.g., filter dirty, compressor error).

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | **required** | Binary sensor entity ID |
| `icon` | string | Entity icon | Custom fault icon |
| `hide_inactive` | boolean | `false` | Hide icon when fault is not active |

#### Example

```yaml
type: custom:dira-thermostat
entity: climate.living_room
header:
  name: "Living Room"
  icon: mdi:home-thermometer
  toggle:
    entity: switch.hvac_light
    icon_on: mdi:lightbulb
    icon_off: mdi:lightbulb-off
  faults:
    - entity: binary_sensor.hvac_fault
      icon: mdi:alert-circle
      hide_inactive: true
    - entity: binary_sensor.filter_dirty
      icon: mdi:air-filter
```

---

### Control Modes

Configure which mode controls are displayed and how they look. Supports four control types: `hvac`, `fan`, `preset`, and `swing`.

**Auto-detection:** If you don't specify `control`, the card automatically detects which modes your entity supports (fan_modes, preset_modes, swing_modes) and shows them.

**Smart hide:** Fan, preset, and swing sections are **hidden by default when the entity is off**. Temperature controls are also hidden when off or in fan_only mode. HVAC mode buttons are always visible so you can turn the entity back on.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `control` | object/false | Auto-detected | Control config, or `false` to hide all |
| `control.hvac` | boolean/object | `true` | HVAC modes (off, heat, cool, auto, dry, fan_only) |
| `control.fan` | boolean/object | Auto-detected | Fan modes (auto, low, medium, high, etc.) |
| `control.preset` | boolean/object | Auto-detected | Preset modes (home, away, eco, sleep, etc.) |
| `control.swing` | boolean/object | Auto-detected | Swing modes (on, off, vertical, horizontal) |

#### Simple: Show/hide modes

```yaml
# Auto-detect all available modes (default)
control:

# Or explicitly enable/disable
control:
  hvac: true
  fan: true
  preset: false
  swing: false
```

#### Advanced: Customize each mode

Each control type accepts an object where keys are the **exact mode values** from your entity. You can customize the name, icon, and visibility of each mode.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `_name` | string | Auto (localized) | Custom section heading (shown when `layout.mode.headings: true`) |
| `_hide_when_off` | boolean | `true` for fan/preset/swing, `false` for hvac | Hide this section when entity is off |
| `{mode}` | boolean/object | `true` | `false` or `{include: false}` to exclude a mode |
| `{mode}.name` | string/false | Auto (localized) | Custom display name for this mode |
| `{mode}.icon` | string/false | Auto | Custom icon for this mode |
| `{mode}.include` | boolean | `true` | Set `false` to exclude this mode |

> **Note:** The mode keys must match the exact values from your climate entity. For example, if your entity reports fan modes as `"Circulation"`, `"Auto low"`, `"Low"`, use those exact strings as keys.

> **Order:** When you define modes in config, the **display order matches the YAML key order**. Modes not listed in config are appended at the end. If no custom config is provided, HVAC uses a default order (off, heat, cool, auto, dry, fan_only) and others follow the entity order.

#### Example: Honeywell T6 Pro thermostat

```yaml
type: custom:dira-thermostat
entity: climate.t6_pro_thermostat
step_size: 0.5
show_fan_speed: true
header: false
hide:
  temperature: true
  state: true
control:
  hvac:
    heat:
      name: "Heat"
      icon: mdi:fire
    cool:
      name: "Cool"
      icon: mdi:snowflake
    heat_cool:
      name: "Auto"
      icon: mdi:autorenew
    fan_only:
      name: "Fan"
    off:
      name: "Off"
    dry: false              # Exclude dry mode
  fan:
    _hide_when_off: true    # Hidden when off (this is the default)
    Circulation:
      name: "Circulate"
      icon: mdi:autorenew
    "Auto low":
      name: "Automatic"
      icon: mdi:refresh-auto
    Low:
      name: "Always On"
      icon: mdi:fan
  preset: true              # Show all available presets with default names/icons
  swing: false              # Don't show swing controls
sensors:
  - entity: sensor.t6_pro_thermostat_air_temperature
    name: "Temp"
  - entity: sensor.t6_pro_thermostat_humidity
    name: "Humidity"
    decimals: 0
```

#### Example: Basic A/C with custom mode names

```yaml
type: custom:dira-thermostat
entity: climate.bedroom_ac
name: "Bedroom"
control:
  hvac:
    cool:
      name: "Cold"
      icon: mdi:snowflake
    heat:
      name: "Warm"
      icon: mdi:fire
    auto: true
    dry:
      include: false
    fan_only:
      include: false
  fan:
    auto:
      name: "Auto"
      icon: mdi:fan-auto
    low:
      name: "Low"
      icon: mdi:fan-speed-1
    medium:
      name: "Medium"
      icon: mdi:fan-speed-2
    high:
      name: "High"
      icon: mdi:fan-speed-3
```

#### Default Icons

**HVAC modes:**
| Mode | Icon | Color |
|------|------|-------|
| `off` | `mdi:power` | `#8a8a8a` |
| `heat` | `mdi:fire` | `#ff8100` |
| `cool` | `mdi:snowflake` | `#2b9af9` |
| `auto` | `mdi:autorenew` | `#4caf50` |
| `heat_cool` | `mdi:autorenew` | `#4caf50` |
| `dry` | `mdi:water-percent` | `#efbd07` |
| `fan_only` | `mdi:fan` | `#8a8a8a` |

**Fan modes:**
| Mode | Icon |
|------|------|
| `auto` | `mdi:fan-auto` |
| `low` | `mdi:fan-speed-1` |
| `medium` | `mdi:fan-speed-2` |
| `high` | `mdi:fan-speed-3` |
| `on` / `off` | `mdi:fan` / `mdi:fan-off` |

**Preset modes:**
| Mode | Icon |
|------|------|
| `home` | `mdi:home` |
| `away` | `mdi:account-arrow-right` |
| `eco` | `mdi:leaf` |
| `sleep` | `mdi:bed` |
| `boost` | `mdi:rocket-launch` |
| `comfort` | `mdi:sofa` |

**Swing modes:**
| Mode | Icon |
|------|------|
| `on` / `off` | `mdi:arrow-oscillating` / `mdi:arrow-oscillating-off` |
| `vertical` | `mdi:arrow-up-down` |
| `horizontal` | `mdi:arrow-left-right` |
| `both` | `mdi:arrow-oscillating` |

---

### Sensors

Display additional sensor values below the controls (humidity, outdoor temperature, energy usage, etc.).

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `sensors` | array/false | — | Array of sensor configs, `false` to hide |

Each sensor item:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | Main entity | External sensor entity ID |
| `attribute` | string | — | Entity attribute to read (e.g., `current_humidity`) |
| `name` | string | Auto | Display label |
| `icon` | string | — | Icon to show (e.g., `mdi:water-percent`) |
| `unit` | string | Entity unit | Custom unit string |
| `decimals` | number | — | Round value to N decimal places |
| `type` | string | — | Set to `"relativetime"` for time-ago display |

#### Example

```yaml
sensors:
  - attribute: current_humidity
    name: "Humidity"
    icon: mdi:water-percent
    unit: "%"
  - entity: sensor.outdoor_temperature
    name: "Outside"
    icon: mdi:thermometer
    decimals: 1
  - entity: sensor.hvac_energy
    name: "Energy"
    icon: mdi:lightning-bolt
    unit: "kWh"
  - entity: sensor.hvac_filter
    name: "Filter"
    icon: mdi:air-filter
    type: relativetime
```

---

### Setpoints

Configure temperature setpoint display for single or dual thermostats.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `setpoints` | object/false | Auto-detected | Setpoint config, `false` to hide |
| `setpoints.temperature.hide` | boolean | `false` | Hide single setpoint |
| `setpoints.target_temp_low.hide` | boolean | `false` | Hide low setpoint (dual) |
| `setpoints.target_temp_high.hide` | boolean | `false` | Hide high setpoint (dual) |

The card automatically detects single vs. dual setpoint based on entity attributes.

```yaml
# Hide low setpoint in dual mode
setpoints:
  target_temp_low:
    hide: true
  target_temp_high:
    hide: false
```

---

### Layout

Control the visual layout of the card.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `layout.step` | string | `"column"` | Temperature button direction: `"row"` or `"column"` |
| `layout.mode.names` | boolean | `true` | Show text names on mode buttons |
| `layout.mode.icons` | boolean | `true` | Show icons on mode buttons |
| `layout.mode.headings` | boolean | `false` | Show section headings above modes |
| `layout.sensors.type` | string | `"list"` | Sensor layout: `"list"` or `"table"` |
| `layout.sensors.labels` | boolean | `true` | Show sensor labels |

#### Example

```yaml
# Icon-only mode buttons, no headings
layout:
  mode:
    names: false
    icons: true
    headings: false
  sensors:
    type: table
    labels: true
```

---

### Hide

Hide specific card elements.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `hide.temperature` | boolean | `false` | Hide temperature controls |
| `hide.state` | boolean | `false` | Hide sensors section |

```yaml
hide:
  temperature: false
  state: true
```

---

### Custom Colors

Override the default mode colors.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `colors` | object | — | Map of mode name to hex color |

```yaml
colors:
  heat: "#ff6b35"
  cool: "#00b4d8"
  auto: "#2ecc71"
  dry: "#f39c12"
```

---

### Service Override

Override the service call for temperature changes (for custom integrations).

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `service.domain` | string | `"climate"` | Service domain |
| `service.service` | string | `"set_temperature"` | Service name |
| `service.data` | object | `{}` | Additional data merged into service call |

```yaml
service:
  domain: climate
  service: set_temperature
  data:
    hvac_mode: heat
```

---

### Compact Mode (popup)

When `popup: true`, the card renders as a compact tile with expand/collapse behavior:

- **Single tap** on the header: **toggles** expand/collapse
- **Long press** on the header: opens the **more-info** dialog
- **Auto-collapses** after 10 seconds of inactivity
- Any interaction (changing mode, adjusting temperature) resets the timer

```yaml
type: custom:dira-thermostat
entity: climate.bedroom
popup: true
show_fan_speed: true
```

The compact card shows:
- Mode icon with color (colored by current HVAC mode)
- Toggle badge (if configured)
- Entity name and current mode
- Optional fan speed (`show_fan_speed: true`)
- Current temperature and humidity stats
- Target temperature with +/- buttons (hidden when off or fan_only)

Tapping the compact card expands to show: HVAC modes, fan, swing, presets, and sensors.

### Interaction (full card mode)

When `popup` is not set (full card):

- **Single tap** on the header: does nothing
- **Long press** on the header: opens the **more-info** dialog

---

### Visual Editor

The card includes a visual editor accessible from the dashboard UI (no YAML needed for basic setup). Available options:

- **Entity** — climate entity picker
- **Name** and **Icon** — custom name and icon
- **Step size** and **Decimals** — temperature controls
- **Toggle entity** — entity for the toggle badge (switch, light, input_boolean)
- **Compact mode** — enable expand/collapse behavior
- **Show header** — show/hide the header row
- **Show fan mode** / **preset** / **swing** — enable/disable mode sections
- **Show fan speed in header** — display current fan speed next to mode
- **Show current action** — display heating/cooling/idle in header
- **Hide temperature** / **Hide sensors** — hide specific sections

For advanced configuration (custom mode names, icons, colors, faults, sensors, etc.), use the YAML code editor.

---

## Full Configuration Example

```yaml
type: custom:dira-thermostat
entity: climate.living_room
name: "Living Room"
icon: mdi:home-thermometer
step_size: 0.5
decimals: 1
unit: "°C"
fallback: "N/A"
popup: false
show_action: false
show_fan_speed: true

header:
  toggle:
    entity: switch.hvac_light
    icon_on: mdi:lightbulb
    icon_off: mdi:lightbulb-off
  faults:
    - entity: binary_sensor.hvac_fault
      icon: mdi:alert-circle
      hide_inactive: true

control:
  hvac:
    heat:
      name: "Heat"
      icon: mdi:fire
    cool:
      name: "Cool"
      icon: mdi:snowflake
    heat_cool:
      name: "Auto"
    dry:
      include: false
    fan_only:
      name: "Fan"
  fan:
    auto:
      name: "Auto"
    low:
      name: "Low"
    high:
      name: "High"
  preset: true
  swing: false

sensors:
  - attribute: current_humidity
    name: "Humidity"
    icon: mdi:water-percent
    unit: "%"
  - entity: sensor.outdoor_temp
    name: "Outside"
    icon: mdi:thermometer

layout:
  mode:
    names: true
    icons: true
    headings: false
  sensors:
    type: list
    labels: true

colors:
  heat: "#ff8100"
  cool: "#2b9af9"

hide:
  temperature: false
  state: false
```

### Smart Behavior Summary

| Entity State | Temperature | HVAC modes | Fan/Preset/Swing |
|-------------|-------------|------------|------------------|
| `off` | Hidden | Visible | Hidden |
| `fan_only` | Hidden | Visible | Fan visible |
| `heat` / `cool` / `auto` / `dry` | Visible | Visible | Visible |

---

## Development

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Watch mode (auto-rebuild on changes)
npm run watch
```

### Release

```bash
git tag v1.0.0
git push --tags
# GitHub Actions will build and create the release automatically
```

## License

[MIT](LICENSE) - DiraSmart
