import Loader from "../ui/Loader";
import { ScrollArea } from "../ui/scroll-area";
import MessageBubble from "./MessageBubble";
import type { Message } from "@/types/message";

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

function MessageList({ messages, isLoading }: MessageListProps) {
  return (
    <ScrollArea className="flex-1">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8">
        {isLoading && <Loader size={20} />}
        {messages.map((message) => (
          <MessageBubble
            key={message._id}
            role={message.role}
            content={message.content}
          />
        ))}
      </div>
    </ScrollArea>
  );
}

export default MessageList;
