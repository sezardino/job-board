import { AuthFormValues } from "@/components/forms";
import { useQueryClient } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useCallback } from "react";
import { CURRENT_USER_PROFILE_QUERY_KEY } from "./react-query/query/users/current-user";

type Args = {
  onSuccess: () => void;
  onError: () => void;
};

export const useLogin = (args: Args) => {
  const { onSuccess, onError } = args;

  const client = useQueryClient();

  const login = useCallback(
    async (values: AuthFormValues) => {
      let res = await signIn("credentials", {
        ...values,
        redirect: false,
      });

      if (res?.ok) {
        client.invalidateQueries({
          queryKey: [CURRENT_USER_PROFILE_QUERY_KEY],
        });
        onSuccess();
        return;
      } else {
        onError();
      }

      return res;
    },
    [client, onError, onSuccess]
  );

  return login;
};
