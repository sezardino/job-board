"use client";

import { AuthFormValues } from "@/components/forms";
import { LoginTemplate } from "@/components/templates/Auth/Login/LoginTemplate";
import { PublicPageUrls } from "@/const";
import { useLoginMutation } from "@/hooks/react-query/mutation/auth/login";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

const LoginPage = () => {
  const { mutateAsync: login } = useLoginMutation();
  const router = useRouter();

  const loginHandler = useCallback(
    async (values: AuthFormValues) =>
      login(values, { onSuccess: () => router.push(PublicPageUrls.home) }),
    [login, router]
  );

  return <LoginTemplate onFormSubmit={loginHandler} />;
};

export default LoginPage;
