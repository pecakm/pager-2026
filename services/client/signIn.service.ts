import { signIn } from 'next-auth/react';

import { SignInCredentials } from './signIn.types';

export async function signInWithCredentials({ email, password }: SignInCredentials): Promise<void> {
  const result = await signIn('credentials', {
    email: email.trim(),
    password,
    redirect: false,
  });

  if (result?.error || !result?.ok) {
    throw new Error('CredentialsSignin');
  }
}
