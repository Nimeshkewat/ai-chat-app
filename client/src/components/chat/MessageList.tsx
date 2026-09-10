import MessageBubble from "./MessageBubble";
import type { Message } from "@/types/message";

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

function MessageList({ messages, isLoading }: MessageListProps) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8">
      {isLoading && (
        <p className="text-center text-sm text-muted-foreground">Loading...</p>
      )}
      {messages.map((message) => (
        <MessageBubble
          key={message._id}
          role={message.role}
          content={message.content}
        />
      ))}
    </div>
  );
}

export default MessageList;
