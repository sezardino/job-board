"use client";

import { LoginTemplate } from "@/components/templates/Auth/LoginTemplate/LoginTemplate";
import { PublicPageUrls } from "@/const";
import { useLogin } from "@/hooks/useLogin";
import { reactToastify } from "@/libs/react-toastify";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

const LoginPage = () => {
  const router = useRouter();
  const t = useTranslations("messages.login");
  const login = useLogin({
    onSuccess: useCallback(() => {
      reactToastify({ type: "success", message: t("success") });
      router.replace(PublicPageUrls.home);
    }, [router, t]),
    onError: useCallback(() => {
      reactToastify({ type: "error", message: t("error") });
    }, [t]),
  });

  return <LoginTemplate onFormSubmit={login} />;
};

export default LoginPage;
