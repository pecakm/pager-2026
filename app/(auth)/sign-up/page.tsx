import { useTranslations } from 'next-intl';

import { Path } from '@/enums';

import { Container, Title, Footer, FooterLink } from '../auth.styled';

import Form from './form/form';

export default function SignUp() {
  const t = useTranslations('signUp');

  return (
    <Container>
      <Title>{t('title')}</Title>
      <Form />
      <Footer>
        {t('haveAccount')} <FooterLink href={Path.SignIn}>{t('signIn')}</FooterLink>
      </Footer>
    </Container>
  );
}
