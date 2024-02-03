import { type ComponentPropsWithoutRef, type FC } from "react";

import { useFormik } from "formik";
import { twMerge } from "tailwind-merge";
import { FormWrapper } from "../../FormWrapper/FormWrapper";
import { useTranslations } from "next-intl";

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

export const OfferFormDescriptionStep: FC<OfferFormDescriptionStepProps> = (
  props
) => {
  const { initialValues, onFormSubmit, onBackClick, className, ...rest } =
    props;
  const t = useTranslations("forms.offer");

  const formik = useFormik<OfferFormDescriptionStepFormValues>({
    onSubmit: onFormSubmit,
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
      <p>description</p>
    </FormWrapper>
  );
};
