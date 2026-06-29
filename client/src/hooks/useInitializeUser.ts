import { useEffect } from "react";

import { useCurrentUser } from "../features/auth/hooks/useCurrentUser";
import { useAppDispatch } from "../store/hooks";
import { login } from "../features/auth/authSlice";

export default function useInitializeUser() {
  const dispatch = useAppDispatch();

  const { data: user } = useCurrentUser();

  useEffect(() => {
    if (user) {
      dispatch(login(user));
    }
  }, [user, dispatch]);
}
