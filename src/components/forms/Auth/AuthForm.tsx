"use client";

import { Button } from "@/components/base/Button/Button";
import { ControlledInput } from "@/components/controlled";
import { Form, FormikProvider, useFormik } from "formik";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRef, type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";
import z from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

export type AuthFormValues = {
  email: string;
  password: string;
  repeatPassword?: string;
};

export type AuthFormProps = ComponentPropsWithoutRef<"form"> & {
  type: "login" | "new-user";
  label: string;
  onFormSubmit: (data: AuthFormValues) => void;
  onEmailAvailableRequest?: (email: string) => Promise<boolean>;
  submitText: string;
  cancel?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
};

const MIN_PASSWORD_LENGTH = 5;

export const AuthForm: FC<AuthFormProps> = (props) => {
  const {
    onEmailAvailableRequest,
    cancel,
    submitText,
    onFormSubmit,
    type,
    label,
    className,
    ...rest
  } = props;
  const t = useTranslations("forms.shared.auth");
  const checkEmailHistory = useRef<Record<string, boolean>>({});

  const formik = useFormik<AuthFormValues>({
    initialValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },
    onSubmit: async (values) => {
      if (type === "new-user" && onEmailAvailableRequest) {
        const response = await validateEmailHandler(values.email);

        if (!response) return;
      }

      onFormSubmit(values);
    },
    validationSchema: toFormikValidationSchema(
      z
        .object({
          email: z
            .string({ required_error: t("email.required") })
            .email()
            .min(1, { message: t("email.required") }),
          password: z
            .string({ required_error: t("password.required") })
            .min(MIN_PASSWORD_LENGTH, {
              message: t("password.min-length", { value: MIN_PASSWORD_LENGTH }),
            }),
          repeatPassword:
            type === "new-user"
              ? z
                  .string({ required_error: t("repeat-password.required") })
                  .min(1, { message: t("repeat-password.required") })
              : z.optional(z.string()),
        })
        .refine(
          (data) =>
            type === "new-user" ? data.password === data.repeatPassword : true,
          {
            path: ["repeatPassword"],
            message: t("repeat-password.not-match"),
          }
        )
    ),
  });

  const validateEmailHandler = async (email: string) => {
    if (!onEmailAvailableRequest) return true;

    const historyValue = checkEmailHistory.current[email];
    if (historyValue) return historyValue;

    if (historyValue === false) {
      formik.setFieldError("email", t("email.used"));
      return false;
    }

    const response = await onEmailAvailableRequest(email);
    checkEmailHistory.current[email] = response;

    if (response) return response;

    formik.setFieldError("email", t("email.used"));

    return false;
  };

  return (
    <FormikProvider value={formik}>
      <Form
        {...rest}
        className={twMerge("grid grid-cols-1 gap-5", className)}
        aria-label={label}
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
          {type === "new-user" && (
            <ControlledInput
              type="password"
              name="repeatPassword"
              label={t("repeat-password.label")}
              placeholder={t("repeat-password.placeholder")}
            />
          )}
        </div>

        <div
          className={twMerge(
            "flex gap-3 flex-wrap justify-between items-center"
          )}
        >
          {cancel && (
            <Button
              as={cancel.href ? Link : "button"}
              href={cancel.href}
              onClick={cancel.onClick}
              variant="bordered"
              text={cancel.label}
            />
          )}
          <Button
            type="submit"
            color="primary"
            fullWidth={!cancel}
            text={submitText}
          />
        </div>
      </Form>
    </FormikProvider>
  );
};
