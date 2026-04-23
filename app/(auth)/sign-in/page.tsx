import { useTranslations } from 'next-intl';

import { Path } from '@/enums';

import { Container, Title, Footer, FooterLink } from '../auth.styled';

import Form from './form/form';

export default function SignIn() {
  const t = useTranslations('signIn');

  return (
    <Container>
      <Title>{t('title')}</Title>
      <Form />
      <Footer>
        {t('noAccount')} <FooterLink href={Path.SignUp}>{t('signUp')}</FooterLink>
      </Footer>
    </Container>
  );
}
