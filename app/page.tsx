import { useTranslations } from 'next-intl';

import { Container, Title } from './page.styled';

export default function Home() {
  const t = useTranslations('home');

  return (
    <Container>
      <Title>{t('title')}</Title>
    </Container>
  );
}
