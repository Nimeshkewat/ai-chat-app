import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import {
  MessageSquare,
  Plus,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateNewChat } from "@/hooks/chat/useCreateChat";
import { useGetChats } from "@/hooks/chat/useGetChats";
import { useDeleteChat } from "@/hooks/chat/useDeleteChat";
import { useUpdateChat } from "@/hooks/chat/useUpdateChat";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState } from "react";
import UserMenu from "./UserMenu";
import ThemeToggle from "../ThemeToggle";
import Loader from "../ui/Loader";

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const { mutate: createNewChat, isPending: isNewChatCreating } =
    useCreateNewChat();
  const { data, isLoading } = useGetChats();
  const { mutate: deleteChat } = useDeleteChat();
  const { mutate: updateChat } = useUpdateChat();

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { chatId } = useParams<{ chatId: string }>();

  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");

  const chats = data?.chats ?? [];

  const handleCreateNewChat = () => {
    createNewChat("New chat", {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["chats"] });
        navigate(`/chat/${data.chat._id}`);
        onNavigate?.();
      },
      onError: (error) => {
        console.log(error.response?.data.message);
      },
    });
  };

  const handleDeleteChat = (id: string) => {
    deleteChat(id, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["chats"] });
        if (chatId === id) navigate("/chat");
      },
    });
  };

  const startRename = (id: string, currentTitle: string) => {
    setRenamingId(id);
    setRenameValue(currentTitle);
  };

  const submitRename = (id: string) => {
    const trimmed = renameValue.trim();
    if (trimmed) {
      updateChat(
        { chatId: id, title: trimmed },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["chats"] });
          },
        },
      );
    }
    setRenamingId(null);
  };

  return (
    <aside className="flex h-screen p-1 w-72 flex-col border-r bg-muted/30">
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4">
        <h1 className="text-xl font-bold">AI Chat</h1>
      </div>

      {/* New Chat */}
      <div className="px-3 pb-3">
        <Button
          disabled={isNewChatCreating}
          onClick={handleCreateNewChat}
          className="w-full justify-start gap-2"
        >
          <Plus className="h-4 w-4" />
          {isNewChatCreating ? (
            <>
              <Loader /> Creating...{" "}
            </>
          ) : (
            "New chat"
          )}
        </Button>
      </div>

      <Separator />

      {/* Chats */}
      <ScrollArea className="flex-1 px-3 py-2">
        <p className="px-3 text-sm text-muted-foreground">Recents</p>
        <div className="space-y-1">
          {isLoading && <Loader size={25} />}

          {!isLoading && chats.length === 0 && (
            <p className="px-2 text-xs text-muted-foreground">No chats yet</p>
          )}

          {chats.map((chat) => (
            <div
              key={chat._id}
              className={`group flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-accent ${
                chatId === chat._id ? "bg-accent" : ""
              }`}
            >
              <MessageSquare className="h-4 w-4 shrink-0 text-muted-foreground" />

              {renamingId === chat._id ? (
                <Input
                  autoFocus
                  value={renameValue}
                  onChange={(e) => setRenameValue(e.target.value)}
                  onBlur={() => submitRename(chat._id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") submitRename(chat._id);
                    if (e.key === "Escape") setRenamingId(null);
                  }}
                  className="h-7 flex-1"
                />
              ) : (
                <button
                  onClick={() => {
                    navigate(`/chat/${chat._id}`);
                    onNavigate?.();
                  }}
                  className="flex-1 truncate text-left"
                >
                  {chat.title}
                </button>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-36">
                  <DropdownMenuItem
                    onClick={() => startRename(chat._id, chat.title)}
                  >
                    <Pencil className="mr-2 h-4 w-4" />
                    Rename
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDeleteChat(chat._id)}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </ScrollArea>

      <Separator />

      {/* User */}
      <UserMenu />
    </aside>
  );
}

export default Sidebar;
