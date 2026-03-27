import { getExistingPushSubscription } from './getExistingPushSubscription';

/**
 * When the browser already has a push subscription and notification permission is granted,
 * ensures the subscription is stored for the current session (cookie). No-op if unsupported,
 * denied, or not subscribed in this browser.
 */
export async function syncPushSubscriptionWithServerIfNeeded(): Promise<void> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator) || !('PushManager' in window)) {
    return;
  }

  if (Notification.permission !== 'granted') {
    return;
  }

  const subscription = await getExistingPushSubscription();

  if (!subscription) {
    return;
  }

  const json = subscription.toJSON();

  await fetch('/api/push/sync', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(json),
  }).catch(() => undefined);
}
