/**
 * Pager service worker — handles incoming Web Push and notification clicks.
 *
 * Send JSON payloads from your server (e.g. via web-push) with optional fields:
 * - title   — notification title (default: "Pager")
 * - body    — message preview (default: generic new-message text)
 * - url     — path to open on click, e.g. "/dashboard" (default: "/dashboard")
 * - tag     — dedupe/replace notifications with the same tag
 * - icon    — override icon URL (default: /icons/icon-192x192.png)
 * - badge   — badge image URL
 * - renotify — set true to alert again when updating same tag
 */

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', (event) => {
  /** @type {{ title?: string; body?: string; url?: string; tag?: string; icon?: string; badge?: string; renotify?: boolean }} */
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

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const rawUrl = event.notification.data && event.notification.data.url;
  const path = typeof rawUrl === 'string' && rawUrl.startsWith('/') ? rawUrl : '/dashboard';
  const targetUrl = new URL(path, self.location.origin).href;

  event.waitUntil(
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
    })()
  );
});
