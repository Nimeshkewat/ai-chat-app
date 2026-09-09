import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { ArrowUp } from "lucide-react";
import { useSendMessage } from "@/hooks/chat/useSendMessage";
import { useUpdateChat } from "@/hooks/chat/useUpdateChat";
import { useCreateNewChat } from "@/hooks/chat/useCreateChat";
import { useQueryClient } from "@tanstack/react-query";
import { useGetChats } from "@/hooks/chat/useGetChats";

function ChatInput({ chatId }: { chatId?: string }) {
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const { mutate: sendMessage, isPending } = useSendMessage();
  const { mutate: updateChatName } = useUpdateChat();
  const { mutate: createNewChat, isPending: isCreating } = useCreateNewChat();
  const queryClient = useQueryClient();

  const { data: chatsData } = useGetChats();
  const currentChat = chatsData?.chats.find((c) => c._id === chatId);

  const sendToChat = (id: string) => {
    sendMessage(
      { chatId: id, content },
      {
        onSuccess: () => {
          setContent("");
          if (currentChat?.title === "New chat" || !currentChat) {
            updateChatName(
              { chatId: id, title: content.slice(0, 12) },
              {
                onSuccess: () => {
                  queryClient.invalidateQueries({ queryKey: ["chats"] });
                },
              },
            );
          }
        },
        onError: (error) => console.log(error.response?.data.message),
      },
    );
  };

  const handleSend = () => {
    if (!content.trim() || isPending || isCreating) return;

    if (!chatId) {
      createNewChat("New chat", {
        onSuccess: (data) => {
          queryClient.invalidateQueries({ queryKey: ["chats"] });
          navigate(`/chat/${data.chat._id}`);
          sendToChat(data.chat._id);
        },
        onError: (error) => console.log(error.response?.data.message),
      });
      return;
    }

    sendToChat(chatId);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t bg-background p-4">
      <div className="mx-auto max-w-3xl">
        <div className="relative rounded-2xl border bg-muted/30 p-2 shadow-sm">
          <Textarea
            value={content}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setContent(e.target.value)
            }
            onKeyDown={handleKeyDown}
            placeholder="Message AI Chat..."
            className="min-h-13 resize-none border-0 bg-transparent pr-12 shadow-none focus-visible:ring-0"
          />

          <Button
            size="icon"
            disabled={isPending || isCreating}
            onClick={handleSend}
            className="absolute bottom-2 right-2 h-9 w-9 rounded-full"
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
        </div>

        <p className="mt-2 text-center text-xs text-muted-foreground">
          AI can make mistakes. Check important information.
        </p>
      </div>
    </div>
  );
}

export default ChatInput;
