import { FormikConfig, FormikValues, useFormik } from "formik";

export const useFormikHelper = <Values extends FormikValues = FormikValues>(
  values: FormikConfig<Values>
) =>
  useFormik<Values>({
    ...values,
    validateOnBlur: false,
    validateOnMount: false,
  });
