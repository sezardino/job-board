"use client";

import { Grid } from "@/components/base";
import { ControlledInput } from "@/components/controlled";
import { MIN_PASSWORD_LENGTH } from "@/const";
import { useStringVerification } from "@/hooks/use-string-verification";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import { type ComponentPropsWithoutRef, type FC } from "react";
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
  isLoading?: boolean;
};

export const CustomerRegistrationForm: FC<CustomerRegistrationFormProps> = (
  props
) => {
  const { isLoading, onFormSubmit, onEmailAvailableRequest, ...rest } = props;
  const t = useTranslations("forms.register-user");
  const { validate: validateEmail } = useStringVerification({
    handler: onEmailAvailableRequest,
    onError: () => formik.setFieldError("email", t("email.used")),
  });

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

  return (
    <FormWrapper
      {...rest}
      formik={formik}
      isLoading={isLoading}
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
            onBlur={(evt) =>
              evt.currentTarget.value
                ? validateEmail(evt.currentTarget.value)
                : undefined
            }
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
