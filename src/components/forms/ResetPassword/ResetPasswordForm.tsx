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

export type ResetPasswordFormValues = {
  email: string;
};

type Props = {
  onFormSubmit: (values: ResetPasswordFormValues) => void;
};

export type ResetPasswordFormProps = ComponentPropsWithoutRef<"form"> & Props;

const initialValues: ResetPasswordFormValues = {
  email: "",
};

const ResetPasswordFormComponent: ForwardRefRenderFunction<
  HTMLFormElement,
  ResetPasswordFormProps
> = (props, ref) => {
  const { onFormSubmit, ...rest } = props;
  const t = useTranslations("forms.shared.reset-password");

  const validationSchema = useMemo(
    () =>
      toFormikValidationSchema(
        z.object({
          email: z
            .string({ required_error: t("email.required") })
            .email({ message: t("email.invalid") }),
        })
      ),
    [t]
  );

  const formik = useFormik<ResetPasswordFormValues>({
    initialValues,
    validationSchema,
    onSubmit: onFormSubmit,
  });

  return (
    <FormikProvider value={formik}>
      <Form ref={ref} {...rest}>
        <ControlledInput
          type="email"
          name="email"
          label={t("email.label")}
          placeholder={t("email.placeholder")}
        />
      </Form>
    </FormikProvider>
  );
};

export const ResetPasswordForm = forwardRef(ResetPasswordFormComponent);
