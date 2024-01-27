"use client";

import { Grid, Typography } from "@/components/base";
import { ControlledInput } from "@/components/controlled";
import { MIN_PASSWORD_LENGTH } from "@/const";
import { useFormikHelper } from "@/hooks/use-formik-helper";
import { useStringVerification } from "@/hooks/use-string-verification";
import { Location } from "@prisma/client";
import { useTranslations } from "next-intl";
import { useMemo, type ComponentPropsWithoutRef, type FC } from "react";
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
    location: Location;
  };
};

export type CompanyRegistrationFormProps = ComponentPropsWithoutRef<"form"> & {
  onFormSubmit: (data: CompanyRegistrationFormValues) => void;
  onOwnerEmailAvailableRequest: (email: string) => Promise<boolean>;
  onCompanyNameAvailableRequest: (email: string) => Promise<boolean>;
};

const initialValues = {
  owner: {
    email: "",
    name: "",
    password: "",
    repeatPassword: "",
  },
  company: {
    name: "",
    location: {
      building: "",
      city: "",
      country: "",
      street: "",
      zipCode: "",
    },
  },
};

export const CompanyRegistrationForm: FC<CompanyRegistrationFormProps> = (
  props
) => {
  const {
    onFormSubmit,
    onOwnerEmailAvailableRequest,
    onCompanyNameAvailableRequest,
    ...rest
  } = props;
  const t = useTranslations("forms.register-company");
  const { validate: validateOwnerEmail } = useStringVerification({
    handler: onOwnerEmailAvailableRequest,
    onError: () => formik.setFieldError("owner.email", t("email.used")),
  });
  const { validate: validateCompanyName } = useStringVerification({
    handler: onCompanyNameAvailableRequest,
    onError: () => formik.setFieldError("company.name", t("name.used")),
  });

  const validationSchema = useMemo(
    () =>
      toFormikValidationSchema(
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
    [t]
  );

  const formik = useFormikHelper<CompanyRegistrationFormValues>({
    onSubmit: async (values) => {
      const isOwnerEmailAvailable = await validateOwnerEmail(
        values.owner.email
      );

      if (!isOwnerEmailAvailable) return;

      const isCompanyNameAvailable = await validateCompanyName(
        values.company.name
      );

      if (!isCompanyNameAvailable) return;

      onFormSubmit(values);
    },
    initialValues,
    validationSchema,
  });

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
          <ControlledInput
            name="company.name"
            label={t("name.label")}
            placeholder={t("name.placeholder")}
            className="flex-1 min-w-[220px]"
          />
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
