import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Path } from '@/enums';

import { Container, Title } from '../auth.styled';

import Form from './form/form';

export default function SignIn() {
  const t = useTranslations('signIn');

  return (
    <Container>
      <Title>{t('title')}</Title>
      <Form />
      {t('noAccount')} <Link href={Path.SignUp}>{t('signUp')}</Link>
    </Container>
  );
}
