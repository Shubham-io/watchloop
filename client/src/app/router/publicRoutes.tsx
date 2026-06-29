import LoginPage from "@watchloop/pages/LoginPage";
import RegisterPage from "@watchloop/pages/RegisterPage";

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