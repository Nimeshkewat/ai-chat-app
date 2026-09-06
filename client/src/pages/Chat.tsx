import Sidebar from "../components/chat/Sidebar";
import ChatHeader from "../components/chat/ChatHeader";
import MessageList from "../components/chat/MessageList";
import ChatInput from "../components/chat/ChatInput";

function Chat() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main chat */}
      <main className="flex min-w-0 flex-1 flex-col">
        <ChatHeader />

        <MessageList />

        <ChatInput />
      </main>
    </div>
  );
}

export default Chat;
