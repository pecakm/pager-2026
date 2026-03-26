import { z } from 'zod';

export const sendMessageFormSchema = z.object({
  receiverEmail: z
    .string()
    .trim()
    .min(1, 'validation.receiverEmailRequired')
    .email('validation.receiverEmailInvalid'),
  message: z
    .string()
    .trim()
    .min(1, 'validation.messageRequired')
    .max(120, 'validation.messageMaxLength'),
});

export type SendMessageFormValues = z.infer<typeof sendMessageFormSchema>;
