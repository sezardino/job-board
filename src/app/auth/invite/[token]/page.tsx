"use client";

import { LoadingOverlay } from "@/components/base/LoadingOverlay/LoadingOverlay";
import { PasswordFormValues } from "@/components/forms/Password/PasswordForm";
import { AcceptInviteTemplate } from "@/components/templates/Auth/AcceptInvite/AcceptInviteTemplate";
import { useCheckInviteTokenQuery } from "@/hooks";
import { useAcceptInviteMutation } from "@/hooks/react-query/mutation/users/accept-invite";
import { useCallback } from "react";

type Props = {
  params: {
    token: string;
  };
};

const ResetPasswordPage = (props: Props) => {
  const { token } = props.params;

  const { error, isFetching: isTokenVerificationLoading } =
    useCheckInviteTokenQuery(token);

  const { mutateAsync: acceptInvite, isPending: isAcceptInviteLoading } =
    useAcceptInviteMutation();

  const acceptInviteHandler = useCallback(
    async (values: PasswordFormValues) =>
      await acceptInvite({
        password: values.confirmPassword,
        token,
      }),
    [acceptInvite, token]
  );

  const isLoading = isTokenVerificationLoading || isAcceptInviteLoading;

  return (
    <>
      {isLoading && <LoadingOverlay />}
      <AcceptInviteTemplate
        errorPayload={error?.response?.data.payload}
        acceptInvite={{
          handler: acceptInviteHandler,
          isLoading: isAcceptInviteLoading,
        }}
      />
    </>
  );
};

export default ResetPasswordPage;
