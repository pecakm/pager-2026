import dayjs from 'dayjs';

import type { MessageWithEmails } from '@/services/api/getMessagesForUser.service';

import type { DashboardTranslator } from './page.types';

export function formatMessageLine(message: MessageWithEmails, currentUserId: string, t: DashboardTranslator): string {
  const date = dayjs(message.createdAt).format('DD.MM.YYYY HH:mm');

  if (message.senderId === currentUserId) {
    return t('messageLine.sent', { date, email: message.receiver.email, content: message.content });
  }

  return t('messageLine.received', { date, email: message.sender.email, content: message.content });
}
