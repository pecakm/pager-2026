import type { Session } from 'next-auth';

export interface NavbarProps {
  session: Session | null;
}
