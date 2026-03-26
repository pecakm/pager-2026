'use client';

import { useEffect, type ReactNode } from 'react';

import { clearAppBadge } from '@/lib/push-notifications';

import { registerServiceWorker } from './registerServiceWorker';

export function ServiceWorkerProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    registerServiceWorker();
    clearAppBadge();
  }, []);

  return <>{children}</>;
}
