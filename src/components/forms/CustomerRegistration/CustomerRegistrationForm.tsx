"use client";

import { Grid } from "@/components/base";
import { ControlledInput } from "@/components/controlled";
import { MIN_PASSWORD_LENGTH } from "@/const";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import { useRef, type ComponentPropsWithoutRef, type FC } from "react";
import z from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { FormWrapper } from "../FormWrapper/FormWrapper";

export type CustomerRegistrationFormValues = {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
};

export type CustomerRegistrationFormProps = ComponentPropsWithoutRef<"form"> & {
  onFormSubmit: (data: CustomerRegistrationFormValues) => void;
  onEmailAvailableRequest: (email: string) => Promise<boolean>;
};

export const CustomerRegistrationForm: FC<CustomerRegistrationFormProps> = (
  props
) => {
  const { onFormSubmit, onEmailAvailableRequest, ...rest } = props;
  const t = useTranslations("forms.register-user");
  const checkOwnerEmailHistory = useRef<Record<string, boolean>>({});

  const formik = useFormik<CustomerRegistrationFormValues>({
    onSubmit: onFormSubmit,
    initialValues: {
      email: "",
      name: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: toFormikValidationSchema(
      z
        .object({
          email: z
            .string({ required_error: t("email.required") })
            .email(t("email.invalid")),
          name: z.string({ required_error: t("name.required") }),
          password: z
            .string({ required_error: t("password.required") })
            .min(
              MIN_PASSWORD_LENGTH,
              t("password.short", { value: MIN_PASSWORD_LENGTH })
            ),
          repeatPassword: z.string({
            required_error: t("repeat-password.required"),
          }),
        })
        .refine((data) => data.password === data.repeatPassword, {
          path: ["repeatPassword"],
          message: t("repeat-password.not-match"),
        })
    ),
  });

  const validateUserEmailHandler = async (email: string) => {
    if (!onEmailAvailableRequest) return true;

    const historyValue = checkOwnerEmailHistory.current[email];
    if (historyValue) return historyValue;

    if (historyValue === false) {
      formik.setFieldError("email", t("email.used"));
      return false;
    }

    const response = await onEmailAvailableRequest(email);
    checkOwnerEmailHistory.current[email] = response;

    if (response) return response;

    formik.setFieldError("email", t("email.used"));

    return false;
  };

  return (
    <FormWrapper
      {...rest}
      formik={formik}
      submit={{ label: t("trigger"), isFullWidth: true }}
    >
      <Grid gap={4}>
        <div className="flex flex-wrap gap-2 items-start">
          <ControlledInput
            name="name"
            label={t("name.label")}
            placeholder={t("name.placeholder")}
            className="flex-1 min-w-[220px]"
          />
          <ControlledInput
            name="email"
            label={t("email.label")}
            placeholder={t("email.placeholder")}
            className="flex-1 min-w-[220px]"
          />
        </div>

        <ControlledInput
          name="password"
          type="password"
          label={t("password.label")}
          placeholder={t("password.placeholder")}
        />
        <ControlledInput
          name="repeatPassword"
          type="password"
          label={t("repeat-password.label")}
          placeholder={t("repeat-password.placeholder")}
        />
      </Grid>
    </FormWrapper>
  );
};
