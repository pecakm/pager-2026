/**
 * Pager service worker — handles incoming Web Push and notification clicks.
 *
 * Send JSON payloads from your server (e.g. via web-push) with optional fields:
 * - title   — notification title (default: "Pager")
 * - body    — message preview (default: generic new-message text)
 * - url     — path to open on click, e.g. "/dashboard" (default: "/dashboard")
 * - tag     — dedupe/replace notifications with the same tag
 * - icon    — override icon URL (default: /icons/icon-192x192.png)
 * - badge   — badge image URL (small monochrome icon in notification UI)
 * - badgeCount — home-screen icon badge number (e.g. 1 = new message; Badging API; iOS PWA 16.4+)
 * - renotify — set true to alert again when updating same tag
 *
 * Badging: In a service worker, use navigator.setAppBadge (WorkerNavigator), not only
 * registration.setAppBadge — Safari/iOS implement the spec path and may omit the latter.
 */

function swSetAppBadge(contents) {
  if (typeof self.navigator !== 'undefined' && typeof self.navigator.setAppBadge === 'function') {
    return self.navigator.setAppBadge(contents);
  }
  if (typeof self.registration.setAppBadge === 'function') {
    return self.registration.setAppBadge(contents);
  }
  return Promise.resolve();
}

function swClearAppBadge() {
  if (typeof self.navigator !== 'undefined' && typeof self.navigator.clearAppBadge === 'function') {
    return self.navigator.clearAppBadge();
  }
  if (typeof self.registration.clearAppBadge === 'function') {
    return self.registration.clearAppBadge();
  }
  return Promise.resolve();
}

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', (event) => {
  /** @type {{ title?: string; body?: string; url?: string; tag?: string; icon?: string; badge?: string; badgeCount?: number; renotify?: boolean }} */
  let payload = {};

  if (event.data) {
    try {
      payload = event.data.json();
    } catch {
      const text = event.data.text();
      payload = text ? { body: text } : {};
    }
  }

  const title = payload.title || 'Pager';
  const url = payload.url || '/dashboard';

  const options = {
    body: payload.body || 'You have a new message.',
    icon: payload.icon || '/icons/icon-192x192.png',
    badge: payload.badge || '/icons/icon-192x192.png',
    tag: payload.tag || 'pager-message',
    data: { url },
    renotify: Boolean(payload.renotify),
  };

  const show = self.registration.showNotification(title, options);

  const rawBadge = payload.badgeCount;
  const badgeCount =
    typeof rawBadge === 'number' && Number.isFinite(rawBadge) && rawBadge >= 0
      ? Math.min(Math.floor(rawBadge), 99)
      : null;

  const setBadge =
    badgeCount !== null ? swSetAppBadge(badgeCount) : Promise.resolve();

  event.waitUntil(
    Promise.all([show, setBadge]).catch(() => undefined)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const rawUrl = event.notification.data && event.notification.data.url;
  const path = typeof rawUrl === 'string' && rawUrl.startsWith('/') ? rawUrl : '/dashboard';
  const targetUrl = new URL(path, self.location.origin).href;

  const clearBadge = swClearAppBadge().catch(() => undefined);

  event.waitUntil(
    Promise.all([
      clearBadge,
      (async () => {
        const windowClients = await self.clients.matchAll({
          type: 'window',
          includeUncontrolled: true,
        });

        for (const client of windowClients) {
          if (client.url === targetUrl && 'focus' in client) {
            return client.focus();
          }
        }

        for (const client of windowClients) {
          try {
            const clientOrigin = new URL(client.url).origin;
            if (clientOrigin === self.location.origin && 'navigate' in client) {
              await client.navigate(targetUrl);
              return client.focus();
            }
          } catch {
            /* ignore invalid client.url */
          }
        }

        if (self.clients.openWindow) {
          return self.clients.openWindow(targetUrl);
        }
      })(),
    ])
  );
});
