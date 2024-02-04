import { useMemo, type ComponentPropsWithoutRef, type FC } from "react";

import { TitleDescription } from "@/components/UI/TitleDescription/TitleDescription";
import { ControlledSelect } from "@/components/controlled";
import {
  JobContract,
  JobOperatingMode,
  JobType,
  Seniority,
} from "@prisma/client";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { FormWrapper } from "../FormWrapper/FormWrapper";

export type OfferFormSpecificationStepFormValues = {
  type: JobType;
  contract: JobContract[];
  operating: JobOperatingMode[];
  seniority: Seniority;
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
          type: z.nativeEnum(JobType, {
            required_error: t("specification.job-type.required"),
          }),
          contract: z
            .array(z.nativeEnum(JobContract))
            .min(1, t("specification.contract.required")),
          operating: z
            .array(z.nativeEnum(JobOperatingMode))
            .min(1, t("specification.operating.required")),
          seniority: z.nativeEnum(Seniority, {
            required_error: t("specification.seniority.required"),
          }),
        })
      ),
    [t]
  );

  const formik = useFormik<OfferFormSpecificationStepFormValues>({
    onSubmit: onFormSubmit,
    validationSchema,
    initialValues: {
      type: JobType.FULL_TIME,
      contract: [],
      operating: [],
      seniority: Seniority.MID,
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
      {JSON.stringify(formik.values)}
      <TitleDescription
        titleLevel="h2"
        title={t("specification.title")}
        description={t("specification.description")}
      />

      <ControlledSelect
        name="type"
        isMultiple={false}
        labelPlacement="inside"
        options={jobTypeOptions}
        label={t("specification.job-type.label")}
        placeholder={t("specification.job-type.placeholder")}
      />
      <ControlledSelect
        name="contract"
        labelPlacement="inside"
        isMultiple
        options={contractOptions}
        label={t("specification.contract.label")}
        placeholder={t("specification.contract.placeholder")}
      />
      <ControlledSelect
        name="operating"
        labelPlacement="inside"
        isMultiple
        options={operatingOptions}
        label={t("specification.operating.label")}
        placeholder={t("specification.operating.placeholder")}
      />
      <ControlledSelect
        name="seniority"
        labelPlacement="inside"
        isMultiple={false}
        options={seniorityOptions}
        label={t("specification.seniority.label")}
        placeholder={t("specification.seniority.placeholder")}
      />
    </FormWrapper>
  );
};
