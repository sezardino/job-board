import { signOut } from "next-auth/react";
import { useMutationHelper } from "../../helpers";

export const useLogoutMutation = () =>
  useMutationHelper({
    mutationFn: () => signOut(),
    clearCache: true,
    successTranslationKey: "logout.success",
    errorTranslationKey: "logout.error",
  });
