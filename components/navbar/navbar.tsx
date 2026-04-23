import { getTranslations } from 'next-intl/server';

import { Path } from '@/enums';
import { LogoutButton } from '@/components';

import type { NavbarProps } from './navbar.types';
import {
  BrandLink,
  BrandIcon,
  Container,
  LoggedInActions,
  NavLink,
  UserEmail,
} from './navbar.styled';

export default async function Navbar({ session }: NavbarProps) {
  const t = await getTranslations('navbar');
  const user = session?.user;

  return (
    <Container>
      <BrandLink href={Path.Home}>
        <BrandIcon src="/icons/bell.svg" alt="" aria-hidden="true" />
        {t('title')}
      </BrandLink>
      {user ? (
        <LoggedInActions>
          <UserEmail>{user.email}</UserEmail>
          <LogoutButton />
        </LoggedInActions>
      ) : (
        <NavLink href={Path.SignIn}>{t('login')}</NavLink>
      )}
    </Container>
  );
}
