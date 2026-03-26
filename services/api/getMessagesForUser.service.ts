import { prisma } from '@/lib/prisma';

export async function getMessagesForUser(userId: string) {
  return prisma.message.findMany({
    where: {
      OR: [{ senderId: userId }, { receiverId: userId }],
    },
    orderBy: { createdAt: 'desc' },
    include: {
      sender: { select: { email: true } },
      receiver: { select: { email: true } },
    },
  });
}

export type MessageWithEmails = Awaited<ReturnType<typeof getMessagesForUser>>[number];
