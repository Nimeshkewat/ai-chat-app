import { useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/chat/Sidebar";
import ChatHeader from "../components/chat/ChatHeader";
import MessageList from "../components/chat/MessageList";
import ChatInput from "../components/chat/ChatInput";
import EmptyChat from "../components/chat/EmptyChat";
import { useGetMessages } from "@/hooks/chat/useGetMessages";
import { Sheet, SheetContent } from "../components/ui/sheet";

function Chat() {
  const { chatId } = useParams();
  const { data, isLoading } = useGetMessages(chatId);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const messages = data?.messages ?? [];

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile sidebar (sheet) */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <Sidebar onNavigate={() => setSidebarOpen(false)} />
        </SheetContent>
      </Sheet>

      <main className="flex min-w-0 flex-1 flex-col">
        <ChatHeader onOpenSidebar={() => setSidebarOpen(true)} />

        {!chatId || (messages.length === 0 && !isLoading) ? (
          <EmptyChat />
        ) : (
          <MessageList messages={messages} isLoading={isLoading} />
        )}

        {chatId && <ChatInput chatId={chatId} />}
      </main>
    </div>
  );
}

export default Chat;
