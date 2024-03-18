"use client";

import { AuthFormValues } from "@/components/forms";
import { LoginTemplate } from "@/components/templates/LoginTemplate";
import { PublicPageUrls } from "@/const";
import { reactToastify } from "@/libs/react-toastify";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const t = useTranslations("messages.login");

  const loginHandler = async (values: AuthFormValues) => {
    let res = await signIn("credentials", {
      ...values,
      redirect: false,
    });

    if (res?.ok) {
      reactToastify({ type: "success", message: t("success") });

      router.replace(PublicPageUrls.home);
      return;
    } else {
      reactToastify({ type: "error", message: t("error") });
    }

    return res;
  };

  return <LoginTemplate onFormSubmit={loginHandler} />;
};

export default LoginPage;
