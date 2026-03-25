import { z } from 'zod';

export const signInFormValidation = {
  emailRequired: 'validation.emailRequired',
  emailInvalid: 'validation.emailInvalid',
  passwordRequired: 'validation.passwordRequired',
} as const;

export const signInFormSchema = z.object({
  email: z
    .string()
    .min(1, signInFormValidation.emailRequired)
    .email(signInFormValidation.emailInvalid),
  password: z.string().min(1, signInFormValidation.passwordRequired),
});

export type SignInFormValues = z.infer<typeof signInFormSchema>;
