"use client";

import { UserRoleSelect } from "@/components/UI/UserRoleSelect/UserStatusesSelect";
import { Button } from "@/components/base";
import { UserRoles } from "@prisma/client";
import { Form, FormikProvider, useFormik } from "formik";
import { useTranslations } from "next-intl";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";
import z from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

export type EditCompanyUserAcceptedRoles = Extract<
  UserRoles,
  "MODERATOR" | "RECRUITER"
>;

export type EditCompanyUserFormValue = {
  role: EditCompanyUserAcceptedRoles;
};

export type EditCompanyUserFormProps = ComponentPropsWithoutRef<"form"> & {
  label: string;
  onFormSubmit: (data: EditCompanyUserFormValue) => void;
  role: EditCompanyUserAcceptedRoles;
  submitText: string;
  cancelText: string;
  onCancelClick: () => void;
};

export const EditCompanyUserForm: FC<EditCompanyUserFormProps> = (props) => {
  const {
    role,
    submitText,
    onFormSubmit,
    cancelText,
    onCancelClick,
    label,
    className,
    ...rest
  } = props;
  const t = useTranslations("forms.edit-company-user");

  const formik = useFormik<EditCompanyUserFormValue>({
    initialValues: {
      role,
    },
    onSubmit: onFormSubmit,
    validationSchema: toFormikValidationSchema(
      z.object({
        role: z.nativeEnum(UserRoles, {
          required_error: t("role.required"),
        }),
      })
    ),
  });

  return (
    <FormikProvider value={formik}>
      <Form
        {...rest}
        className={twMerge("grid grid-cols-1 gap-5", className)}
        aria-label={label}
      >
        <UserRoleSelect
          label={t("role.label")}
          placeholder={t("role.placeholder")}
          acceptedRoles={[UserRoles.MODERATOR, UserRoles.RECRUITER]}
          onSelectChange={(role) => formik.setFieldValue("role", role)}
          isInvalid={!!formik.touched.role && !!formik.errors.role}
          errorMessage={formik.touched.role && formik.errors.role}
          selectedKeys={formik.values.role}
        />

        <div
          className={twMerge(
            "flex gap-3 flex-wrap justify-between items-center"
          )}
        >
          <Button onClick={onCancelClick} variant="bordered">
            {cancelText}
          </Button>
          <Button type="submit" color="primary">
            {submitText}
          </Button>
        </div>
      </Form>
    </FormikProvider>
  );
};
