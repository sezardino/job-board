import { Form, FormikProvider, useFormik } from "formik";
import { ComponentPropsWithoutRef, FC, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

export type JobApplicationFormValues = {};

type Props = {
  onFormSubmit: (values: JobApplicationFormValues) => void;
};

export type JobApplicationFormProps = ComponentPropsWithoutRef<"form"> & Props;

export const JobApplicationForm: FC<JobApplicationFormProps> = (props) => {
  const { onFormSubmit, className, ...rest } = props;

  const validationSchema = useMemo(
    () => toFormikValidationSchema(z.object({})),
    []
  );

  const formik = useFormik<JobApplicationFormValues>({
    initialValues: {},
    validationSchema,
    onSubmit: (values) => {
      props.onFormSubmit(values);
    },
  });

  return (
    <FormikProvider value={formik}>
      <Form {...rest} className={twMerge(className)}>
        form
      </Form>
    </FormikProvider>
  );
};
