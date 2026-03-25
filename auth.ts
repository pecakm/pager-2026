import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import argon2 from 'argon2';

import { prisma } from '@/lib/prisma';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email =
          typeof credentials.email === 'string' ? credentials.email.trim() : '';
        const password =
          typeof credentials.password === 'string' ? credentials.password : '';

        if (!email || !password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          return null;
        }

        const valid = await argon2.verify(user.passwordHash, password);
        if (!valid) {
          return null;
        }

        return { id: user.id, email: user.email };
      },
    }),
  ],
  callbacks: {
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
      }
      return session;
    },
  },
});
