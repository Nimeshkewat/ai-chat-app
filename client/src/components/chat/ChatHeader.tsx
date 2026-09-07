import { Button } from "../ui/button";
import { MoreHorizontal, PanelLeft } from "lucide-react";
import { useParams } from "react-router-dom";
import { useGetChats } from "@/hooks/chat/useGetChats";

function ChatHeader({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  const { chatId } = useParams<{ chatId: string }>();
  const { data } = useGetChats();
  const chat = data?.chats.find((c) => c._id === chatId);

  return (
    <header className="flex h-16 items-center justify-between border-b px-4">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onOpenSidebar}
        >
          <PanelLeft className="h-5 w-5" />
        </Button>

        <div>
          <h2 className="font-semibold">{chat?.title ?? "New chat"}</h2>
          <p className="text-xs text-muted-foreground">AI Assistant</p>
        </div>
      </div>

      <Button variant="ghost" size="icon">
        <MoreHorizontal className="h-5 w-5" />
      </Button>
    </header>
  );
}

export default ChatHeader;
