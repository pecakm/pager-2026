import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { Button } from '@/components';
import { Path } from '@/enums';

import { logoutAction } from './navbar.actions';
import type { NavbarProps } from './navbar.types';
import { Container, Title } from './navbar.styled';

export default async function Navbar({ session }: NavbarProps) {
  const t = await getTranslations('navbar');
  const isLoggedIn = Boolean(session?.user);

  return (
    <Container>
      <Link href={Path.Home}>
        <Title>{t('title')}</Title>
      </Link>
      {isLoggedIn ? (
        <Button onClick={logoutAction}>{t('logout')}</Button>
      ) : (
        <Link href={Path.SignIn}>
          {t('login')}
        </Link>
      )}
    </Container>
  );
}
