"use client";

import { UserRoleSelect } from "@/components/UI/UserRoleSelect/UserStatusesSelect";
import { Button } from "@/components/base/Button/Button";
import { UserRoles } from "@prisma/client";
import { Form, FormikProvider, useFormik } from "formik";
import { useTranslations } from "next-intl";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";
import z from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

export type CompanyUserAcceptedRoles = Extract<
  UserRoles,
  "MODERATOR" | "RECRUITER"
>;

export type CompanyUserFormValue = {
  role: CompanyUserAcceptedRoles;
};

export type CompanyUserFormProps = ComponentPropsWithoutRef<"form"> & {
  label: string;
  onFormSubmit: (data: CompanyUserFormValue) => void;
  role: CompanyUserAcceptedRoles;
  submitText: string;
  cancelText: string;
  onCancelClick: () => void;
};

export const CompanyUserForm: FC<CompanyUserFormProps> = (props) => {
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
  const t = useTranslations("forms.user");

  const formik = useFormik<CompanyUserFormValue>({
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
          <Button
            onClick={onCancelClick}
            variant="bordered"
            text={cancelText}
          />
          <Button type="submit" color="primary" text={submitText} />
        </div>
      </Form>
    </FormikProvider>
  );
};
