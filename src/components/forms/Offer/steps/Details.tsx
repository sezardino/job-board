import { useMemo, type ComponentPropsWithoutRef, type FC } from "react";

import { ControlledInput, ControlledSelect } from "@/components/controlled";
import { MAX_STRING_LENGTH } from "@/const";
import { ActiveCategoriesResponse } from "@/services/server/modules/categories/schema";
import { ActiveIndustriesResponse } from "@/services/server/modules/industries/schema";
import { DataProp } from "@/types";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { FormWrapper } from "../../FormWrapper/FormWrapper";

export type OfferFormDetailsStepFormValues = {
  name: string;
  industry: string;
  category: string;
};

type Props = {
  initialValues?: Partial<OfferFormDetailsStepFormValues>;
  industries: DataProp<ActiveIndustriesResponse>;
  categories: DataProp<ActiveCategoriesResponse>;
  onSelectIndustry: (value: string) => void;
  onFormSubmit: (values: OfferFormDetailsStepFormValues) => void;
};

export type OfferFormDetailsStepProps = ComponentPropsWithoutRef<"form"> &
  Props;

export const OfferFormDetailsStep: FC<OfferFormDetailsStepProps> = (props) => {
  const {
    initialValues,
    categories,
    industries,
    onSelectIndustry,
    onFormSubmit,
    className,
    ...rest
  } = props;
  const t = useTranslations("forms.offer");
  const entityT = useTranslations("entity");

  const validationSchema = useMemo(
    () =>
      toFormikValidationSchema(
        z.object({
          name: z
            .string({ required_error: t("details.name.required") })
            .max(MAX_STRING_LENGTH, {
              message: t("details.name.max-length", {
                value: MAX_STRING_LENGTH,
              }),
            }),
          industry: z.string({
            required_error: t("details.industry.required"),
          }),
          category: z.string({
            required_error: t("details.category.required"),
          }),
        })
      ),
    [t]
  );

  const formik = useFormik<OfferFormDetailsStepFormValues>({
    onSubmit: onFormSubmit,
    validationSchema,
    initialValues: {
      name: "",
      industry: "",
      category: "",
      ...initialValues,
    },
  });

  const formattedIndustries = useMemo(
    () =>
      industries.data?.data.map((i) => ({
        id: i.name,
        label: entityT(`industries.${i.name}`),
      })) || [],
    [industries.data, entityT]
  );
  const formattedCategories = useMemo(
    () =>
      categories.data?.data.map((i) => ({
        id: i.id,
        label: entityT(`categories.${i.name}`),
      })) || [],
    [categories.data, entityT]
  );

  return (
    <FormWrapper
      {...rest}
      formik={formik}
      submit={{ label: t("next") }}
      cancel={{ label: t("cancel"), onClick: () => undefined }}
      className={twMerge("", className)}
    >
      <ControlledInput
        name="name"
        label={t("details.name.label")}
        placeholder={t("details.name.placeholder")}
        description={t("details.name.description")}
      />
      <ControlledSelect
        name="industry"
        isLoading={industries.isLoading}
        options={formattedIndustries}
        label={t("details.industry.label")}
        placeholder={t("details.industry.placeholder")}
        description={t("details.industry.description")}
        onAfterChange={onSelectIndustry}
      />

      <ControlledSelect
        name="category"
        isLoading={categories.isLoading}
        options={formattedCategories}
        label={t("details.category.label")}
        placeholder={t("details.category.placeholder")}
        disabled={!formik.values.industry}
        description={
          !formik.values.industry
            ? t("details.category.select-industry")
            : t("details.category.description")
        }
      />
    </FormWrapper>
  );
};
