import { z } from 'zod';

export const signInFormSchema = z.object({
  email: z
    .string()
    .min(1, 'validation.emailRequired')
    .email('validation.emailInvalid'),
  password: z.string().min(1, 'validation.passwordRequired'),
});

export type SignInFormValues = z.infer<typeof signInFormSchema>;
