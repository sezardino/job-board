"use client";

import { useTranslations } from "next-intl";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { Typography } from "../base";
import { AuthForm, AuthFormProps } from "../forms";

export type LoginTemplateProps = ComponentPropsWithoutRef<"section"> & {
  onFormSubmit: AuthFormProps["onFormSubmit"];
};

export const LoginTemplate: FC<LoginTemplateProps> = (props) => {
  const { onFormSubmit, ...rest } = props;
  const t = useTranslations("login-page");

  return (
    <section {...rest} className="border-2 rounded-md p-4">
      <div className="text-center">
        <Typography tag="h1" styling="xl">
          {t("title")}
        </Typography>
        <Typography tag="p" styling="xs">
          {t("description")}
        </Typography>
      </div>
      <AuthForm
        type={"login"}
        label={t("title")}
        submitText={t("submit")}
        className="mt-5"
        onFormSubmit={onFormSubmit}
      />
      <Typography tag="p" className="mt-5 text-center">
        {t("forgot-password")}
      </Typography>
    </section>
  );
};
