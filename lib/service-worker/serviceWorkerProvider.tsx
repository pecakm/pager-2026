'use client';

import { useEffect, type ReactNode } from 'react';

import { registerServiceWorker } from './registerServiceWorker';

export function ServiceWorkerProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    registerServiceWorker();
  }, []);

  return <>{children}</>;
}
