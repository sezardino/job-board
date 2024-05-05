"use client";

import { LoadingOverlay } from "@/components/base/LoadingOverlay/LoadingOverlay";
import { PublicPageUrls } from "@/const";
import { useVerifyEmailTokenQuery } from "@/hooks/react-query/query/auth/verify-email-token";
import { useRouter, useSearchParams } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const token = useSearchParams().get("token");

  const { data: verifyTokenStatus, isFetching: isVerifyTokenStatusLoading } =
    useVerifyEmailTokenQuery(token!);

  if (!token) {
    router.replace(PublicPageUrls.notFound);
    return null;
  }

  const isLoading = isVerifyTokenStatusLoading;

  return <>{isLoading && <LoadingOverlay />}</>;
};

export default LoginPage;
