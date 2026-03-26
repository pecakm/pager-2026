import { useTranslations } from 'next-intl';

import { Form } from './components';
import { Container, Title } from './page.styled';

export default function Dashboard() {
  const t = useTranslations('dashboard');

  return (
    <Container>
      <Title>{t('title')}</Title>
      <Form />
    </Container>
  );
}
