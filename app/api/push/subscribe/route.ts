import { NextResponse } from 'next/server';

import { auth } from '@/auth';
import { savePushSubscription } from '@/services/api';
import { pushSubscriptionBodySchema } from '@/validations';

export async function POST(request: Request) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalidJson' }, { status: 400 });
  }

  const parsed = pushSubscriptionBodySchema.safeParse(body);
  
  if (!parsed.success) {
    return NextResponse.json({ error: 'validation' }, { status: 400 });
  }

  const { endpoint, keys } = parsed.data;

  try {
    await savePushSubscription({
      userId,
      endpoint,
      p256dh: keys.p256dh,
      auth: keys.auth,
    });
  } catch {
    return NextResponse.json({ error: 'database' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
