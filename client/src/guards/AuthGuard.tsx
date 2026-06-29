import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import PageLoader from "@watchloop/components/shared/PageLoader";

export default function AuthGuard() {
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  if (isLoading) {
    return <PageLoader />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
