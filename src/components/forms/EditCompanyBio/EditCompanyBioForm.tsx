import { Grid, Typography } from "@/components/base";
import { useFormField } from "@/hooks/use-form-field";
import { useFormik } from "formik";
import dynamic from "next/dynamic";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { FormWrapper } from "../FormWrapper/FormWrapper";

const WysiwygEditor = dynamic(
  () => import("@/components/UI/WysiwygEditor/WysiwygEditor"),
  { ssr: false }
);

export type EditCompanyBioFormValues = {
  bio: string;
};

type Props = {
  initialValues: EditCompanyBioFormValues;
  cancel: { label: string; onClick: () => void };
  submitText: string;
  onFormSubmit: (values: EditCompanyBioFormValues) => void;
};

export type EditCompanyBioFormProps = ComponentPropsWithoutRef<"form"> & Props;

export const EditCompanyBioForm: FC<EditCompanyBioFormProps> = (props) => {
  const {
    cancel,
    submitText,
    initialValues,
    onFormSubmit,
    className,
    ...rest
  } = props;
  const { id, errorId } = useFormField();

  const formik = useFormik<EditCompanyBioFormValues>({
    onSubmit: onFormSubmit,
    initialValues,
    validationSchema: toFormikValidationSchema(
      z.object({
        bio: z.string(),
      })
    ),
  });

  const isBioHasError = !!formik.errors.bio && !!formik.touched.bio;

  return (
    <FormWrapper
      {...rest}
      formik={formik}
      submit={{ label: submitText }}
      cancel={cancel}
    >
      <Grid gap={1}>
        <WysiwygEditor
          id={id}
          model={formik.values.bio}
          aria-invalid={isBioHasError}
          aria-errormessage={isBioHasError ? errorId : undefined}
          onModelChange={(value) => formik.setFieldValue("bio", value)}
          onBlur={() => formik.setFieldTouched("bio", true)}
        />
        {isBioHasError && (
          <Typography
            tag="p"
            id={errorId}
            styling="sm"
            className="text-red-500"
          >
            {formik.errors.bio}
          </Typography>
        )}
      </Grid>
    </FormWrapper>
  );
};
