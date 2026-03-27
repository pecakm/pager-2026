/**
 * Removes the browser's Web Push subscription for this origin (if any).
 * Safe to call when push is unsupported or the user was never subscribed.
 */
export async function unsubscribePushInBrowser(): Promise<void> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator) || !('PushManager' in window)) {
    return;
  }

  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.getSubscription();

  if (subscription) {
    await subscription.unsubscribe().catch(() => undefined);
  }
}
