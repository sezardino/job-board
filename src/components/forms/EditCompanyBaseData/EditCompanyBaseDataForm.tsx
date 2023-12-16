import { type ComponentPropsWithoutRef, type FC } from "react";

import { ControlledInput } from "@/components/controlled";
import { MAX_STRING_LENGTH } from "@/const";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { FormWrapper } from "../FormWrapper/FormWrapper";

export type EditCompanyBaseDataFormValues = {
  slogan: string;
  logo: string | File | null;
};

type Props = {
  initialValues: EditCompanyBaseDataFormValues;
  onFormSubmit: (values: EditCompanyBaseDataFormValues) => void;
  cancel: { label: string; onClick: () => void };
  submitText: string;
};

export type EditCompanyBaseDataFormProps = ComponentPropsWithoutRef<"form"> &
  Props;

const SLOGAN_MIN_LENGTH = 5;

export const EditCompanyBaseDataForm: FC<EditCompanyBaseDataFormProps> = (
  props
) => {
  const {
    submitText,
    cancel,
    initialValues,
    onFormSubmit,
    className,
    ...rest
  } = props;
  const t = useTranslations("forms.edit-company-base-data");

  const formik = useFormik({
    initialValues,
    onSubmit: onFormSubmit,
    validationSchema: toFormikValidationSchema(
      z.object({
        slogan: z
          .string()
          .min(
            SLOGAN_MIN_LENGTH,
            t("slogan.min-length", { value: SLOGAN_MIN_LENGTH })
          )
          .max(
            MAX_STRING_LENGTH,
            t("slogan.max-length", { value: MAX_STRING_LENGTH })
          ),
        logo: z.string().nullable(),
      })
    ),
  });

  return (
    <FormWrapper
      {...rest}
      formik={formik}
      cancel={cancel}
      submit={{ label: submitText }}
      className={className}
    >
      <ControlledInput name="slogan" />
    </FormWrapper>
  );
};
