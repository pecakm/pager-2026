'use server';

import { auth, signOut } from '@/auth';
import { deletePushSubscriptionForDevice } from '@/services/api';
import { Path } from '@/enums';

/** Pass the current tab's push `endpoint` (if any) to remove only this device's subscription. */
export async function logoutAction(pushEndpoint?: string | null) {
  const session = await auth();
  const userId = session?.user?.id;
  const endpoint = pushEndpoint?.trim();

  if (userId && endpoint) {
    try {
      await deletePushSubscriptionForDevice(userId, endpoint);
    } catch {
      // Sign-out should proceed even if DB cleanup fails
    }
  }

  await signOut({ redirectTo: Path.SignIn });
}
