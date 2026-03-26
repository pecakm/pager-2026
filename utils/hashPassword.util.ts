import argon2 from 'argon2';

export async function hashPassword(password: string) {
  return argon2.hash(password, {
    type: argon2.argon2id,
    timeCost: 3,
    memoryCost: 2 ** 16,
    parallelism: 1,
  });
}
