"use client";

import { useTranslations } from "next-intl";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { AuthFormProps, Typography, AuthForm } from "..";

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
        copy={{
          submit: t("submit"),
          email: {
            label: t("login.label"),
            placeholder: t("login.placeholder"),
            required: t("login.required"),
          },
          password: {
            label: t("password.label"),
            placeholder: t("password.placeholder"),
            required: t("password.required"),
            minLength: (min: number) =>
              t("password.min-length", { value: min }),
          },
        }}
        className="mt-5"
        onFormSubmit={onFormSubmit}
      />
      <Typography tag="p" className="mt-5 text-center">
        {t("forgot-password")}
      </Typography>
    </section>
  );
};
