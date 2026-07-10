import LoginPage from "@watchloop/features/auth/pages/LoginPage";
import RegisterPage from "@watchloop/features/auth/pages/RegisterPage";

export const publicRoutes = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
];