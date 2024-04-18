import { ControlledInput, ControlledTextarea } from "@/components/controlled";
import { MAX_STRING_LENGTH } from "@/const";
import { Form, FormikProvider, useFormik } from "formik";
import { useTranslations } from "next-intl";
import { ComponentPropsWithoutRef, useMemo } from "react";
import { twMerge } from "tailwind-merge";

import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

import styles from "./CommentsForm.module.scss";

export type CommentsFormValues = {
  name: string;
  content: string;
};

type Props = {
  initialValues?: CommentsFormValues;
  onFormSubmit: (values: CommentsFormValues) => void;
};

export type CommentsFormProps = ComponentPropsWithoutRef<"form"> & Props;

const clearValues = {
  name: "",
  content: "",
};

export const CommentsForm = (props: CommentsFormProps) => {
  const { initialValues, onFormSubmit, className, ...rest } = props;
  const t = useTranslations("forms.comments");

  const validationSchema = useMemo(
    () =>
      toFormikValidationSchema(
        z.object({
          name: z
            .string({
              required_error: t("name.required"),
            })
            .max(
              MAX_STRING_LENGTH,
              t("name.max-length", { value: MAX_STRING_LENGTH })
            ),
          content: z
            .string({ required_error: t("content.required") })
            .max(
              MAX_STRING_LENGTH,
              t("content.max-length", { value: MAX_STRING_LENGTH })
            ),
        })
      ),
    [t]
  );

  const formik = useFormik<CommentsFormValues>({
    validationSchema,
    onSubmit: onFormSubmit,
    initialValues: initialValues ?? clearValues,
  });

  return (
    <FormikProvider value={formik}>
      <Form {...rest} className={twMerge(styles.element, className)}>
        <ControlledInput
          name="name"
          label={t("name.label")}
          placeholder={t("name.placeholder")}
        />

        <ControlledTextarea
          name="content"
          disableAnimation
          label={t("content.label")}
          placeholder={t("content.placeholder")}
        />
      </Form>
    </FormikProvider>
  );
};
