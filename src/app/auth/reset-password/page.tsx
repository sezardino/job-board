"use client";

import { LoadingOverlay } from "@/components/base/LoadingOverlay/LoadingOverlay";
import { ResetPasswordRequestTemplate } from "@/components/templates/Auth/ResetPasswordRequest/ResetPasswordRequestTemplate";
import { useResetPasswordRequestMutation } from "@/hooks";

const ResetPasswordRequestPage = () => {
  const {
    mutateAsync: resetPasswordRequest,
    isPending: isResetPasswordRequestPending,
  } = useResetPasswordRequestMutation();

  return (
    <>
      {isResetPasswordRequestPending && <LoadingOverlay />}

      <ResetPasswordRequestTemplate
        resetPasswordRequest={{
          handler: resetPasswordRequest,
          isLoading: isResetPasswordRequestPending,
        }}
      />
    </>
  );
};

export default ResetPasswordRequestPage;
