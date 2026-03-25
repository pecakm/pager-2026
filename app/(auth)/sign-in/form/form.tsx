'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Input, Button } from '@/components';
import { signInWithCredentials } from '@/services/client';
import { signInFormSchema, type SignInFormValues } from '@/validations';

import { FormContainer as Container, ErrorMessage } from '../../auth.styled';

export default function Form() {
  const t = useTranslations('signIn.form');
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const mutation = useMutation({
    mutationFn: signInWithCredentials,
    onSuccess: () => {
      router.refresh();
      router.push('/dashboard');
    },
  });

  const onSubmit = (values: SignInFormValues) => {
    mutation.reset();
    mutation.mutate(values);
  };

  const errorMessage = mutation.isError ? t('error') : null;

  const isSubmitting = mutation.isPending;

  const emailRegister = register('email');
  const passwordRegister = register('password');

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="email"
        placeholder={t('email')}
        autoComplete="email"
        id="email"
        name={emailRegister.name}
        onChange={emailRegister.onChange}
        onBlur={emailRegister.onBlur}
        inputRef={emailRegister.ref}
        error={!!errors.email}
        helperText={errors.email?.message ? t(errors.email.message) : undefined}
      />
      <Input
        type="password"
        placeholder={t('password')}
        autoComplete="current-password"
        id="password"
        name={passwordRegister.name}
        onChange={passwordRegister.onChange}
        onBlur={passwordRegister.onBlur}
        inputRef={passwordRegister.ref}
        error={!!errors.password}
        helperText={errors.password?.message ? t(errors.password.message) : undefined}
      />
      <Button type="submit">
        {isSubmitting ? t('submitting') : t('submit')}
      </Button>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Container>
  );
}
