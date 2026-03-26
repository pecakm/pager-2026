import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/utils';

import type { CreateUserInput, CreateUserResult } from './createUser.types';

export async function createUser(input: CreateUserInput): Promise<CreateUserResult> {
  const email = input.email?.trim();
  const password = input.password;

  if (!email || !password) {
    return { success: false, error: 'Email and password are required.', status: 400 };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { success: false, error: 'A user with that email already exists.', status: 409 };
  }

  try {
    const passwordHash = await hashPassword(password);

    await prisma.user.create({
      data: {
        email,
        passwordHash,
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Error during sign-up:', error);
    return {
      success: false,
      error: 'Something went wrong while creating the account.',
      status: 500,
    };
  }
}
