import type { QueryClient } from "@tanstack/react-query";

import { updateUser } from "@watchloop/features/auth/authSlice";
import type { AppDispatch } from "@watchloop/store/store";
import type { User } from "@watchloop/types";

import { userKeys } from "@watchloop/constants/queryKeys";

export const syncCurrentUser = (
  user: User,
  queryClient: QueryClient,
  dispatch: AppDispatch,
) => {
  queryClient.setQueryData(userKeys.currentUser, user);

  dispatch(updateUser(user));
};