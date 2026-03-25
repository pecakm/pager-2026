import { useTranslations } from 'next-intl';

import { Container, Title } from '../auth.styled';

import Form from './form/form';

export default function SignIn() {
  const t = useTranslations('signIn');

  return (
    <Container>
      <Title>{t('title')}</Title>
      <Form />
    </Container>
  );
}
