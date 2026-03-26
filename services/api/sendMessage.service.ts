import { prisma } from '@/lib/prisma';
import { notifyReceiverOfNewMessage } from '@/services/api';

import type { SendMessageInput, SendMessageResult } from './sendMessage.types';

export async function sendMessage(input: SendMessageInput): Promise<SendMessageResult> {
  const { senderId, receiverEmail, message } = input;

  const sender = await prisma.user.findUnique({
    where: { id: senderId },
  });

  if (!sender) {
    return { success: false, error: 'unknown' };
  }

  const receiver = await prisma.user.findFirst({
    where: {
      email: { equals: receiverEmail, mode: 'insensitive' },
    },
  });

  if (!receiver) {
    return { success: false, error: 'receiverNotFound' };
  }

  if (receiver.id === sender.id) {
    return { success: false, error: 'selfMessage' };
  }

  let createdMessageId: string;

  try {
    const created = await prisma.message.create({
      data: {
        content: message,
        senderId: sender.id,
        receiverId: receiver.id,
      },
    });
    createdMessageId = created.id;
  } catch {
    return { success: false, error: 'unknown' };
  }

  await notifyReceiverOfNewMessage({
    receiverId: receiver.id,
    senderEmail: sender.email,
    messagePreview: message,
    messageId: createdMessageId,
  });

  return { success: true };
}
