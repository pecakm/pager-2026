type MessageWithEmails = {
  createdAt: Date;
  content: string;
  senderId: string;
  sender: { email: string };
  receiver: { email: string };
};

function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

export function formatMessageTimestamp(date: Date): string {
  return `[${pad2(date.getDate())}.${pad2(date.getMonth() + 1)}.${date.getFullYear()} ${pad2(date.getHours())}:${pad2(date.getMinutes())}]`;
}

export function formatMessageLine(message: MessageWithEmails, currentUserId: string): string {
  const ts = formatMessageTimestamp(message.createdAt);
  if (message.senderId === currentUserId) {
    return `${ts} To ${message.receiver.email}: ${message.content}`;
  }
  return `${ts} From ${message.sender.email}: ${message.content}`;
}
