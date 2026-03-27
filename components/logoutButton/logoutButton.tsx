'use client';

import { useTranslations } from 'next-intl';

import { getExistingPushSubscription, unsubscribePushInBrowser } from '@/lib/push-notifications';
import { Button } from '@/components';

import { logoutAction } from './logoutButton.actions';

export default function LogoutButton() {
  const t = useTranslations('logoutButton');

  const handleClick = async () => {
    const sub = await getExistingPushSubscription();
    const endpoint = sub?.endpoint;
    await logoutAction(endpoint);
    await unsubscribePushInBrowser();
  };

  return (
    <Button onClick={handleClick}>{t('logout')}</Button>
  );
}
