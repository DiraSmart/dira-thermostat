export function fireEvent(
  node: HTMLElement,
  type: string,
  detail?: any,
  options?: { bubbles?: boolean; composed?: boolean; cancelable?: boolean }
): void {
  const event = new CustomEvent(type, {
    bubbles: options?.bubbles ?? true,
    composed: options?.composed ?? true,
    cancelable: options?.cancelable ?? false,
    detail,
  });
  node.dispatchEvent(event);
}

export function forwardHaptic(node: HTMLElement, hapticType: string = "light"): void {
  fireEvent(node, "haptic", hapticType);
}

export function openMoreInfo(node: HTMLElement, entityId: string): void {
  fireEvent(node, "hass-more-info", { entityId });
}
