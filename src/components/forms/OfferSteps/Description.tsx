import { useMemo, type ComponentPropsWithoutRef, type FC } from "react";

import { TitleDescription } from "@/components/UI/TitleDescription/TitleDescription";
import { ControlledWysiwygEditor } from "@/components/controlled/WysiwygEditor";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { FormWrapper } from "../FormWrapper/FormWrapper";

export type OfferFormDescriptionStepFormValues = {
  description: string;
};

type Props = {
  initialValues?: Partial<OfferFormDescriptionStepFormValues>;
  onFormSubmit: (values: OfferFormDescriptionStepFormValues) => void;
  onBackClick: (dirty: boolean) => void;
};

export type OfferFormDescriptionStepProps = ComponentPropsWithoutRef<"form"> &
  Props;

const MIN_DESCRIPTION_LENGTH = 50;
const MAX_DESCRIPTION_LENGTH = 10000;

export const OfferFormDescriptionStep: FC<OfferFormDescriptionStepProps> = (
  props
) => {
  const { initialValues, onFormSubmit, onBackClick, className, ...rest } =
    props;
  const t = useTranslations("forms.offer");

  const validationSchema = useMemo(
    () =>
      toFormikValidationSchema(
        z.object({
          description: z
            .string({
              required_error: t("description.field.required"),
            })
            .min(
              MIN_DESCRIPTION_LENGTH,
              t("description.field.min-length", {
                value: MIN_DESCRIPTION_LENGTH,
              })
            )
            .max(
              MAX_DESCRIPTION_LENGTH,
              t("description.field.max-length", {
                value: MAX_DESCRIPTION_LENGTH,
              })
            ),
        })
      ),
    [t]
  );

  const formik = useFormik<OfferFormDescriptionStepFormValues>({
    onSubmit: onFormSubmit,
    validationSchema,
    initialValues: {
      description: "",
      ...initialValues,
    },
  });

  return (
    <FormWrapper
      {...rest}
      formik={formik}
      submit={{ label: t("next") }}
      cancel={{ label: t("back"), onClick: () => onBackClick(formik.dirty) }}
      className={twMerge("", className)}
    >
      <TitleDescription
        titleLevel="h2"
        title={t("description.title")}
        description={t("description.description")}
      />
      <ControlledWysiwygEditor
        name="description"
        label={t("description.field.label")}
        placeholder={t("description.field.placeholder")}
        description={t("description.field.description")}
      />
    </FormWrapper>
  );
};
