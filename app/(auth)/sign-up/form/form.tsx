'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Input, Button } from '@/components';
import { signUpFormSchema, type SignUpFormValues } from '@/validations';

import { FormContainer as Container } from '../../auth.styled';

export default function Form() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onSubmit = async ({ email, password }: SignUpFormValues) => {
    setError(null);
    setSuccess(null);

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
    } catch {
      setError('Unable to sign up right now.');
    } finally {
      reset();
    }
  };

  const emailRegister = register('email');
  const passwordRegister = register('password');
  const confirmPasswordRegister = register('confirmPassword');

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="email"
        placeholder="Email"
        autoComplete="email"
        id="email"
        name={emailRegister.name}
        onChange={emailRegister.onChange}
        onBlur={emailRegister.onBlur}
        inputRef={emailRegister.ref}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <Input
        type="password"
        placeholder="Password"
        autoComplete="new-password"
        id="password"
        name={passwordRegister.name}
        onChange={passwordRegister.onChange}
        onBlur={passwordRegister.onBlur}
        inputRef={passwordRegister.ref}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <Input
        type="password"
        placeholder="Confirm Password"
        autoComplete="new-password"
        id="confirmPassword"
        name={confirmPasswordRegister.name}
        onChange={confirmPasswordRegister.onChange}
        onBlur={confirmPasswordRegister.onBlur}
        inputRef={confirmPasswordRegister.ref}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
      />
      <Button type="submit">
        {isSubmitting ? 'Signing Up...' : 'Sign Up'}
      </Button>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
    </Container>
  );
}
