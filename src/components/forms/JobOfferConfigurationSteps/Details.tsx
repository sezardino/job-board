import {
  useCallback,
  useMemo,
  type ComponentPropsWithoutRef,
  type FC,
} from "react";

import { TitleDescription } from "@/components/UI/TitleDescription/TitleDescription";
import { Icon } from "@/components/base";
import { ControlledInput, ControlledSelect } from "@/components/controlled";
import { MAX_STRING_LENGTH } from "@/const";
import { ActiveCategoriesResponse } from "@/services/bll/modules/categories/schema";
import { ActiveIndustriesResponse } from "@/services/bll/modules/industries/schema";
import { DataProp } from "@/types";
import { Button } from "@nextui-org/react";
import { Salary } from "@prisma/client";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { FormWrapper } from "../FormWrapper/FormWrapper";

export type OfferFormDetailsStepFormValues = {
  name: string;
  industry: string;
  category: string;
  salary: Salary | null;
};

type Props = {
  initialValues?: Partial<OfferFormDetailsStepFormValues>;
  industries: DataProp<ActiveIndustriesResponse>;
  categories: DataProp<ActiveCategoriesResponse>;
  onSelectIndustry: (value: string) => void;
  onFormSubmit: (values: OfferFormDetailsStepFormValues) => void;
  onCancelClick: () => void;
};

export type OfferFormDetailsStepProps = ComponentPropsWithoutRef<"form"> &
  Props;

const initialSalary = { from: 0, to: 0 };

export const OfferFormDetailsStep: FC<OfferFormDetailsStepProps> = (props) => {
  const {
    initialValues,
    categories,
    industries,
    onSelectIndustry,
    onFormSubmit,
    onCancelClick,
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
          salary: z
            .object({
              from: z
                .number({
                  required_error: t("details.salary.from.required"),
                })
                .positive(t("details.salary.from.positive")),
              to: z
                .number({
                  required_error: t("details.salary.to.required"),
                })
                .positive(t("details.salary.to.positive")),
            })
            .nullable()
            .refine((value) => (value ? value.from <= value.to : true), {
              path: ["to"],
              message: t("details.salary.to.greater"),
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
      salary: null,
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
        id: i.name,
        label: entityT(`categories.${i.name}`),
      })) || [],
    [categories.data, entityT]
  );

  const onAfterIndustrySelect = useCallback(
    (value: string) => {
      if (!value) return;
      if (formik.values.industry === value) return;
      onSelectIndustry(value);
      formik.setFieldValue("category", "");
    },
    [formik, onSelectIndustry]
  );

  const addSalaryRange = useCallback(() => {
    formik.setFieldValue("salary", initialSalary);
    formik.setFieldTouched("salary", false);
    formik.setFieldTouched("salary", false);
  }, [formik]);

  const removeSalaryRange = useCallback(() => {
    formik.setFieldValue("salary", null);
    formik.setFieldTouched("salary", true);
  }, [formik]);

  return (
    <FormWrapper
      {...rest}
      formik={formik}
      submit={{ label: t("next") }}
      cancel={{ label: t("cancel"), onClick: onCancelClick }}
      className={twMerge("", className)}
    >
      <TitleDescription
        titleLevel="h2"
        titleStyling="md"
        title={t("details.title")}
        description={t("details.description")}
      />
      <ControlledInput
        name="name"
        labelPlacement="inside"
        label={t("details.name.label")}
        placeholder={t("details.name.placeholder")}
        description={t("details.name.description")}
      />
      <ControlledSelect
        name="industry"
        isMultiple={false}
        labelPlacement="inside"
        isLoading={industries.isLoading}
        options={formattedIndustries}
        label={t("details.industry.label")}
        placeholder={t("details.industry.placeholder")}
        description={t("details.industry.description")}
        onAfterChange={onAfterIndustrySelect}
      />

      <ControlledSelect
        name="category"
        isMultiple={false}
        labelPlacement="inside"
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
      <div className="flex flex-col gap-2 items-center">
        {!formik.values.salary && (
          <Button variant="bordered" color="primary" onClick={addSalaryRange}>
            {t("details.salary.add")}
          </Button>
        )}
        {formik.values.salary && (
          <>
            <div className="w-full flex items-start gap-3 flex-wrap">
              <ControlledInput
                name="salary.from"
                labelPlacement="inside"
                type="number"
                label={t("details.salary.from.label")}
                placeholder={t("details.salary.from.placeholder")}
                className="flex-1 min-w-[220px]"
              />
              <ControlledInput
                name="salary.to"
                type="number"
                labelPlacement="inside"
                label={t("details.salary.to.label")}
                placeholder={t("details.salary.to.placeholder")}
                className="flex-1 min-w-[220px]"
              />
            </div>
            <Button
              onClick={removeSalaryRange}
              isIconOnly
              color="danger"
              size="sm"
              aria-label={t("details.salary.remove")}
            >
              <Icon name="TbTrash" size={16} />
            </Button>
          </>
        )}
      </div>
    </FormWrapper>
  );
};
