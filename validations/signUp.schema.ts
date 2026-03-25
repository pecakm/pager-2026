import { z } from 'zod';

/**
 * next-intl keys under namespace `signUp.form` (see i18n/en.json).
 * Resolved to user-facing strings in the sign-up form via `t(key)`.
 */
export const signUpFormValidation = {
  emailRequired: 'validation.emailRequired',
  emailInvalid: 'validation.emailInvalid',
  passwordRequired: 'validation.passwordRequired',
  confirmPasswordRequired: 'validation.confirmPasswordRequired',
  passwordsMismatch: 'validation.passwordsMismatch',
} as const;

/** Base schema shared between form and API body (email + password only). */
const signUpBaseSchema = z.object({
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

/** Schema used in the sign‑up form (adds confirmPassword + refinement). */
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

/** Schema for API request body (email + password only). */
export const signUpBodySchema = signUpBaseSchema;
