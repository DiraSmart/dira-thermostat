const translations: Record<string, Record<string, string>> = {
  en: {
    "card.target": "Target",
    "card.current": "Current",
    "card.state": "State",
    "card.hvac_modes": "Mode",
    "card.fan_modes": "Fan",
    "card.swing_modes": "Swing",
    "card.preset_modes": "Preset",
    "card.unavailable": "Unavailable",
    "card.not_found": "Entity not found",
    "card.low": "Low",
    "card.high": "High",
    // HVAC modes
    "mode.off": "Off",
    "mode.heat": "Heat",
    "mode.cool": "Cool",
    "mode.auto": "Auto",
    "mode.dry": "Dry",
    "mode.fan_only": "Fan",
    "mode.heat_cool": "Auto",
    // HVAC actions
    "action.off": "Off",
    "action.heating": "Heating",
    "action.cooling": "Cooling",
    "action.drying": "Drying",
    "action.idle": "Idle",
    "action.fan": "Fan",
    // Editor
    "editor.entity": "Entity",
    "editor.name": "Name (optional)",
    "editor.icon": "Icon (optional)",
    "editor.step_size": "Step size",
    "editor.decimals": "Decimals",
    "editor.popup": "Popup mode",
    "editor.show_header": "Show header",
  },
  es: {
    "card.target": "Objetivo",
    "card.current": "Actual",
    "card.state": "Estado",
    "card.hvac_modes": "Modo",
    "card.fan_modes": "Ventilador",
    "card.swing_modes": "Oscilacion",
    "card.preset_modes": "Preajuste",
    "card.unavailable": "No disponible",
    "card.not_found": "Entidad no encontrada",
    "card.low": "Min",
    "card.high": "Max",
    // HVAC modes
    "mode.off": "Apagado",
    "mode.heat": "Calor",
    "mode.cool": "Frio",
    "mode.auto": "Auto",
    "mode.dry": "Seco",
    "mode.fan_only": "Ventilador",
    "mode.heat_cool": "Auto",
    // HVAC actions
    "action.off": "Apagado",
    "action.heating": "Calentando",
    "action.cooling": "Enfriando",
    "action.drying": "Secando",
    "action.idle": "Inactivo",
    "action.fan": "Ventilando",
    // Editor
    "editor.entity": "Entidad",
    "editor.name": "Nombre (opcional)",
    "editor.icon": "Icono (opcional)",
    "editor.step_size": "Incremento",
    "editor.decimals": "Decimales",
    "editor.popup": "Modo popup",
    "editor.show_header": "Mostrar encabezado",
  },
};

export function localize(key: string, language: string = "en"): string {
  const lang = language.substring(0, 2);
  return translations[lang]?.[key] ?? translations["en"]?.[key] ?? key;
}
