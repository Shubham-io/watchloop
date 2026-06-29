import { createBrowserRouter } from "react-router-dom";

import ErrorPage from "@watchloop/pages/ErrorPage";
import PageNotFound from "@watchloop/pages/PageNotFound";

import MainLayout from "@watchloop/layouts/MainLayout";
import AuthLayout from "@watchloop/layouts/AuthLayout";

import AuthGuard from "@watchloop/guards/AuthGuard";
import GuestGuard from "@watchloop/guards/GuestGuard";

import { protectedRoutes } from "./protectedRoutes";
import { publicRoutes } from "./publicRoutes";

export const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    children: [
      {
        element: <AuthGuard />,
        children: [
          {
            element: <MainLayout />,
            children: protectedRoutes,
          },
        ],
      },

      {
        element: <GuestGuard />,
        children: [
          {
            element: <AuthLayout />,
            children: publicRoutes,
          },
        ],
      },

      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);
