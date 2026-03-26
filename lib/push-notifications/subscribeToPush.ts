import { urlBase64ToUint8Array } from './subscribeToPush.utils';
import type { SubscribeToPushResult } from './subscribeToPush.types';

/**
 * Subscribes this browser to Web Push (after user consent) and POSTs the subscription to the server.
 */
export async function subscribeToPush(): Promise<SubscribeToPushResult> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator) || !('PushManager' in window)) {
    return { ok: false, code: 'unsupported' };
  }

  const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

  if (!vapidPublicKey?.trim()) {
    return { ok: false, code: 'missingVapidKey' };
  }

  if (Notification.permission === 'denied') {
    return { ok: false, code: 'permissionDenied' };
  }

  const registration = await navigator.serviceWorker.ready;
  const applicationServerKey = urlBase64ToUint8Array(vapidPublicKey.trim());

  let subscription: PushSubscription;
  
  try {
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : undefined;
    return { ok: false, code: 'subscribeFailed', message };
  }

  const json = subscription.toJSON();
  const res = await fetch('/api/push/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(json),
  });

  if (!res.ok) {
    await subscription.unsubscribe().catch(() => undefined);
    return { ok: false, code: 'persistFailed' };
  }

  return { ok: true };
}
