"use client";

import { Button } from "@/components/base/Button/Button";
import { ControlledInput } from "@/components/controlled";
import { SLUG_REGEXP } from "@/const/regexp";
import { Form, FormikProvider, useFormik } from "formik";
import { useTranslations } from "next-intl";
import { useRef, type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";
import z from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

export type CreateIndustryFormValues = {
  name: string;
};

export type CreateIndustryFormProps = ComponentPropsWithoutRef<"form"> & {
  onFormSubmit: (data: CreateIndustryFormValues) => void;
  onNameAvailableRequest: (email: string) => Promise<boolean>;
  onCancelClick: () => void;
};

export const CreateIndustryForm: FC<CreateIndustryFormProps> = (props) => {
  const {
    onNameAvailableRequest,
    onFormSubmit,
    onCancelClick,
    className,
    ...rest
  } = props;
  const t = useTranslations("forms.industry");
  const history = useRef<Record<string, boolean>>({});

  const formik = useFormik<CreateIndustryFormValues>({
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
          <Button
            onClick={onCancelClick}
            variant="bordered"
            text={t("cancel")}
          />
          <Button type="submit" color="primary" text={t("submit")} />
        </div>
      </Form>
    </FormikProvider>
  );
};
