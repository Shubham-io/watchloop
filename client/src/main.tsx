import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import QueryProvider from "./app/providers/QueryProvider.tsx";
import ReduxProvider from "./app/providers/ReduxProvider.tsx";
import AuthInitializer from "./app/providers/AuthInitializer.tsx";
import ThemeProvider from "./app/providers/ThemeProvider.tsx";
import { router } from "./app/router/router.tsx";
import { Toaster } from "sonner";
import { Suspense } from "react";
import "./index.css";
import PageLoader from "./components/shared/PageLoader.tsx";

createRoot(document.getElementById("root")!).render(
  <ReduxProvider>
    <QueryProvider>
      <ThemeProvider>
        <AuthInitializer>
          <Suspense fallback={<PageLoader />}>
            <RouterProvider router={router} />
          </Suspense>
        </AuthInitializer>
      </ThemeProvider>
      <Toaster richColors />
    </QueryProvider>
  </ReduxProvider>,
);
