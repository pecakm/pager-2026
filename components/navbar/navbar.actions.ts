'use server';

import { signOut } from '@/auth';
import { Path } from '@/enums';

export async function logoutAction() {
  await signOut({ redirectTo: Path.SignIn });
}
