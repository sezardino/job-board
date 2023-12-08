"use client";

import { Button } from "@/components/base";
import { ControlledInput } from "@/components/controlled";
import { SLUG_REGEXP } from "@/const/regexp";
import { Form, FormikProvider, useFormik } from "formik";
import { useTranslations } from "next-intl";
import { useRef, type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";
import z from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

export type IndustryFormValues = {
  name: string;
};

export type IndustryFormProps = ComponentPropsWithoutRef<"form"> & {
  onFormSubmit: (data: IndustryFormValues) => void;
  onNameAvailableRequest: (email: string) => Promise<boolean>;
  onCancelClick: () => void;
};

export const IndustryForm: FC<IndustryFormProps> = (props) => {
  const {
    onNameAvailableRequest,
    onFormSubmit,
    onCancelClick,
    className,
    ...rest
  } = props;
  const t = useTranslations("forms.industry");
  const history = useRef<Record<string, boolean>>({});

  const formik = useFormik<IndustryFormValues>({
    initialValues: {
      name: "",
    },
    onSubmit: async (values) => {
      const response = await validateNameHandler(values.name);

      if (!response) return;

      onFormSubmit(values);
    },
    validationSchema: toFormikValidationSchema(
      z.object({
        name: z
          .string({ required_error: t("name.required") })
          .min(1, { message: t("name.required") })
          .regex(SLUG_REGEXP, t("name.slug")),
      })
    ),
  });

  const validateNameHandler = async (name: string) => {
    const historyValue = history.current[name];
    if (historyValue) return historyValue;

    if (historyValue === false) {
      formik.setFieldError("name", t("name.unique"));
      return false;
    }

    const response = await onNameAvailableRequest(name);
    history.current[name] = response;

    if (response) return response;

    formik.setFieldError("name", t("name.unique"));

    return false;
  };

  return (
    <FormikProvider value={formik}>
      <Form
        {...rest}
        className={twMerge("grid grid-cols-1 gap-5", className)}
        aria-label={t("label")}
      >
        <ControlledInput
          name="name"
          label={t("name.label")}
          placeholder={t("name.placeholder")}
        />

        <div
          className={twMerge(
            "flex gap-3 flex-wrap justify-between items-center"
          )}
        >
          <Button onClick={onCancelClick} variant="bordered">
            {t("cancel")}
          </Button>
          <Button type="submit" color="primary">
            {t("submit")}
          </Button>
        </div>
      </Form>
    </FormikProvider>
  );
};
