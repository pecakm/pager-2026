import webpush from 'web-push';

import { prisma } from '@/lib/prisma';

let vapidConfigured = false;

function ensureVapidConfigured(): boolean {
  if (vapidConfigured) {
    return true;
  }

  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY?.trim();
  const privateKey = process.env.VAPID_PRIVATE_KEY?.trim();
  const subject = process.env.VAPID_SUBJECT?.trim();

  if (!publicKey || !privateKey || !subject) {
    return false;
  }

  webpush.setVapidDetails(subject, publicKey, privateKey);
  vapidConfigured = true;
  
  return true;
}

const PREVIEW_MAX = 120;

function isWebPushError(err: unknown): err is { statusCode?: number } {
  return typeof err === 'object' && err !== null && 'statusCode' in err;
}

/**
 * Sends a Web Push to every stored subscription for the receiver (best-effort).
 * No-ops when VAPID keys are not configured. Removes subscriptions rejected by the push service (410/404).
 */
export async function notifyReceiverOfNewMessage(params: {
  receiverId: string;
  senderEmail: string;
  messagePreview: string;
  messageId: string;
}): Promise<void> {
  try {
    if (!ensureVapidConfigured()) {
      return;
    }

    const subs = await prisma.pushSubscription.findMany({
      where: { userId: params.receiverId },
    });

    if (subs.length === 0) {
      return;
    }

    const preview =
      params.messagePreview.length > PREVIEW_MAX
        ? `${params.messagePreview.slice(0, PREVIEW_MAX)}…`
        : params.messagePreview;

    const payload = JSON.stringify({
      title: params.senderEmail,
      body: preview,
      url: '/dashboard',
      tag: `message-${params.messageId}`,
    });

    await Promise.all(
      subs.map(async (sub) => {
        const subscription = {
          endpoint: sub.endpoint,
          keys: { p256dh: sub.p256dh, auth: sub.auth },
        };
        try {
          await webpush.sendNotification(subscription, payload);
        } catch (err: unknown) {
          const statusCode = isWebPushError(err) ? err.statusCode : undefined;
          if (statusCode === 404 || statusCode === 410) {
            await prisma.pushSubscription.delete({ where: { id: sub.id } }).catch(() => undefined);
          }
        }
      })
    );
  } catch {
    /* message is already persisted; push is optional */
  }
}
