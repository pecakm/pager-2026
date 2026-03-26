import { useTranslations } from 'next-intl';

import { Input, Button } from '@/components';

import { Container } from './form.styled';

export default function Form() {
  const t = useTranslations('dashboard.form');

  return (
    <Container>
      <Input
        type="email"
        placeholder={t('receiver')}
      />
      <Input
        type="text"
        placeholder={t('message')}
      />
      <Button type="submit">{t('send')}</Button>
    </Container>
  );
}
