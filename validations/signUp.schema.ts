import { z } from 'zod';

export const signUpBaseSchema = z.object({
  email: z
    .string()
    .min(1, 'validation.emailRequired')
    .email('validation.emailInvalid'),
  password: z
    .string()
    .min(1, 'validation.passwordRequired'),
    // TODO: Add password validation
    // .min(8, 'Password must be at least 8 characters.'),
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
