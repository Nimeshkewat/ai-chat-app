import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import {
  MessageSquare,
  Plus,
  MoreHorizontal,
  Settings,
  LogOut,
} from "lucide-react";
import { useLogout } from "@/hooks/auth/useLogout";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const chats = [
  { id: 1, title: "Learning React", time: "Today" },
  { id: 2, title: "MongoDB aggregation", time: "Today" },
  { id: 3, title: "Build a portfolio", time: "Yesterday" },
  { id: 4, title: "Docker basics", time: "Yesterday" },
  { id: 5, title: "Git commands", time: "Previous 7 days" },
];

function Sidebar() {
  const { mutate: logout, isPending } = useLogout();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: async (data) => {
        console.log(data);
        await queryClient.invalidateQueries();
        navigate("/");
      },
    });
  };

  return (
    <aside className="flex h-screen w-72 flex-col border-r bg-muted/30">
      {/* Logo */}
      <div className="flex h-16 items-center px-4">
        <h1 className="text-xl font-bold">AI Chat</h1>
      </div>

      {/* New Chat */}
      <div className="px-3 pb-3">
        <Button className="w-full justify-start gap-2">
          <Plus className="h-4 w-4" />
          New chat
        </Button>
      </div>

      <Separator />

      {/* Chats */}
      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-5">
          {["Today", "Yesterday", "Previous 7 days"].map((group) => {
            const groupChats = chats.filter((chat) => chat.time === group);

            return (
              <div key={group}>
                <p className="mb-2 px-2 text-xs font-medium text-muted-foreground">
                  {group}
                </p>

                <div className="space-y-1">
                  {groupChats.map((chat) => (
                    <button
                      key={chat.id}
                      className="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-accent"
                    >
                      <MessageSquare className="h-4 w-4 shrink-0 text-muted-foreground" />

                      <span className="flex-1 truncate">{chat.title}</span>

                      <MoreHorizontal className="hidden h-4 w-4 text-muted-foreground group-hover:block" />
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      <Separator />

      {/* User */}
      <div className="p-3">
        <div className="flex items-center gap-3 rounded-lg p-2 hover:bg-accent">
          <Avatar className="h-9 w-9">
            <AvatarFallback>NK</AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">Nimesh</p>
            <p className="truncate text-xs text-muted-foreground">Free plan</p>
          </div>

          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="h-4 w-4" />
          </Button>
        </div>

        <Button
          disabled={isPending}
          onClick={handleLogout}
          variant="ghost"
          className="mt-1 w-full justify-start gap-3 text-muted-foreground"
        >
          <LogOut className="h-4 w-4" />
          {isPending ? "Logging out" : "Logout"}
        </Button>
      </div>
    </aside>
  );
}

export default Sidebar;
