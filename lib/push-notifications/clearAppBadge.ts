/**
 * Clears the app icon badge (PWA home screen on iOS / supported browsers).
 */
export function clearAppBadge(): void {
  if (
    typeof navigator === 'undefined' ||
    typeof navigator.clearAppBadge !== 'function'
  ) {
    return;
  }

  void navigator.clearAppBadge().catch(() => undefined);
}
