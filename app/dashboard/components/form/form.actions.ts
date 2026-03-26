'use server';

import { revalidatePath } from 'next/cache';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { sendMessageFormSchema } from '@/validations';

export type SendMessageErrorCode =
  | 'receiverNotFound'
  | 'selfMessage'
  | 'unauthenticated'
  | 'unknown';

export type SendMessageResult =
  | { success: true }
  | { success: false; error: SendMessageErrorCode };

export async function sendMessageAction(input: unknown): Promise<SendMessageResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: 'unauthenticated' };
  }

  const parsed = sendMessageFormSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: 'unknown' };
  }

  const { receiverEmail, message } = parsed.data;

  const sender = await prisma.user.findUnique({
    where: { id: session.user.id },
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

  try {
    await prisma.message.create({
      data: {
        content: message,
        senderId: sender.id,
        receiverId: receiver.id,
      },
    });
  } catch {
    return { success: false, error: 'unknown' };
  }

  revalidatePath('/dashboard');
  return { success: true };
}
