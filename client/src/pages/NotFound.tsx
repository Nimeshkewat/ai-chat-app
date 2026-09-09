import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { MessageSquareOff } from "lucide-react";

function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
        <MessageSquareOff className="h-7 w-7 text-muted-foreground" />
      </div>

      <div className="space-y-1">
        <h1 className="text-3xl font-bold">404</h1>
        <p className="text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>

      <Button>
        <Link to="/">Go back home</Link>
      </Button>
    </div>
  );
}

export default NotFound;
