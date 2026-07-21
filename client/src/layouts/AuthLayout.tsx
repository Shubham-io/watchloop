import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="container flex min-h-screen flex-col items-center justify-center px-4 py-8">
        <div className="mb-8 flex items-center gap-2">
         <img src="/logo.png" alt="logo" className="h-8 w-8 rounded-full"/>

          <h1 className="text-3xl font-bold tracking-tight">
            WatchLoop
          </h1>
        </div>

        <Outlet />
      </div>
    </main>
  );
}