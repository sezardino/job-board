"use client";

import { Grid, Typography } from "@/components/base";
import { ControlledInput } from "@/components/controlled";
import { MIN_PASSWORD_LENGTH } from "@/const";
import { Location } from "@prisma/client";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import { useRef, type ComponentPropsWithoutRef, type FC } from "react";
import z from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { FormWrapper } from "../FormWrapper/FormWrapper";

export type CompanyRegistrationFormValues = {
  owner: {
    name: string;
    email: string;
    password: string;
    repeatPassword: string;
  };
  company: {
    name: string;
    email: string;
    location: Location;
  };
};

export type CompanyRegistrationFormProps = ComponentPropsWithoutRef<"form"> & {
  onFormSubmit: (data: CompanyRegistrationFormValues) => void;
  onOwnerEmailAvailableRequest: (email: string) => Promise<boolean>;
  onCompanyEmailAvailableRequest: (email: string) => Promise<boolean>;
};

export const CompanyRegistrationForm: FC<CompanyRegistrationFormProps> = (
  props
) => {
  const {
    onFormSubmit,
    onOwnerEmailAvailableRequest,
    onCompanyEmailAvailableRequest,
    ...rest
  } = props;
  const t = useTranslations("forms.register-company");
  const checkOwnerEmailHistory = useRef<Record<string, boolean>>({});
  const checkCompanyEmailHistory = useRef<Record<string, boolean>>({});

  const formik = useFormik<CompanyRegistrationFormValues>({
    onSubmit: async () => undefined,
    initialValues: {
      owner: {
        email: "",
        name: "",
        password: "",
        repeatPassword: "",
      },
      company: {
        email: "",
        name: "",
        location: {
          building: "",
          city: "",
          country: "",
          street: "",
          zipCode: "",
        },
      },
    },
    validationSchema: toFormikValidationSchema(
      z.object({
        owner: z
          .object({
            email: z
              .string({ required_error: t("email.required") })
              .email(t("email.invalid")),
            name: z.string({ required_error: t("name.required") }),
            password: z
              .string({ required_error: t("password.required") })
              .min(
                MIN_PASSWORD_LENGTH,
                t("password.short", { value: MIN_PASSWORD_LENGTH })
              ),
            repeatPassword: z.string({
              required_error: t("repeat-password.required"),
            }),
          })
          .refine((data) => data.password === data.repeatPassword, {
            path: ["repeatPassword"],
            message: t("repeat-password.not-match"),
          }),
        company: z.object({
          email: z
            .string({ required_error: t("email.required") })
            .email(t("email.invalid")),
          name: z.string({ required_error: t("name.required") }),
          location: z.object({
            building: z.string({ required_error: t("building.required") }),
            city: z.string({ required_error: t("city.required") }),
            country: z.string({ required_error: t("country.required") }),
            street: z.string({ required_error: t("street.required") }),
            zipCode: z.string({ required_error: t("zip-code.required") }),
          }),
        }),
      })
    ),
  });

  const validateOwnerEmailHandler = async (email: string) => {
    if (!onOwnerEmailAvailableRequest) return true;

    const historyValue = checkOwnerEmailHistory.current[email];
    if (historyValue) return historyValue;

    if (historyValue === false) {
      formik.setFieldError("email", t("email.used"));
      return false;
    }

    const response = await onCompanyEmailAvailableRequest(email);
    checkOwnerEmailHistory.current[email] = response;

    if (response) return response;

    formik.setFieldError("email", t("email.used"));

    return false;
  };

  return (
    <FormWrapper
      {...rest}
      formik={formik}
      submit={{ label: t("trigger"), isFullWidth: true }}
    >
      <Grid gap={6}>
        <Grid gap={4}>
          <Typography tag="h2" styling="lg">
            {t("owner")}
          </Typography>
          <div className="flex flex-wrap gap-2 items-start">
            <ControlledInput
              name="owner.name"
              label={t("name.label")}
              placeholder={t("name.placeholder")}
              className="flex-1 min-w-[220px]"
            />
            <ControlledInput
              name="owner.email"
              label={t("email.label")}
              placeholder={t("email.placeholder")}
              className="flex-1 min-w-[220px]"
            />
          </div>

          <ControlledInput
            name="owner.password"
            type="password"
            label={t("password.label")}
            placeholder={t("password.placeholder")}
          />
          <ControlledInput
            name="owner.repeatPassword"
            type="password"
            label={t("repeat-password.label")}
            placeholder={t("repeat-password.placeholder")}
          />
        </Grid>
        <Grid gap={4}>
          <Typography tag="h2" styling="lg">
            {t("company")}
          </Typography>
          <div className="flex flex-wrap gap-2 items-start">
            <ControlledInput
              name="company.name"
              label={t("name.label")}
              placeholder={t("name.placeholder")}
              className="flex-1 min-w-[220px]"
            />
            <ControlledInput
              name="company.email"
              label={t("email.label")}
              placeholder={t("email.placeholder")}
              className="flex-1 min-w-[220px]"
            />
          </div>
          <div className="flex flex-wrap gap-2 items-start">
            <ControlledInput
              name="company.location.country"
              label={t("country.label")}
              placeholder={t("country.placeholder")}
              className="flex-1 min-w-[220px]"
            />
            <ControlledInput
              name="company.location.city"
              label={t("city.label")}
              placeholder={t("city.placeholder")}
              className="flex-1 min-w-[220px]"
            />
          </div>
          <ControlledInput
            name="company.location.street"
            label={t("street.label")}
            placeholder={t("street.placeholder")}
          />

          <div className="flex flex-wrap gap-2 items-start">
            <ControlledInput
              name="company.location.building"
              label={t("building.label")}
              placeholder={t("building.placeholder")}
              className="flex-1 min-w-[220px]"
            />
            <ControlledInput
              name="company.location.zipCode"
              label={t("zip-code.label")}
              placeholder={t("zip-code.placeholder")}
              className="flex-1 min-w-[220px]"
            />
          </div>
        </Grid>
      </Grid>
    </FormWrapper>
  );
};
