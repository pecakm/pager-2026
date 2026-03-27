'use client';

import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import {
  getExistingPushSubscription,
  subscribeToPush,
  useSyncPushSubscriptionWithServer,
} from '@/lib/push-notifications';
import { Button } from '@/components';

import type { UiState } from './enablePushButton.types';
import { ErrorMessage, BlockedText } from './enablePushButton.styled';

export default function EnablePushButton() {
  useSyncPushSubscriptionWithServer();

  const t = useTranslations('enablePushButton');
  const [ui, setUi] = useState<UiState>('loading');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const vapid = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY?.trim();

    if (!vapid) {
      setUi('noKey');
      return;
    }

    if (typeof window === 'undefined' || !('serviceWorker' in navigator) || !('PushManager' in window)) {
      setUi('ready');
      return;
    }

    if (Notification.permission === 'denied') {
      setUi('denied');
      return;
    }

    void (async () => {
      const sub = await getExistingPushSubscription();
      setUi(sub ? 'subscribed' : 'ready');
    })();
  }, []);

  const onEnable = useCallback(async () => {
    setError(null);
    setBusy(true);

    try {
      const result = await subscribeToPush();

      if (result.ok) {
        setUi('subscribed');
        return;
      }

      if (result.code === 'permissionDenied') {
        setUi('denied');
        return;
      }

      if (result.code === 'unsupported') {
        setError(t('unsupported'));
        return;
      }

      if (result.code === 'missingVapidKey') {
        setUi('noKey');
        return;
      }

      setError(t('error'));
    } finally {
      setBusy(false);
    }
  }, [t]);

  if (ui === 'noKey' || ui === 'loading') {
    return null;
  }

  if (ui === 'denied') {
    return (
      <BlockedText>{t('blocked')}</BlockedText>
    );
  }

  if (ui === 'subscribed') {
    return null;
  }

  return (
    <>
      <Button onClick={onEnable} disabled={busy}>
        {busy ? t('enabling') : t('enable')}
      </Button>
      {error ? (
        <ErrorMessage>
          {error}
        </ErrorMessage>
      ) : null}
    </>
  );
}
