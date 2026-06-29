import { useEffect } from "react";

import { useCurrentUser } from "@watchloop/features/auth/hooks/useCurrentUser";
import { useAppDispatch } from "@watchloop/store/hooks";
import { login, finishLoading } from "@watchloop/features/auth/authSlice";

interface Props {
  children: React.ReactNode;
}

export default function AuthInitializer({ children }: Props) {
  const dispatch = useAppDispatch();

  const { data: user, isSuccess, isError } = useCurrentUser();

  useEffect(() => {
    if (isSuccess && user) {
      dispatch(login(user));
    }
    if (isError) {
      dispatch(finishLoading());
    }
  }, [user, isSuccess, isError, dispatch]);

  return children;
}
