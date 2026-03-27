import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { Path } from '@/enums';
import { LogoutButton } from '@/components';

import type { NavbarProps } from './navbar.types';
import { Container, LoggedInActions, Title, UserEmail } from './navbar.styled';

export default async function Navbar({ session }: NavbarProps) {
  const t = await getTranslations('navbar');
  const user = session?.user;

  return (
    <Container>
      <Link href={Path.Home}>
        <Title>{t('title')}</Title>
      </Link>
      {user ? (
        <LoggedInActions>
          <UserEmail>{user.email}</UserEmail>
          <LogoutButton />
        </LoggedInActions>
      ) : (
        <Link href={Path.SignIn}>
          {t('login')}
        </Link>
      )}
    </Container>
  );
}
