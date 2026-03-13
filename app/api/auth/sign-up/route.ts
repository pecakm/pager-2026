import { NextResponse } from 'next/server';

import { createUser } from '@/services/api';
import { signUpBodySchema } from '@/validations';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = signUpBodySchema.safeParse(body);

  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    const message =
      firstIssue?.message ?? 'Invalid request. Check email and password.';
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const result = await createUser(parsed.data);

  if (result.success) {
    return NextResponse.json({ success: true }, { status: 201 });
  }

  return NextResponse.json({ error: result.error }, { status: result.status });
}
