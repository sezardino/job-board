"use client";

import { LoadingOverlay } from "@/components/base";
import { VerifyEmailTemplate } from "@/components/templates/Auth/VerifyEmailTemplate";
import { PublicPageUrls } from "@/const";
import { useResendVerificationEmailMutation } from "@/hooks/react-query/mutation/auth/resend-verification-email";
import { useVerifyEmailTokenQuery } from "@/hooks/react-query/query/auth/verify-email-token";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const LoginPage = () => {
  const router = useRouter();
  const token = useSearchParams().get("token");

  const { data: verifyTokenStatus, isFetching: isVerifyTokenStatusLoading } =
    useVerifyEmailTokenQuery(token!);

  const {
    mutateAsync: resendVerificationEmail,
    isPending: isResendVerificationEmailLoading,
  } = useResendVerificationEmailMutation();

  const resendHandler = useCallback(
    async (arg: any) =>
      token ? resendVerificationEmail({ token }) : undefined,
    [resendVerificationEmail, token]
  );

  if (!token) {
    router.replace(PublicPageUrls.notFound);
    return null;
  }

  const isLoading = isVerifyTokenStatusLoading;

  return (
    <>
      {isLoading && <LoadingOverlay />}

      {verifyTokenStatus && (
        <VerifyEmailTemplate
          status={verifyTokenStatus.status}
          resendEmailAction={{
            handler: resendHandler,
            isLoading: isResendVerificationEmailLoading,
          }}
        />
      )}
    </>
  );
};

export default LoginPage;
