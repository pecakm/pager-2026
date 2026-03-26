import { getTranslations } from 'next-intl/server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

import { Form } from './components';
import { formatMessageLine } from './page.utils';
import { Container, Title, Messages, MessageItem } from './page.styled';

export default async function Dashboard() {
  const t = await getTranslations('dashboard');
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return null;
  }

  const messages = await prisma.message.findMany({
    where: {
      OR: [{ senderId: userId }, { receiverId: userId }],
    },
    orderBy: { createdAt: 'desc' },
    include: {
      sender: { select: { email: true } },
      receiver: { select: { email: true } },
    },
  });

  return (
    <Container>
      <Title>{t('title')}</Title>
      <Form />
      <Messages>
        {messages.map((m) => (
          <MessageItem key={m.id}>{formatMessageLine(m, userId)}</MessageItem>
        ))}
      </Messages>
    </Container>
  );
}
