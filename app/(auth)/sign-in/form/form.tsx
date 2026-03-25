import { useTranslations } from 'next-intl';

import { Input, Button } from '@/components';

import { FormContainer as Container } from '../../auth.styled';

export default function Form() {
  const t = useTranslations('signIn.form');

  return (
    <Container>
      <Input type="email" placeholder={t('email')} />
      <Input type="password" placeholder={t('password')} />
      <Button type="submit">{t('submit')}</Button>
    </Container>
  );
}
