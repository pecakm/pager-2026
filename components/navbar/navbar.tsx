import { getTranslations } from 'next-intl/server';

import { Button } from '@/components';

import { logoutAction } from './navbar.actions';
import type { NavbarProps } from './navbar.types';
import { Container, Title } from './navbar.styled';

export default async function Navbar({ session }: NavbarProps) {
  const t = await getTranslations('navbar');
  const isLoggedIn = Boolean(session?.user);

  return (
    <Container>
      <Title>{t('title')}</Title>
      {isLoggedIn && (
        <Button onClick={logoutAction}>{t('logout')}</Button>
      )}
    </Container>
  );
}
