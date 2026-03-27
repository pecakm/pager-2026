import { getTranslations } from 'next-intl/server';

import { auth } from '@/auth';
import { getMessagesForUser } from '@/services/api';

import { EnablePushButton, Form, RefreshMessagesButton } from './components';
import { formatMessageLine } from './page.utils';
import { Container, Title, Messages, MessageItem } from './page.styled';

export default async function Dashboard() {
  const t = await getTranslations('dashboard');
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return null;
  }

  const messages = await getMessagesForUser(userId);

  return (
    <Container>
      <Title>{t('title')}</Title>
      <EnablePushButton />
      <Form />
      <RefreshMessagesButton />
      <Messages>
        {messages.map((message) => (
          <MessageItem key={message.id}>{formatMessageLine(message, userId, t)}</MessageItem>
        ))}
      </Messages>
    </Container>
  );
}
