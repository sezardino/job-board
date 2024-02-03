import { type ComponentPropsWithoutRef, type FC } from "react";

import {
  JobContract,
  JobOperatingMode,
  JobType,
  Salary,
  Seniority,
} from "@prisma/client";
import { useFormik } from "formik";
import { twMerge } from "tailwind-merge";
import { FormWrapper } from "../../FormWrapper/FormWrapper";

export type OfferFormSpecificationStepFormValues = {
  salary: Salary;
  jobType: JobType;
  contract: JobContract;
  operating: JobOperatingMode;
  level: Seniority;
};

type Props = {
  initialValues?: Partial<OfferFormSpecificationStepFormValues>;
  onFormSubmit: (values: OfferFormSpecificationStepFormValues) => void;
};

export type OfferFormSpecificationStepProps = ComponentPropsWithoutRef<"form"> &
  Props;

export const OfferFormSpecificationStep: FC<OfferFormSpecificationStepProps> = (
  props
) => {
  const { initialValues, className, ...rest } = props;

  const formik = useFormik<OfferFormSpecificationStepFormValues>({
    initialValues: {
      salary: { from: 0, to: 0 },
      jobType: JobType.FULL_TIME,
      contract: JobContract.PERMANENT,
      operating: JobOperatingMode.OFFICE,
      level: Seniority.MID,
      ...initialValues,
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
      <p>salary job type contract operating level</p>
    </FormWrapper>
  );
};
