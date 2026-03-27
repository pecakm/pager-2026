import { prisma } from '@/lib/prisma';

import { savePushSubscription } from './savePushSubscription.service';

/**
 * If this user already has this endpoint with the same keys, no-op.
 * Otherwise upserts (e.g. new browser, keys rotated, or endpoint reassigned after login).
 */
export async function syncPushSubscriptionIfNeeded(input: {
  userId: string;
  endpoint: string;
  p256dh: string;
  auth: string;
}): Promise<{ alreadyRegistered: boolean }> {
  const existing = await prisma.pushSubscription.findFirst({
    where: { userId: input.userId, endpoint: input.endpoint },
  });

  if (
    existing &&
    existing.p256dh === input.p256dh &&
    existing.auth === input.auth
  ) {
    return { alreadyRegistered: true };
  }

  await savePushSubscription(input);
  return { alreadyRegistered: false };
}
