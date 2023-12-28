import { Button } from "@/components/base";
import { Form, FormikContextType, FormikProvider } from "formik";
import { FC, type ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  formik: FormikContextType<any>;
  cancel?: { label: string; onClick: () => void };
  submit: { label: string; isFullWidth?: boolean };
};

export type FormWrapperProps = ComponentPropsWithoutRef<"form"> & Props;

export const FormWrapper: FC<FormWrapperProps> = (props) => {
  const { cancel, submit, formik, children, className, ...rest } = props;

  return (
    <FormikProvider value={formik}>
      <Form {...rest} className={twMerge("grid grid-cols-1 gap-3", className)}>
        {children}

        <div className="flex justify-between items-center gap-3 flex-wrap">
          {cancel && (
            <Button variant="bordered" onClick={cancel.onClick}>
              {cancel.label}
            </Button>
          )}
          <Button
            type="submit"
            isDisabled={!formik.dirty}
            color="primary"
            fullWidth={submit.isFullWidth}
          >
            {submit.label}
          </Button>
        </div>
      </Form>
    </FormikProvider>
  );
};
