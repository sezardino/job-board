import { type ComponentPropsWithoutRef, type FC } from "react";

import { Skill } from "@prisma/client";
import { useFormik } from "formik";
import { twMerge } from "tailwind-merge";
import { FormWrapper } from "../../FormWrapper/FormWrapper";

export type OfferFormSkillsStepFormValues = {
  skills: Skill[];
};

type Props = {
  initialValues?: Partial<OfferFormSkillsStepFormValues>;
  onFormSubmit: (values: OfferFormSkillsStepFormValues) => void;
};

export type OfferFormSkillsStepProps = ComponentPropsWithoutRef<"form"> & Props;

export const OfferFormSkillsStep: FC<OfferFormSkillsStepProps> = (props) => {
  const { className, ...rest } = props;

  const formik = useFormik<OfferFormSkillsStepFormValues>({
    initialValues: {
      skills: [],
      ...props.initialValues,
    },
    onSubmit: () => {},
  });

  return (
    <FormWrapper
      {...rest}
      formik={formik}
      submit={{ label: "submit" }}
      cancel={{ label: "back", onClick: () => undefined }}
      className={twMerge("", className)}
    >
      <p>skills[]</p>
    </FormWrapper>
  );
};
