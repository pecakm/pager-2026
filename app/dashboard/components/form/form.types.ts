import type { SendMessageErrorCode as SendMessageServiceErrorCode } from '@/services/api/sendMessage.types';

type SendMessageErrorCode = SendMessageServiceErrorCode | 'unauthenticated';

export type SendMessageResult =
  | { success: true }
  | { success: false; error: SendMessageErrorCode };
