import { useMemo, type ComponentPropsWithoutRef, type FC } from "react";

import { ImageFormField } from "@/components/UI/ImageFormField/ImageFormField";
import { ControlledInput } from "@/components/controlled";
import { MAX_STRING_LENGTH } from "@/const";
import { megabytesToBytes } from "@/utils";
import { Form, FormikProvider, useFormik } from "formik";
import { useTranslations } from "next-intl";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

export type UserProfileFormValues = {
  name: string;
  avatar: string | File | null;
};

type Props = {
  initialValues: UserProfileFormValues;
  onFormSubmit: (values: UserProfileFormValues) => void;
};

export type UserProfileFormProps = ComponentPropsWithoutRef<"form"> & Props;

const NAME_MIN_LENGTH = 5;
const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BITES = megabytesToBytes(MAX_FILE_SIZE_MB);
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg"];

export const UserProfileForm: FC<UserProfileFormProps> = (props) => {
  const { initialValues, onFormSubmit, className, ...rest } = props;
  const t = useTranslations("forms.shared.user-profile");

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      const valuesToSubmit = {} as UserProfileFormValues;

      if (values.name !== initialValues.name) {
        valuesToSubmit.name = values.name;
      }

      if (values.avatar instanceof File) {
        valuesToSubmit.avatar = values.avatar;
      }

      if (initialValues.avatar && values.avatar === null) {
        valuesToSubmit.avatar = null;
      }

      if (Object.keys(valuesToSubmit).length === 0) return Promise.reject();

      onFormSubmit(valuesToSubmit);
    },
    validationSchema: toFormikValidationSchema(
      z.object({
        name: z
          .string()
          .min(
            NAME_MIN_LENGTH,
            t("name.min-length", { value: NAME_MIN_LENGTH })
          )
          .max(
            MAX_STRING_LENGTH,
            t("name.max-length", { value: MAX_STRING_LENGTH })
          )
          .optional(),
        avatar: z
          .any()
          .optional()
          .nullable()
          .refine(
            (file: File) => {
              if (!file) return true;
              if (file instanceof File) {
                return file?.size <= MAX_FILE_SIZE_BITES;
              }

              return true;
            },
            {
              message: t("avatar.max-file-size", {
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
          }, t("avatar.formats", { value: ACCEPTED_IMAGE_TYPES.join(", ") })),
      })
    ),
  });

  const avatarSource = useMemo(() => {
    if (formik.values.avatar === null) return undefined;

    if (typeof formik.values.avatar === "string") return formik.values.avatar;

    return URL.createObjectURL(formik.values.avatar);
  }, [formik.values.avatar]);

  const avatarHasError = formik.touched.avatar && !!formik.errors.avatar;

  return (
    <FormikProvider value={formik}>
      <Form {...rest} className={twMerge("grid grid-cols-1 gap-3", className)}>
        <ImageFormField
          src={avatarSource}
          onChange={(file) => formik.setFieldValue("avatar", file)}
          label={t("avatar.label")}
          remove={{
            text: t("avatar.remove"),
            onClick: () => formik.setFieldValue("avatar", null),
          }}
          error={avatarHasError ? formik.errors.avatar : undefined}
        />

        <ControlledInput name="name" label={t("name.label")} />
      </Form>
    </FormikProvider>
  );
};
