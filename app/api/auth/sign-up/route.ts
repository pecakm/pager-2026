import { NextResponse } from 'next/server';

import { createUser } from '@/services/api';

export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string; password?: string };
  const result = await createUser({
    email: body.email ?? '',
    password: body.password ?? '',
  });

  if (result.success) {
    return NextResponse.json({ success: true }, { status: 201 });
  }

  return NextResponse.json({ error: result.error }, { status: result.status });
}
