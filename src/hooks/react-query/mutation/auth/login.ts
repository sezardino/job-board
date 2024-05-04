import { AuthFormValues } from "@/components/forms";
import { signIn } from "next-auth/react";
import { useMutationHelper } from "../../helpers";
import { CURRENT_USER_PROFILE_QUERY_KEY } from "../../query/users/current-user";

export const useLoginMutation = () =>
  useMutationHelper({
    mutationFn: async (values: AuthFormValues) => {
      const response = await signIn("credentials", {
        ...values,
        redirect: false,
      });

      if (!response?.ok) throw new Error();
    },
    getQueriesToInvalidate: () => [[CURRENT_USER_PROFILE_QUERY_KEY]],
    successTranslationKey: "login.success",
    errorTranslationKey: "login.error",
  });
