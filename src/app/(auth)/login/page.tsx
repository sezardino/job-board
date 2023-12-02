"use client";

import { AuthFormValues } from "@/components";
import { LoginTemplate } from "@/components/templates/LoginTemplate";
import { reactToastify } from "@/libs/react-toastify";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const t = useTranslations("toasts");

  const loginHandler = async (values: AuthFormValues) => {
    console.log(values);
    let res = await signIn("admin-credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    console.log(res);

    if (res?.ok) {
      reactToastify({ type: "success", message: t("login.success") });
      // router.replace(ProjectPageUrls.home);
      return;
    } else {
      reactToastify({ type: "error", message: t("login.error") });
    }
  };

  return <LoginTemplate onFormSubmit={loginHandler} />;
};

export default LoginPage;
