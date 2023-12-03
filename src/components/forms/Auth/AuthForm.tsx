"use client";

import { Button } from "@/components/base";
import { ControlledInput } from "@/components/controlled";
import { Form, FormikProvider, useFormik } from "formik";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";
import z from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

export type AuthFormValues = {
  email: string;
  password: string;
  repeatPassword?: string;
};

type CopyProp = {
  submit: string;
  email: {
    label: string;
    placeholder: string;
    required: string;
    used?: string;
  };
  password: {
    label: string;
    placeholder: string;
    required: string;
    minLength: (min: number) => string;
  };
  repeatPassword?: {
    label: string;
    placeholder: string;
    required: string;
    notMatch: string;
  };
};

export type AuthFormProps = ComponentPropsWithoutRef<"form"> & {
  type: "login" | "registration";
  label: string;
  onFormSubmit: (data: AuthFormValues) => void;
  onEmailAvailableRequest?: (email: string) => Promise<boolean>;
  copy: CopyProp;
};

const MIN_PASSWORD_LENGTH = 6;

export const AuthForm: FC<AuthFormProps> = (props) => {
  const {
    onEmailAvailableRequest,
    copy,
    onFormSubmit,
    type,
    label,
    className,
    ...rest
  } = props;

  const formik = useFormik<AuthFormValues>({
    initialValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },
    onSubmit: async (values) => {
      if (type === "registration") {
        const response = await validateEmailHandler(values.email);

        if (!response) return;
      }

      onFormSubmit(values);
    },
    validationSchema: toFormikValidationSchema(
      z
        .object({
          email: z
            .string({ required_error: copy.email.required })
            .email()
            .min(1, { message: copy.email.required }),
          password: z.string({ required_error: copy.password.required }),
          // .min(MIN_PASSWORD_LENGTH, {
          //   message: copy.password.minLength(MIN_PASSWORD_LENGTH),
          // }),
          repeatPassword:
            type === "registration"
              ? z
                  .string({ required_error: copy.repeatPassword?.required })
                  .min(1, { message: copy.repeatPassword?.required })
              : z.optional(z.string()),
        })
        .refine(
          (data) =>
            type === "registration"
              ? data.password === data.repeatPassword
              : true,
          {
            path: ["repeatPassword"],
            message: copy.repeatPassword?.notMatch,
          }
        )
    ),
  });

  const validateEmailHandler = async (login: string) => {
    if (!onEmailAvailableRequest) return true;

    const response = await onEmailAvailableRequest(login);

    if (response) return true;

    formik.setFieldError("login", copy.email.used);

    return false;
  };

  return (
    <FormikProvider value={formik}>
      <Form
        {...rest}
        className={twMerge("grid grid-cols-1 gap-5", className)}
        aria-label={label}
      >
        <div className="grid grid-cols-1 gap-2">
          <ControlledInput
            name="email"
            label={copy.email.label}
            placeholder={copy.email.placeholder}
            onBlur={(evt) => validateEmailHandler(evt.currentTarget.value)}
          />

          <ControlledInput
            name="password"
            type="password"
            label={copy.password.label}
            placeholder={copy.password.placeholder}
          />
          {type === "registration" && (
            <ControlledInput
              type="password"
              name="repeatPassword"
              label={copy.repeatPassword?.label}
              placeholder={copy.repeatPassword?.placeholder}
            />
          )}
        </div>

        <Button type="submit" variant="bordered">
          {copy.submit}
        </Button>
      </Form>
    </FormikProvider>
  );
};
