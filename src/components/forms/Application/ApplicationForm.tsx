import { Button } from "@/components/base/Button/Button";
import { FileInputFileAcceptedTypes } from "@/components/base/FileInput/FileInput.const";
import { checkFilesType } from "@/components/base/FileInput/FileInput.helpers";
import { ControlledInput, ControlledTextarea } from "@/components/controlled";
import { ControlledCheckbox } from "@/components/controlled/Checkbox";
import { ControlledFileInput } from "@/components/controlled/FileInput";
import { MAX_STRING_LENGTH } from "@/const";
import { megabytesToBytes } from "@/utils";
import { Form, FormikProvider, useFormik } from "formik";
import { useTranslations } from "next-intl";
import { ComponentPropsWithoutRef, FC, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

export type ApplicationFormValues = {
  name: string;
  email: string;
  message: string;
  dataProcessing: boolean;
  futureRecruitment: boolean;
  file?: FileList;
};

const initialValues: ApplicationFormValues = {
  name: "",
  email: "",
  message: "",
  dataProcessing: false,
  futureRecruitment: false,
  file: undefined,
};

const MAX_CV_FILE_SIZE_MB = 5;
const MAX_CV_FILE_SIZE_BYTES = megabytesToBytes(MAX_CV_FILE_SIZE_MB);
const ACCEPTED_CV_FILE_TYPES: FileInputFileAcceptedTypes[] = ["pdf"];

type Props = {
  isDisabled?: boolean;
  onFormSubmit: (values: ApplicationFormValues) => void;
};

export type ApplicationFormProps = ComponentPropsWithoutRef<"form"> & Props;

export const ApplicationForm: FC<ApplicationFormProps> = (props) => {
  const { isDisabled, onFormSubmit, className, ...rest } = props;
  const t = useTranslations("forms.company.application");

  const validationSchema = useMemo(
    () =>
      toFormikValidationSchema(
        z.object({
          name: z
            .string({ required_error: t("name.required") })
            .max(
              MAX_STRING_LENGTH,
              t("name.max-length", { value: MAX_STRING_LENGTH })
            ),
          email: z
            .string({ required_error: t("email.required") })
            .email(t("email.invalid"))
            .max(
              MAX_STRING_LENGTH,
              t("email.max-length", { value: MAX_STRING_LENGTH })
            ),
          message: z
            .string()
            .max(
              MAX_STRING_LENGTH,
              t("message.max-length", { value: MAX_STRING_LENGTH })
            )
            .optional(),
          dataProcessing: z
            .boolean()
            .refine((value) => value === true, t("data-processing.required")),
          futureRecruitment: z.boolean(),
          file: z
            .any()
            .refine(
              (file) => (file ? file instanceof File : undefined),
              t("file.required")
            )
            .refine(
              (file) =>
                file instanceof File
                  ? file.size <= MAX_CV_FILE_SIZE_BYTES
                  : false,
              t("file.max-size", { value: MAX_CV_FILE_SIZE_MB })
            )
            .refine((file) => checkFilesType([file], ["pdf"]), {
              message: t("file.formats", {
                value: ACCEPTED_CV_FILE_TYPES.join(", "),
              }),
            }),
        })
      ),
    [t]
  );

  const formik = useFormik<ApplicationFormValues>({
    initialValues,
    validationSchema,
    onSubmit: onFormSubmit,
  });

  return (
    <FormikProvider value={formik}>
      <Form {...rest} className={twMerge("grid grid-cols-1 gap-4", className)}>
        <div className="flex gap-4 flex-col lg:flex-row flex-wrap">
          <ControlledInput
            name="name"
            label={t("name.label")}
            placeholder={t("name.placeholder")}
            className="flex-1"
            isDisabled={isDisabled}
          />
          <ControlledInput
            name="email"
            label={t("email.label")}
            placeholder={t("email.placeholder")}
            className="flex-1"
            isDisabled={isDisabled}
          />
        </div>
        <ControlledTextarea
          name="message"
          label={t("message.label")}
          placeholder={t("message.placeholder")}
          isDisabled={isDisabled}
        />

        <ControlledFileInput
          name="file"
          label={t("file.label")}
          allowedFileTypes={["pdf"]}
          isMultiple={false}
          noFileString={t("file.placeholder")}
          isDisabled={isDisabled}
        />

        <ControlledCheckbox
          name="dataProcessing"
          label={t("data-processing.label")}
          isDisabled={isDisabled}
        />

        <ControlledCheckbox
          name="futureRecruitment"
          label={t("future-recruitment.label")}
          isDisabled={isDisabled}
        />

        <Button
          isDisabled={isDisabled}
          type="submit"
          color="primary"
          text={t("submit")}
        />
      </Form>
    </FormikProvider>
  );
};
