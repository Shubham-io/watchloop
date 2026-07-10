import { Outlet } from "react-router-dom";
import { Play } from "lucide-react";

export default function AuthLayout() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="container flex min-h-screen flex-col items-center justify-center px-4 py-8">
        <div className="mb-8 flex items-center gap-2">
          <div className="rounded-full bg-red-600 p-2 text-white">
            <Play className="h-5 w-5 fill-current" />
          </div>

          <h1 className="text-3xl font-bold tracking-tight">
            WatchLoop
          </h1>
        </div>

        <Outlet />
      </div>
    </main>
  );
}