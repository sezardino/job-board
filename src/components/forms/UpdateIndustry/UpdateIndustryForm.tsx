"use client";

import { Button } from "@/components/base/Button/Button";
import { ControlledSelect } from "@/components/controlled";

import { EntityStatus } from "@prisma/client";
import { Form, FormikProvider, useFormik } from "formik";
import { useTranslations } from "next-intl";
import { useMemo, type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";
import z from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

export type UpdateIndustryFormValues = {
  status: EntityStatus;
};

export type UpdateIndustryFormProps = ComponentPropsWithoutRef<"form"> & {
  initialStatus: EntityStatus;
  onFormSubmit: (data: UpdateIndustryFormValues) => void;
  onCancelClick: () => void;
};

export const UpdateIndustryForm: FC<UpdateIndustryFormProps> = (props) => {
  const { initialStatus, onFormSubmit, onCancelClick, className, ...rest } =
    props;
  const t = useTranslations("forms.update-industry");
  const statusT = useTranslations("entity.status");

  const formik = useFormik<UpdateIndustryFormValues>({
    initialValues: {
      status: initialStatus,
    },
    onSubmit: onFormSubmit,
    validationSchema: toFormikValidationSchema(
      z.object({
        status: z.nativeEnum(EntityStatus, {
          required_error: t("status.required"),
        }),
      })
    ),
  });

  const statusOptions = useMemo(() => {
    return [
      {
        id: EntityStatus.CREATED,
        label: statusT(EntityStatus.CREATED),
        disabled: true,
      },
      {
        id: EntityStatus.ACTIVE,
        label: statusT(EntityStatus.ACTIVE),
      },
      {
        id: EntityStatus.INACTIVE,
        label: statusT(EntityStatus.INACTIVE),
      },
    ];
  }, [statusT]);

  return (
    <FormikProvider value={formik}>
      <Form
        {...rest}
        className={twMerge("grid grid-cols-1 gap-5", className)}
        aria-label={t("label")}
      >
        <ControlledSelect
          name="status"
          isMultiple={false}
          label={t("status.label")}
          placeholder={t("status.placeholder")}
          options={statusOptions}
        />

        <div
          className={twMerge(
            "flex gap-3 flex-wrap justify-between items-center"
          )}
        >
          <Button onClick={onCancelClick} variant="bordered">
            {t("cancel")}
          </Button>
          <Button type="submit" color="primary">
            {t("submit")}
          </Button>
        </div>
      </Form>
    </FormikProvider>
  );
};
