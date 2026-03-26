import { getTranslations } from 'next-intl/server';

export type MessageWithEmails = {
  createdAt: Date;
  content: string;
  senderId: string;
  sender: { email: string };
  receiver: { email: string };
};

export type DashboardTranslator = Awaited<ReturnType<typeof getTranslations<'dashboard'>>>;
