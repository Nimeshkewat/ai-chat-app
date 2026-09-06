import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left side */}
        <div className="hidden bg-muted lg:flex lg:flex-col lg:justify-between p-10">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">AI Chat</h1>
          </div>

          <div className="max-w-md">
            <h2 className="text-4xl font-bold tracking-tight">
              Your AI assistant,
              <br />
              always ready.
            </h2>

            <p className="mt-4 text-muted-foreground">
              Ask questions, explore ideas, and get things done with your
              personal AI assistant.
            </p>
          </div>

          <p className="text-sm text-muted-foreground">© 2026 AI Chat</p>
        </div>

        {/* Right side */}
        <div className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
