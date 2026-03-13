import { SignUpInput } from './signUp.types';

export async function signUp({ email, password }: SignUpInput) {
  const response = await fetch('/api/auth/sign-up', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = (await response.json().catch(() => null)) as
    | { error?: string }
    | null;

  if (!response.ok) {
    throw new Error(data?.error ?? 'Unable to sign up.');
  }

  return data;
}
