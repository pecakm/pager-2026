import { z } from 'zod';

export const signUpFormValidation = {
  emailRequired: 'validation.emailRequired',
  emailInvalid: 'validation.emailInvalid',
  passwordRequired: 'validation.passwordRequired',
  confirmPasswordRequired: 'validation.confirmPasswordRequired',
  passwordsMismatch: 'validation.passwordsMismatch',
} as const;

export const signUpBaseSchema = z.object({
  email: z
    .string()
    .min(1, signUpFormValidation.emailRequired)
    .email(signUpFormValidation.emailInvalid),
  password: z
    .string()
    .min(1, signUpFormValidation.passwordRequired),
    // TODO: Add password validation
    // .min(8, 'Password must be at least 8 characters.'),
});

export const signUpFormSchema = signUpBaseSchema
  .extend({
    confirmPassword: z
      .string()
      .min(1, signUpFormValidation.confirmPasswordRequired),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: signUpFormValidation.passwordsMismatch,
    path: ['confirmPassword'],
  });

export type SignUpFormValues = z.infer<typeof signUpFormSchema>;
