"use client";

import { LoadingOverlay } from "@/components/base/LoadingOverlay/LoadingOverlay";
import { PasswordFormValues } from "@/components/forms/Password/PasswordForm";
import { ResetPasswordTemplate } from "@/components/templates/Auth/ResetPassword/ResetPasswordTemplate";
import {
  useResetPasswordMutation,
  useResetPasswordRequestMutation,
} from "@/hooks";
import { useVerifyResetPasswordTokenQuery } from "@/hooks/react-query/query/users/verify-reset-password-token";
import { useCallback } from "react";

type Props = {
  params: {
    token: string;
  };
};

const ResetPasswordPage = (props: Props) => {
  const { token } = props.params;

  const { error, isFetching: isTokenVerificationLoading } =
    useVerifyResetPasswordTokenQuery({
      token,
    });

  const { mutateAsync: resetPassword, isPending: isResetPasswordPending } =
    useResetPasswordMutation();

  const {
    mutateAsync: resendVerificationEmail,
    isPending: isResendVerificationEmailPending,
  } = useResetPasswordRequestMutation();

  const resetPasswordHandler = useCallback(
    async (values: PasswordFormValues) =>
      await resetPassword({
        password: values.confirmPassword,
        token,
      }),
    [resetPassword, token]
  );

  const isLoading =
    isTokenVerificationLoading ||
    isResetPasswordPending ||
    isResendVerificationEmailPending;

  return (
    <>
      {isLoading && <LoadingOverlay />}
      <ResetPasswordTemplate
        resendVerificationEmail={{
          handler: resendVerificationEmail,
          isLoading: isResendVerificationEmailPending,
        }}
        errorPayload={error?.response?.data.payload}
        resetPassword={{
          handler: resetPasswordHandler,
          isLoading: isResetPasswordPending,
        }}
      />
    </>
  );
};

export default ResetPasswordPage;
