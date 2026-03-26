import dayjs from 'dayjs';

type MessageWithEmails = {
  createdAt: Date;
  content: string;
  senderId: string;
  sender: { email: string };
  receiver: { email: string };
};

export function formatMessageLine(message: MessageWithEmails, currentUserId: string): string {
  const date = dayjs(message.createdAt).format('DD.MM.YYYY HH:mm');
  
  if (message.senderId === currentUserId) {
    return `${date} To ${message.receiver.email}: ${message.content}`;
  }
  return `${date} From ${message.sender.email}: ${message.content}`;
}
