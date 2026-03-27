'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { Button } from '@/components';

export default function RefreshMessagesButton() {
  const t = useTranslations('dashboard.refreshMessagesButton');
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      type="button"
      onClick={() => startTransition(() => router.refresh())}
      disabled={isPending}
    >
      {isPending ? t('refreshingMessages') : t('refreshMessages')}
    </Button>
  );
}
