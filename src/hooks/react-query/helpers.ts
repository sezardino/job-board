import { reactToastify } from "@/libs/react-toastify";
import { CustomException } from "@/types";
import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useTranslations } from "next-intl";

type GetQueriesToInvalidateFunction<
  Var extends unknown,
  Res extends unknown,
  Args extends unknown
> = (args: { res: Res; vars: Var; args?: Args }) => any[][];

interface UseMutationHelper<
  Var extends unknown,
  Res extends unknown,
  Args extends unknown
> extends UseMutationOptions<Res, CustomException, Var, unknown> {
  getQueriesToInvalidate?: GetQueriesToInvalidateFunction<Var, Res, Args>;
  errorTranslationKey?: string;
  successTranslationKey?: string;
  args?: Args;
}

export const useMutationHelper = <
  Var extends any,
  Res extends unknown,
  Args extends unknown,
  Err extends unknown
>(
  props: UseMutationHelper<Var, Res, Args>
) => {
  const {
    mutationFn,
    getQueriesToInvalidate,
    args,
    errorTranslationKey,
    successTranslationKey,
    onSuccess,
    onError,
    ...rest
  } = props;
  const client = useQueryClient();
  const t = useTranslations("messages");

  return useMutation({
    ...rest,
    mutationFn: (data: Var) => {
      if (!mutationFn) return Promise.reject("No mutation function provided");

      return mutationFn(data);
    },
    onSuccess: (res, vars, ctx) => {
      if (getQueriesToInvalidate) {
        const queries = getQueriesToInvalidate({ res, vars, args });
        queries
          .filter(Boolean)
          .forEach((query) => client.invalidateQueries({ queryKey: query }));
      }

      if (onSuccess) onSuccess(res, vars, ctx);
      if (successTranslationKey)
        reactToastify({ type: "success", message: t(successTranslationKey) });
    },
    onError: (err, vars, ctx) => {
      if (typeof err === "string" && err === "") return;

      if (onError) onError(err, vars, ctx);
      if (errorTranslationKey)
        reactToastify({ type: "error", message: t(errorTranslationKey) });
    },
  });
};
