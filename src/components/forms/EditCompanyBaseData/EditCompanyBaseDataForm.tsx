import { useMemo, type ComponentPropsWithoutRef, type FC } from "react";

import { AvatarFormField } from "@/components/UI/AvatarFormField/AvatarFormField";
import { ControlledInput } from "@/components/controlled";
import { MAX_STRING_LENGTH } from "@/const";
import { megabytesToBytes } from "@/utils";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { FormWrapper } from "../FormWrapper/FormWrapper";

export type EditCompanyBaseDataFormValues = {
  slogan: string;
  logo: string | File | null;
  isLogoDeleted: boolean;
};

type Props = {
  initialValues: EditCompanyBaseDataFormValues;
  onFormSubmit: (values: EditCompanyBaseDataFormValues) => void;
  cancel: { label: string; onClick: () => void };
  submitText: string;
};

export type EditCompanyBaseDataFormProps = ComponentPropsWithoutRef<"form"> &
  Props;

const SLOGAN_MIN_LENGTH = 5;
const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BITES = megabytesToBytes(MAX_FILE_SIZE_MB);
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg"];

export const EditCompanyBaseDataForm: FC<EditCompanyBaseDataFormProps> = (
  props
) => {
  const {
    submitText,
    cancel,
    initialValues,
    onFormSubmit,
    className,
    ...rest
  } = props;
  const t = useTranslations("forms.edit-company-base-data");

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      const valuesToSubmit = {} as EditCompanyBaseDataFormValues;

      if (values.slogan !== initialValues.slogan) {
        valuesToSubmit.slogan = values.slogan;
      }

      if (values.logo instanceof File) {
        valuesToSubmit.logo = values.logo;
      }

      if (initialValues.logo && values.logo === null) {
        valuesToSubmit.isLogoDeleted = true;
      }

      onFormSubmit(valuesToSubmit);
    },
    validationSchema: toFormikValidationSchema(
      z.object({
        slogan: z
          .string()
          .min(
            SLOGAN_MIN_LENGTH,
            t("slogan.min-length", { value: SLOGAN_MIN_LENGTH })
          )
          .max(
            MAX_STRING_LENGTH,
            t("slogan.max-length", { value: MAX_STRING_LENGTH })
          ),
        logo: z
          .any()
          .optional()
          .nullable()
          .refine(
            (file: File) => {
              if (!file) return true;
              return file?.size <= MAX_FILE_SIZE_BITES;
            },
            {
              message: t("logo.max-file-size", {
                value: MAX_FILE_SIZE_MB,
              }),
            }
          )
          .refine((file: File) => {
            if (!file) return true;
            if (file instanceof File) {
              ACCEPTED_IMAGE_TYPES.includes(file?.type);
            }
            return true;
          }, t("logo.formats", { value: ACCEPTED_IMAGE_TYPES.join(", ") })),
      })
    ),
  });

  const avatarSource = useMemo(() => {
    if (formik.values.logo === null) return undefined;

    if (typeof formik.values.logo === "string") return formik.values.logo;

    return URL.createObjectURL(formik.values.logo);
  }, [formik.values.logo]);

  const logoHasError = formik.touched.logo && !!formik.errors.logo;

  return (
    <FormWrapper
      {...rest}
      formik={formik}
      cancel={cancel}
      submit={{ label: submitText }}
      className={className}
    >
      <AvatarFormField
        src={avatarSource}
        onChange={(file) => formik.setFieldValue("logo", file)}
        label={t("logo.label")}
        remove={{
          text: t("logo.remove"),
          onClick: () => formik.setFieldValue("logo", null),
        }}
        error={logoHasError ? formik.errors.logo : undefined}
      />
      <ControlledInput name="slogan" />
    </FormWrapper>
  );
};
