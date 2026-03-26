import { z } from 'zod';

export const sendMessageFormValidation = {
  receiverEmailRequired: 'validation.receiverEmailRequired',
  receiverEmailInvalid: 'validation.receiverEmailInvalid',
  messageRequired: 'validation.messageRequired',
  messageMaxLength: 'validation.messageMaxLength',
} as const;

export const sendMessageFormSchema = z.object({
  receiverEmail: z
    .string()
    .trim()
    .min(1, sendMessageFormValidation.receiverEmailRequired)
    .email(sendMessageFormValidation.receiverEmailInvalid),
  message: z
    .string()
    .trim()
    .min(1, sendMessageFormValidation.messageRequired)
    .max(120, sendMessageFormValidation.messageMaxLength),
});

export type SendMessageFormValues = z.infer<typeof sendMessageFormSchema>;
