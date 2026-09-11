import { useGetProfile } from "@/hooks/auth/useGetProfile";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface MessageBubbleProps {
  role: "user" | "assistant";
  content: string;
}

function MessageBubble({ role, content }: MessageBubbleProps) {
  const { data } = useGetProfile();
  const isUser = role === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <Avatar className="mt-1 h-8 w-8 shrink-0">
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      )}

      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-6 ${
          isUser
            ? "rounded-br-md bg-primary text-primary-foreground"
            : "rounded-bl-md bg-muted"
        }`}
      >
        {content}
      </div>

      {isUser && (
        <Avatar className="mt-1 h-8 w-8 shrink-0">
          <AvatarImage src={data?.user.profilePhoto} />
          <AvatarFallback>
            {data?.user.username[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}

export default MessageBubble;
