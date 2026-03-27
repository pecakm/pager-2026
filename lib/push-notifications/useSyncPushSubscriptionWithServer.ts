'use client';

import { useEffect } from 'react';

import { syncPushSubscriptionWithServerIfNeeded } from './syncPushSubscriptionWithServerIfNeeded';

/** Keeps the server copy of this browser’s push subscription in sync with the session. */
export function useSyncPushSubscriptionWithServer(): void {
  useEffect(() => {
    void syncPushSubscriptionWithServerIfNeeded();
  }, []);
}
