import { prisma } from '@/lib/prisma';

/** Deletes the push row for this user only if `endpoint` matches (one browser/device). */
export async function deletePushSubscriptionForDevice(userId: string, endpoint: string) {
  return prisma.pushSubscription.deleteMany({
    where: { userId, endpoint },
  });
}
