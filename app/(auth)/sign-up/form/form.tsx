'use client';

import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Input, Button } from '@/components';
import { signUp } from '@/services/client';
import { signUpFormSchema, type SignUpFormValues } from '@/validations';

import { FormContainer as Container, ErrorMessage, SuccessMessage } from '../../auth.styled';

export default function Form() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: () => reset(),
  });

  const onSubmit = (values: SignUpFormValues) => {
    mutation.reset();
    mutation.mutate(values);
  };

  const errorMessage =
    mutation.error instanceof Error
      ? mutation.error.message
      : mutation.isError
        ? 'Unable to sign up right now.'
        : null;
  const isSubmitting = mutation.isPending;

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
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      {mutation.isSuccess && (
        <SuccessMessage>Account created. You can now sign in.</SuccessMessage>
      )}
    </Container>
  );
}
