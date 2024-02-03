import { useMemo, type ComponentPropsWithoutRef, type FC } from "react";

import { ControlledInput, ControlledSelect } from "@/components/controlled";
import {
  JobContract,
  JobOperatingMode,
  JobType,
  Salary,
  Seniority,
} from "@prisma/client";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
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
  onBackClick: (dirty: boolean) => void;
};

export type OfferFormSpecificationStepProps = ComponentPropsWithoutRef<"form"> &
  Props;

export const OfferFormSpecificationStep: FC<OfferFormSpecificationStepProps> = (
  props
) => {
  const { initialValues, onFormSubmit, onBackClick, className, ...rest } =
    props;
  const t = useTranslations("forms.offer");
  const entityT = useTranslations("entity");

  const validationSchema = useMemo(
    () =>
      toFormikValidationSchema(
        z.object({
          salary: z
            .object({
              from: z
                .number({
                  required_error: t("specification.salary-from.required"),
                })
                .positive(t("specification.salary-from.positive")),
              to: z
                .number({
                  required_error: t("specification.salary-to.required"),
                })
                .positive(t("specification.salary-to.positive")),
            })
            .refine((value) => value.from <= value.to, {
              path: ["to"],
              message: t("specification.salary-to.greater"),
            }),
          jobType: z.nativeEnum(JobType, {
            required_error: t("specification.job-type.required"),
          }),
          contract: z.nativeEnum(JobContract, {
            required_error: t("specification.contract.required"),
          }),
          operating: z.nativeEnum(JobOperatingMode, {
            required_error: t("specification.operating.required"),
          }),
          level: z.nativeEnum(Seniority, {
            required_error: t("specification.level.required"),
          }),
        })
      ),
    [t]
  );

  const formik = useFormik<OfferFormSpecificationStepFormValues>({
    onSubmit: onFormSubmit,
    validationSchema,
    initialValues: {
      salary: { from: 0, to: 0 },
      jobType: JobType.FULL_TIME,
      contract: JobContract.PERMANENT,
      operating: JobOperatingMode.OFFICE,
      level: Seniority.MID,
      ...initialValues,
    },
  });

  const jobTypeOptions = useMemo(
    () =>
      Object.values(JobType).map((value) => ({
        label: entityT(`job-type.${value}`),
        id: value,
      })),
    [entityT]
  );

  const contractOptions = useMemo(
    () =>
      Object.values(JobContract).map((value) => ({
        label: entityT(`job-contract.${value}`),
        id: value,
      })),
    [entityT]
  );

  const operatingOptions = useMemo(
    () =>
      Object.values(JobOperatingMode).map((value) => ({
        label: entityT(`operating.${value}`),
        id: value,
      })),
    [entityT]
  );

  const seniorityOptions = useMemo(
    () =>
      Object.values(Seniority).map((value) => ({
        label: entityT(`seniority.${value}`),
        id: value,
      })),
    [entityT]
  );

  return (
    <FormWrapper
      {...rest}
      formik={formik}
      submit={{ label: t("next") }}
      cancel={{ label: t("back"), onClick: () => onBackClick(formik.dirty) }}
      className={twMerge("", className)}
    >
      <div className="flex items-start gap-3 flex-wrap">
        <ControlledInput
          name="salary.from"
          type="number"
          label={t("specification.salary-from.label")}
          placeholder={t("specification.salary-from.placeholder")}
          className="flex-1 min-w-[220px]"
        />
        <ControlledInput
          name="salary.to"
          type="number"
          label={t("specification.salary-to.label")}
          placeholder={t("specification.salary-to.placeholder")}
          className="flex-1 min-w-[220px]"
        />
      </div>
      <ControlledSelect
        name="jobType"
        options={jobTypeOptions}
        label={t("specification.job-type.label")}
        placeholder={t("specification.job-type.placeholder")}
      />
      <ControlledSelect
        name="contract"
        options={contractOptions}
        label={t("specification.contract.label")}
        placeholder={t("specification.contract.placeholder")}
      />
      <ControlledSelect
        name="operating"
        options={operatingOptions}
        label={t("specification.operating.label")}
        placeholder={t("specification.operating.placeholder")}
      />
      <ControlledSelect
        name="level"
        options={seniorityOptions}
        label={t("specification.level.label")}
        placeholder={t("specification.level.placeholder")}
      />
    </FormWrapper>
  );
};
