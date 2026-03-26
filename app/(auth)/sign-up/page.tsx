import { useTranslations } from 'next-intl';

import { Container, Title } from '../auth.styled';

import Form from './form/form';

export default function SignUp() {
  const t = useTranslations('signUp');

  return (
    <Container>
      <Title>{t('title')}</Title>
      <Form />
    </Container>
  );
}
