import { useField } from "formik";
import { type FC } from "react";
import { Checkbox, CheckboxProps } from "../base/Checkbox/Checkbox";

export type ControlledCheckboxProps = Omit<CheckboxProps, "ref"> & {
  name: string;
};

export const ControlledCheckbox: FC<ControlledCheckboxProps> = (props) => {
  const { name, ...rest } = props;
  const [field, meta] = useField(name);

  return (
    <Checkbox
      {...rest}
      {...field}
      isInvalid={meta.touched && !!meta.error}
      error={meta.touched ? meta.error : undefined}
    />
  );
};
