"use client";

import { useTranslations } from "next-intl";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { Typography } from "../base/Typography/Typography";
import { AuthFormProps } from "../forms";
import { LoginForm } from "../forms/Login/LoginForm";
import { SignUpPopover } from "../modules/layout/SignUpPopover";

export type LoginTemplateProps = ComponentPropsWithoutRef<"section"> & {
  onFormSubmit: AuthFormProps["onFormSubmit"];
};

export const LoginTemplate: FC<LoginTemplateProps> = (props) => {
  const { onFormSubmit, ...rest } = props;
  const t = useTranslations("login-page");

  return (
    <section {...rest} className="max-w-xl mx-auto border-2 rounded-md p-4">
      <div className="text-center">
        <Typography tag="h1" styling="xl">
          {t("title")}
        </Typography>
        <Typography tag="p" styling="xs">
          {t("description")}
        </Typography>
      </div>
      <LoginForm className="mt-5" onFormSubmit={onFormSubmit} />
      <Typography tag="p" className="mt-5 text-center">
        {t("forgot-password")}
      </Typography>
      <SignUpPopover text={t("register.text")} buttonType="link" />

      {/* TODO: implement forgot password functionality */}
      {/* <Typography tag="p" className="mt-5 text-center">
        {t("forgot-password")}
      </Typography> */}
    </section>
  );
};
