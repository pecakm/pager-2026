import { z } from 'zod';

export const signUpBaseSchema = z.object({
  email: z
    .string()
    .min(1, 'validation.emailRequired')
    .email('validation.emailInvalid'),
  password: z
    .string()
    .min(1, 'validation.passwordRequired')
    .min(8, 'validation.passwordMinLength'),
});

export const signUpFormSchema = signUpBaseSchema
  .extend({
    confirmPassword: z
      .string()
      .min(1, 'validation.confirmPasswordRequired'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'validation.passwordsMismatch',
    path: ['confirmPassword'],
  });

export type SignUpFormValues = z.infer<typeof signUpFormSchema>;
