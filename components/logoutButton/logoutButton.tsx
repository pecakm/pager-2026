'use client';

import { LogOut } from 'lucide-react';

import { getExistingPushSubscription, unsubscribePushInBrowser } from '@/lib/push-notifications';
import { Button } from '@/components';

import { logoutAction } from './logoutButton.actions';

export default function LogoutButton() {


  const handleClick = async () => {
    const sub = await getExistingPushSubscription();
    const endpoint = sub?.endpoint;
    await logoutAction(endpoint);
    await unsubscribePushInBrowser();
  };

  return (
    <Button onClick={handleClick}>
      <LogOut size={20} />
    </Button>
  );
}
