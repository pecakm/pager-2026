'use server';

import { revalidatePath } from 'next/cache';

import { auth } from '@/auth';
import { sendMessage } from '@/services/api';
import { sendMessageFormSchema } from '@/validations';

import type { SendMessageResult } from './form.types';

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

  const result = await sendMessage({
    senderId: session.user.id,
    receiverEmail,
    message,
  });

  if (!result.success) {
    return result;
  }

  revalidatePath('/dashboard');
  return { success: true };
}
