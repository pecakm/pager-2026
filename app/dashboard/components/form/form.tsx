'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Send } from 'lucide-react';

import { Input } from '@/components';
import { sendMessageFormSchema, type SendMessageFormValues } from '@/validations';

import { sendMessageAction } from './form.actions';
import { Container, SendButton, ErrorMessage } from './form.styled';

export default function Form() {
  const t = useTranslations('dashboard.form');
  const router = useRouter();
  const {
    control,
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

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="receiverEmail"
        control={control}
        render={({ field }) => (
          <Input
            type="email"
            placeholder={t('receiver')}
            autoComplete="off"
            id="receiverEmail"
            name={field.name}
            value={field.value ?? ''}
            onChange={field.onChange}
            onBlur={field.onBlur}
            inputRef={field.ref}
            error={!!errors.receiverEmail}
            helperText={
              errors.receiverEmail?.message ? t(errors.receiverEmail.message) : undefined
            }
          />
        )}
      />
      <Controller
        name="message"
        control={control}
        render={({ field }) => (
          <Input
            type="text"
            placeholder={t('message')}
            autoComplete="off"
            id="message"
            name={field.name}
            value={field.value ?? ''}
            onChange={field.onChange}
            onBlur={field.onBlur}
            inputRef={field.ref}
            error={!!errors.message}
            helperText={errors.message?.message ? t(errors.message.message) : undefined}
          />
        )}
      />
      <SendButton type="submit">
        <Send size={14} />
        {isSubmitting ? t('sending') : t('send')}
      </SendButton>
      {serverError && <ErrorMessage>{serverError}</ErrorMessage>}
    </Container>
  );
}
