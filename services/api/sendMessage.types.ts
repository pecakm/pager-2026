export type SendMessageInput = {
  senderId: string;
  receiverEmail: string;
  message: string;
};

export type SendMessageErrorCode =
  | 'receiverNotFound'
  | 'selfMessage'
  | 'unknown';

export type SendMessageResult =
  | { success: true }
  | { success: false; error: SendMessageErrorCode };
