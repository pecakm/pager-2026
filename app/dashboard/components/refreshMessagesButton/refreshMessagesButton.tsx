'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { RefreshCcw } from 'lucide-react';

import { clearAppBadge } from '@/lib/push-notifications';

import { RefreshButton } from './refreshMessagesButton.styled';

export default function RefreshMessagesButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    clearAppBadge();
    startTransition(() => router.refresh());
  };

  return (
    <RefreshButton
      type="button"
      onClick={handleClick}
      disabled={isPending}
    >
      <RefreshCcw size={14} />
    </RefreshButton>
  );
}
