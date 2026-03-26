'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Input, Button } from '@/components';
import { sendMessageFormSchema, type SendMessageFormValues } from '@/validations';

import { sendMessageAction } from './form.actions';
import { Container, ErrorMessage } from './form.styled';

export default function Form() {
  const t = useTranslations('dashboard.form');
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SendMessageFormValues>({
    resolver: zodResolver(sendMessageFormSchema),
    defaultValues: {
      receiverEmail: '',
      message: '',
    },
  });

  const mutation = useMutation({
    mutationFn: sendMessageAction,
  });

  const onSubmit = (values: SendMessageFormValues) => {
    mutation.mutate(values, {
      onSuccess: (data) => {
        if (data.success) {
          reset();
          router.refresh();
        }
      },
    });
  };

  const serverError =
    mutation.isSuccess && mutation.data && !mutation.data.success
      ? t(`errors.${mutation.data.error}`)
      : null;

  const isSubmitting = mutation.isPending;

  const receiverRegister = register('receiverEmail');
  const messageRegister = register('message');

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="email"
        placeholder={t('receiver')}
        autoComplete="off"
        id="receiverEmail"
        name={receiverRegister.name}
        onChange={receiverRegister.onChange}
        onBlur={receiverRegister.onBlur}
        inputRef={receiverRegister.ref}
        error={!!errors.receiverEmail}
        helperText={errors.receiverEmail?.message ? t(errors.receiverEmail.message) : undefined}
      />
      <Input
        type="text"
        placeholder={t('message')}
        autoComplete="off"
        id="message"
        name={messageRegister.name}
        onChange={messageRegister.onChange}
        onBlur={messageRegister.onBlur}
        inputRef={messageRegister.ref}
        error={!!errors.message}
        helperText={errors.message?.message ? t(errors.message.message) : undefined}
        maxLength={120}
      />
      <Button type="submit">{isSubmitting ? t('sending') : t('send')}</Button>
      {serverError && <ErrorMessage>{serverError}</ErrorMessage>}
    </Container>
  );
}
