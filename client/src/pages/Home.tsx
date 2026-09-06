import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { MessageSquare, Sparkles, Zap, ShieldCheck } from "lucide-react";

function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="border-b">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="text-xl font-bold">
            AI Chat
          </Link>

          <div className="flex items-center gap-3">
            <Button>
              <Link to="/login">Login</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main>
        <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center justify-center px-6 py-20">
          <div className="max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-muted px-4 py-2 text-sm">
              <Sparkles className="h-4 w-4" />
              <span>Your personal AI assistant</span>
            </div>

            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Think smarter.
              <br />
              <span className="text-muted-foreground">Create faster.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Chat with AI, ask questions, learn new concepts, brainstorm ideas,
              and get help with your everyday tasks—all in one place.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button size="lg">
                <Link to="/login" className="flex gap-1 items-center">
                  Start chatting
                  <MessageSquare className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button size="lg" variant="outline">
                <Link to="/register">Create free account</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-t bg-muted/30">
          <div className="mx-auto grid max-w-7xl gap-6 px-6 py-20 md:grid-cols-3">
            <div className="rounded-xl border bg-background p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <MessageSquare className="h-5 w-5" />
              </div>

              <h3 className="text-lg font-semibold">Natural conversations</h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Have conversations with AI and keep your chat history organized.
              </p>
            </div>

            <div className="rounded-xl border bg-background p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Zap className="h-5 w-5" />
              </div>

              <h3 className="text-lg font-semibold">Fast and helpful</h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Get quick answers, explanations, ideas, and assistance whenever
                you need it.
              </p>
            </div>

            <div className="rounded-xl border bg-background p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <ShieldCheck className="h-5 w-5" />
              </div>

              <h3 className="text-lg font-semibold">Your conversations</h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Your chats are tied to your account so you can access your
                conversations whenever you return.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t">
          <div className="mx-auto max-w-3xl px-6 py-24 text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Ready to start?
            </h2>

            <p className="mt-3 text-muted-foreground">
              Create an account and start chatting with your AI assistant.
            </p>

            <Button size="lg" className="mt-6">
              <Link to="/register">Get Started</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
