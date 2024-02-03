import { type ComponentPropsWithoutRef, type FC } from "react";

import { useFormik } from "formik";
import { twMerge } from "tailwind-merge";
import { FormWrapper } from "../../FormWrapper/FormWrapper";

export type OfferFormDescriptionStepFormValues = {
  description: string;
};

type Props = {
  initialValues?: Partial<OfferFormDescriptionStepFormValues>;
  onFormSubmit: (values: OfferFormDescriptionStepFormValues) => void;
};

export type OfferFormDescriptionStepProps = ComponentPropsWithoutRef<"form"> &
  Props;

export const OfferFormDescriptionStep: FC<OfferFormDescriptionStepProps> = (
  props
) => {
  const { className, ...rest } = props;

  const formik = useFormik<OfferFormDescriptionStepFormValues>({
    initialValues: {
      description: "",
      ...props.initialValues,
    },
    onSubmit: () => {},
  });

  return (
    <FormWrapper
      {...rest}
      formik={formik}
      submit={{ label: "submit" }}
      cancel={{ label: "back", onClick: () => undefined }}
      className={twMerge("", className)}
    >
      <p>description</p>
    </FormWrapper>
  );
};
