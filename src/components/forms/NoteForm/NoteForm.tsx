import { ControlledInput, ControlledTextarea } from "@/components/controlled";
import { MAX_STRING_LENGTH } from "@/const";
import { Form, FormikProvider, useFormik } from "formik";
import { useTranslations } from "next-intl";
import { ComponentPropsWithoutRef, useMemo } from "react";
import { twMerge } from "tailwind-merge";

import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

import styles from "./NoteForm.module.scss";

export type NoteFormValues = {
  name: string;
  content: string;
};

type Props = {
  initialValues?: NoteFormValues;
  onFormSubmit: (values: NoteFormValues) => void;
};

export type NoteFormProps = ComponentPropsWithoutRef<"form"> & Props;

const clearValues = {
  name: "",
  content: "",
};

export const NoteForm = (props: NoteFormProps) => {
  const { initialValues, onFormSubmit, className, ...rest } = props;
  const t = useTranslations("forms.note");

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

  const formik = useFormik<NoteFormValues>({
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
          label={t("content.label")}
          placeholder={t("content.placeholder")}
          description={t("content.description")}
        />
      </Form>
    </FormikProvider>
  );
};
