'use client';

import type { FormEvent } from 'react';
import { useState } from 'react';

import { Input, Button } from '@/components';

import { FormContainer as Container } from '../../auth.styled';

export default function Form() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setSubmitting(true);

    try {
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
        setError(data?.error ?? 'Unable to sign up.');
        return;
      }

      setSuccess('Account created. You can now sign in.');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch {
      setError('Unable to sign up right now.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container onSubmit={handleSubmit}>
      <Input
        type="email"
        name="email"
        placeholder="Email"
        autoComplete="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        autoComplete="new-password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />
      <Input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        autoComplete="new-password"
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
        required
      />
      <Button type="submit">
        {submitting ? 'Signing Up...' : 'Sign Up'}
      </Button>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
    </Container>
  );
}
