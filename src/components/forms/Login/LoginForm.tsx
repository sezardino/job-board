"use client";

import { Button } from "@/components/base/Button/Button";
import { ControlledInput } from "@/components/controlled";
import { Form, FormikProvider, useFormik } from "formik";
import { useTranslations } from "next-intl";
import { useMemo, type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";
import z from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

export type LoginFormValues = {
  email: string;
  password: string;
};

export type LoginFormProps = ComponentPropsWithoutRef<"form"> & {
  onFormSubmit: (data: LoginFormValues) => void;
};

const MIN_PASSWORD_LENGTH = 5;

const initialValues = {
  email: "",
  password: "",
};

export const LoginForm: FC<LoginFormProps> = (props) => {
  const { onFormSubmit, className, ...rest } = props;
  const t = useTranslations("forms.login");

  const validationSchema = useMemo(
    () =>
      toFormikValidationSchema(
        z.object({
          email: z
            .string({ required_error: t("email.required") })
            .email()
            .min(1, { message: t("email.required") }),
          password: z
            .string({ required_error: t("password.required") })
            .min(MIN_PASSWORD_LENGTH, {
              message: t("password.min-length", {
                value: MIN_PASSWORD_LENGTH,
              }),
            }),
        })
      ),
    [t]
  );

  const formik = useFormik<LoginFormValues>({
    onSubmit: onFormSubmit,
    validationSchema,
    initialValues,
  });

  return (
    <FormikProvider value={formik}>
      <Form
        {...rest}
        className={twMerge("grid grid-cols-1 gap-5", className)}
        aria-label={t("label")}
      >
        <div className="grid grid-cols-1 gap-2">
          <ControlledInput
            name="email"
            label={t("email.label")}
            placeholder={t("email.placeholder")}
          />

          <ControlledInput
            name="password"
            type="password"
            label={t("password.label")}
            placeholder={t("password.placeholder")}
          />
        </div>

        <div
          className={twMerge(
            "flex gap-3 flex-wrap justify-between items-center"
          )}
        >
          <Button type="submit" color="primary" fullWidth text={t("submit")} />
        </div>
      </Form>
    </FormikProvider>
  );
};
