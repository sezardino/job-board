import { type ComponentPropsWithoutRef, type FC } from "react";

import { Skill } from "@prisma/client";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import { twMerge } from "tailwind-merge";
import { FormWrapper } from "../../FormWrapper/FormWrapper";

export type OfferFormSkillsStepFormValues = {
  skills: Skill[];
};

type Props = {
  initialValues?: Partial<OfferFormSkillsStepFormValues>;
  onFormSubmit: (values: OfferFormSkillsStepFormValues) => void;
  onBackClick: (dirty: boolean) => void;
};

export type OfferFormSkillsStepProps = ComponentPropsWithoutRef<"form"> & Props;

export const OfferFormSkillsStep: FC<OfferFormSkillsStepProps> = (props) => {
  const { initialValues, onFormSubmit, onBackClick, className, ...rest } =
    props;
  const t = useTranslations("forms.offer");

  const formik = useFormik<OfferFormSkillsStepFormValues>({
    onSubmit: onFormSubmit,
    initialValues: {
      skills: [],
      ...props.initialValues,
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
      <p>skills[]</p>
    </FormWrapper>
  );
};
