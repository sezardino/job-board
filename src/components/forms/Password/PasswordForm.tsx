import { ControlledInput } from "@/components/controlled";
import { Form, FormikProvider, useFormik } from "formik";
import { useTranslations } from "next-intl";
import {
  ComponentPropsWithoutRef,
  ForwardRefRenderFunction,
  forwardRef,
  useMemo,
} from "react";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

import { twMerge } from "tailwind-merge";
import styles from "./PasswordForm.module.scss";

export type PasswordFormValues = {
  oldPassword: string;
  password: string;
  confirmPassword: string;
};

type Props = {
  withOldPassword?: boolean;
  onFormSubmit: (values: PasswordFormValues) => void;
};

export type PasswordFormProps = ComponentPropsWithoutRef<"form"> & Props;

const initialValues: PasswordFormValues = {
  oldPassword: "",
  password: "",
  confirmPassword: "",
};

const MIN_PASSWORD_LENGTH = 8;

const PasswordFormComponent: ForwardRefRenderFunction<
  HTMLFormElement,
  PasswordFormProps
> = (props, ref) => {
  const { onFormSubmit, withOldPassword, className, ...rest } = props;
  const t = useTranslations("forms.shared.password");

  const validationSchema = useMemo(
    () =>
      toFormikValidationSchema(
        z
          .object({
            oldPassword: withOldPassword
              ? z.string({ required_error: t("old-password.required") })
              : z.string().optional(),
            password: z.string({ required_error: t("password.required") }).min(
              MIN_PASSWORD_LENGTH,
              t("password.min-length", {
                value: MIN_PASSWORD_LENGTH,
              })
            ),
            confirmPassword: z.string({
              required_error: t("confirm-password.required"),
            }),
          })
          .refine((data) => data.password === data.confirmPassword, {
            message: t("confirm-password.not-match"),
            path: ["confirmPassword"],
          })
      ),
    [t, withOldPassword]
  );

  const formik = useFormik<PasswordFormValues>({
    initialValues,
    validationSchema,
    onSubmit: onFormSubmit,
  });

  return (
    <FormikProvider value={formik}>
      <Form ref={ref} {...rest} className={twMerge(styles.element, className)}>
        {withOldPassword && (
          <ControlledInput
            label={t("old-password.label")}
            name="oldPassword"
            placeholder={t("old-password.placeholder")}
            type="password"
          />
        )}
        <ControlledInput
          label={t("password.label")}
          name="password"
          placeholder={t("password.placeholder")}
          type="password"
        />
        <ControlledInput
          label={t("confirm-password.label")}
          name="confirmPassword"
          placeholder={t("confirm-password.placeholder")}
          type="password"
        />
      </Form>
    </FormikProvider>
  );
};

export const PasswordForm = forwardRef(PasswordFormComponent);
