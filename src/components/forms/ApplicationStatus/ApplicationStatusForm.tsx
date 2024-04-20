import { ControlledSelect, ControlledTextarea } from "@/components/controlled";
import { ApplicationStatus } from "@prisma/client";
import { Form, FormikProvider, useFormik } from "formik";
import { useTranslations } from "next-intl";
import { ComponentPropsWithoutRef, FC, useCallback, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

import styles from "./ApplicationStatusForm.module.scss";

export type ApplicationStatusFormValues = {
  status: ApplicationStatus;
  message?: string;
};

type Props = {
  initialStatus: ApplicationStatus;
  onFormSubmit: (values: ApplicationStatusFormValues) => void;
};

export type ApplicationStatusFormProps = ComponentPropsWithoutRef<"form"> &
  Props;

export const ApplicationStatusForm: FC<ApplicationStatusFormProps> = (
  props
) => {
  const { initialStatus, onFormSubmit, className, ...rest } = props;
  const t = useTranslations("forms.company.application-status");
  const statusT = useTranslations("entity.applications.status");

  const validationSchema = useMemo(
    () =>
      toFormikValidationSchema(
        z
          .object({
            status: z.nativeEnum(ApplicationStatus, {
              required_error: t("validation.status.required"),
            }),
            message: z.string().optional(),
          })
          .refine(
            ({ status, message }) =>
              status === ApplicationStatus.REJECTED
                ? message !== undefined
                : true,
            {
              message: t("validation.message-required"),
              path: ["message"],
            }
          )
      ),
    [t]
  );

  const formik = useFormik<ApplicationStatusFormValues>({
    validationSchema,
    onSubmit: onFormSubmit,
    initialValues: {
      status: initialStatus,
      message: "",
    },
  });

  const statusOptions = useMemo(
    () => [
      { id: ApplicationStatus.NEW, label: statusT(ApplicationStatus.NEW) },
      {
        id: ApplicationStatus.PRE_SCREENING,
        label: statusT(ApplicationStatus.PRE_SCREENING),
      },
      {
        id: ApplicationStatus.SCREENING,
        label: statusT(ApplicationStatus.SCREENING),
      },
      {
        id: ApplicationStatus.INTERVIEW,
        label: statusT(ApplicationStatus.INTERVIEW),
      },
      {
        id: ApplicationStatus.PRE_OFFER,
        label: statusT(ApplicationStatus.PRE_OFFER),
      },
      { id: ApplicationStatus.OFFER, label: statusT(ApplicationStatus.OFFER) },
      {
        id: ApplicationStatus.REJECTED,
        label: statusT(ApplicationStatus.REJECTED),
      },
    ],
    [statusT]
  );

  const afterChangeStatus = useCallback(
    (status: ApplicationStatus) => {
      if (status !== ApplicationStatus.REJECTED) {
        formik.setFieldValue("message", "");
        formik.setFieldTouched("message", false);
      }
    },
    [formik]
  );

  const isMessageFieldDisabled = initialStatus === ApplicationStatus.REJECTED;

  return (
    <FormikProvider value={formik}>
      <Form {...rest} className={twMerge(styles.element, className)}>
        <ControlledSelect<ApplicationStatus, false>
          name="status"
          isMultiple={false}
          onAfterChange={afterChangeStatus}
          options={statusOptions}
        />

        {formik.values.status === ApplicationStatus.REJECTED && (
          <ControlledTextarea
            name="message"
            isDisabled={isMessageFieldDisabled}
            label={t("message.label")}
            placeholder={t("message.placeholder")}
            description={
              isMessageFieldDisabled ? t("message.disabled") : undefined
            }
          />
        )}
      </Form>
    </FormikProvider>
  );
};
