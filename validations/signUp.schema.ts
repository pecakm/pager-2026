import { z } from 'zod';

/** Base schema shared between form and API body (email + password only). */
const signUpBaseSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required.')
    .email('Please enter a valid email address.'),
  password: z
    .string()
    .min(1, 'Password is required.'),
    // TODO: Add password validation
    // .min(8, 'Password must be at least 8 characters.'),
});

/** Schema used in the sign‑up form (adds confirmPassword + refinement). */
export const signUpFormSchema = signUpBaseSchema
  .extend({
    confirmPassword: z.string().min(1, 'Please confirm your password.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

export type SignUpFormValues = z.infer<typeof signUpFormSchema>;

/** Schema for API request body (email + password only). */
export const signUpBodySchema = signUpBaseSchema;
