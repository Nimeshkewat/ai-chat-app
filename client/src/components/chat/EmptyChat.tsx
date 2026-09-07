import { MessageSquare } from "lucide-react";

function EmptyChat() {
  return (
    <div className="flex flex-1 items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
          <MessageSquare className="h-7 w-7" />
        </div>

        <h2 className="text-2xl font-semibold">How can I help you?</h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Ask me anything. I can help you learn, write, brainstorm, explain
          concepts, and more.
        </p>
      </div>
    </div>
  );
}

export default EmptyChat;
