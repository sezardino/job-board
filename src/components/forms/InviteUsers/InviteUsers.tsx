"use client";

import { UserRoleSelect } from "@/components/UI/UserRoleSelect/UserStatusesSelect";
import { Button } from "@/components/base/Button/Button";
import { Icon } from "@/components/base/Icon/Icon";
import { ControlledInput } from "@/components/controlled";
import { UserRoles } from "@prisma/client";
import { FieldArray, Form, FormikProvider, useFormik } from "formik";
import { useTranslations } from "next-intl";
import { useRef, type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";
import z from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

export type InviteUsersFormValues = {
  users: { email: string; role: UserRoles }[];
};

export type InviteUsersFormProps = ComponentPropsWithoutRef<"form"> & {
  type?: "admin" | "company";
  label: string;
  onFormSubmit: (data: InviteUsersFormValues) => void;
  onValidateEmailsRequest: (args: {
    emails: string[];
  }) => Promise<Record<string, boolean>>;

  submitText: string;
  cancel: {
    label: string;
    onClick?: () => void;
  };
};

const emptyUser = { email: "", role: undefined as unknown as UserRoles };
const subAdminUser = { email: "", role: UserRoles.SUB_ADMIN };

export const InviteUsersForm: FC<InviteUsersFormProps> = (props) => {
  const {
    type = "company",
    onValidateEmailsRequest,
    cancel,
    submitText,
    onFormSubmit,
    label,
    className,
    ...rest
  } = props;
  const t = useTranslations("forms.invite-users");
  const validationHistory = useRef<Record<string, boolean>>({});

  const formik = useFormik<InviteUsersFormValues>({
    initialValues: {
      users: [type === "admin" ? subAdminUser : emptyUser],
    },
    onSubmit: async (values) => {
      const response = await validateEmailHandler(
        values.users.map((u) => u.email)
      );

      if (!response) return;

      onFormSubmit(values);
    },
    validationSchema: toFormikValidationSchema(
      z.object({
        users: z
          .array(
            z.object({
              email: z
                .string({ required_error: t("email.required") })
                .email()
                .min(1, { message: t("email.required") }),
              role: z.nativeEnum(UserRoles, {
                required_error: t("role.required"),
              }),
            })
          )
          .superRefine((values, ctx) => {
            if (values.length > 1) {
              values.forEach(({ email }, index) => {
                const emails = values.map((v) => v.email);

                if (emails.indexOf(email) !== index) {
                  ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: t("email.repeat"),
                    path: [`[${index}].email`],
                  });
                }
              });
            }
          }),
      })
    ),
  });

  const validateEmailHandler = async (emails: string[]) => {
    const preValidationCheck = emails.map<[string, boolean]>((e) => {
      const validation = validationHistory.current[e] ?? false;

      return [e, validation];
    });

    if (preValidationCheck.every(([_, v]) => v === true)) return true;

    const needToValidate = preValidationCheck
      .filter(([_, v]) => v === false)
      .map(([e]) => e);

    const res = await onValidateEmailsRequest({ emails: needToValidate });
    validationHistory.current = { ...validationHistory.current, ...res };

    const nextCheck = Object.fromEntries(
      emails.map<[string, boolean]>((e) => {
        const validation = validationHistory.current[e] ?? false;

        return [e, validation];
      })
    );

    if (Object.values(nextCheck).every((v) => v === true)) return true;

    const errors = emails.map((email, i) => {
      if (nextCheck[email]) {
        return false;
      } else {
        return true;
      }
    });

    Object.values(errors).forEach((_, i) => {
      formik.setFieldError(`users[${i}].email`, "used");
    });

    return false;
  };

  return (
    <FormikProvider value={formik}>
      <Form
        {...rest}
        className={twMerge("grid grid-cols-1 gap-5", className)}
        aria-label={label}
      >
        <FieldArray
          name="users"
          render={(helpers) => (
            <div className="grid grid-cols-1 gap-2">
              {formik.values.users.map((_, i) => (
                <div
                  key={i}
                  className={twMerge(
                    "grid items-start gap-1",
                    type === "company"
                      ? "grid-cols-[1fr_1fr_auto]"
                      : "grid-cols-[1fr_auto]"
                  )}
                >
                  <ControlledInput
                    name={`users.[${i}].email`}
                    label={t("email.label")}
                    placeholder={t("email.placeholder")}
                  />
                  {type === "company" && (
                    <UserRoleSelect
                      label={t("role.label")}
                      placeholder={t("role.placeholder")}
                      acceptedRoles={[UserRoles.MODERATOR, UserRoles.RECRUITER]}
                      onSelectChange={(role) =>
                        formik.setFieldValue(`users.[${i}].role`, role)
                      }
                      isInvalid={
                        !!formik.touched.users?.[i]?.role &&
                        // @ts-ignore
                        !!formik.errors.users?.[i]?.role
                      }
                      errorMessage={
                        formik.touched.users?.[i]?.role &&
                        // @ts-ignore
                        formik.errors.users?.[i]?.role
                      }
                      selectedKeys={formik.values.users[i].role}
                    />
                  )}
                  <Button
                    isIconOnly
                    color="danger"
                    variant="light"
                    isDisabled={formik.values.users.length === 1}
                    className="mt-6"
                    onClick={() => helpers.remove(i)}
                    aria-label={t("remove")}
                  >
                    <Icon name="HiTrash" size={16} />
                  </Button>
                </div>
              ))}
              <Button
                isIconOnly
                isDisabled={formik.values.users.length === 5}
                className="justify-self-center"
                onClick={() =>
                  helpers.push(type === "admin" ? subAdminUser : emptyUser)
                }
                aria-label={t("add")}
              >
                <Icon name="HiPlus" size={16} />
              </Button>
            </div>
          )}
        />

        <div
          className={twMerge(
            "flex gap-3 flex-wrap justify-between items-center"
          )}
        >
          <Button onClick={cancel.onClick} variant="bordered">
            {cancel.label}
          </Button>
          <Button type="submit" color="primary" fullWidth={!cancel}>
            {submitText}
          </Button>
        </div>
      </Form>
    </FormikProvider>
  );
};
