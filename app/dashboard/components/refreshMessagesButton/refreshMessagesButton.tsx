'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { Button } from '@/components';
import { clearAppBadge } from '@/lib/push-notifications';

export default function RefreshMessagesButton() {
  const t = useTranslations('dashboard.refreshMessagesButton');
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    clearAppBadge();
    startTransition(() => router.refresh());
  };

  return (
    <Button
      type="button"
      onClick={handleClick}
      disabled={isPending}
    >
      {isPending ? t('refreshingMessages') : t('refreshMessages')}
    </Button>
  );
}
