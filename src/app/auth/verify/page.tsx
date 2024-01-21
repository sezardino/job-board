"use client";

import { LoadingOverlay } from "@/components/base";
import { VerifyEmailTemplate } from "@/components/templates/Auth/VerifyEmailTemplate";
import { PublicPageUrls } from "@/const";
import { useVerifyEmailTokenQuery } from "@/hooks/react-query/query/auth/verify-email-token";
import { useRouter, useSearchParams } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const token = useSearchParams().get("token");

  const { data: verifyTokenStatus, isFetching: isVerifyTokenStatusLoading } =
    useVerifyEmailTokenQuery(token!);

  // const isCheckedRef = useRef(false);
  // useEffect(() => {
  //   if (isCheckedRef.current || !token || !EMAIL_TOKEN_REGEXP.test(token))
  //     return;

  //   isCheckedRef.current = true;
  //   verifyEmailToken({ token: token });
  // }, []);

  if (!token) {
    router.replace(PublicPageUrls.notFound);
    return null;
  }

  const isLoading = isVerifyTokenStatusLoading;

  return (
    <>
      {isLoading && <LoadingOverlay />}

      {verifyTokenStatus && (
        <VerifyEmailTemplate status={verifyTokenStatus.status} />
      )}
    </>
  );
};

export default LoginPage;
