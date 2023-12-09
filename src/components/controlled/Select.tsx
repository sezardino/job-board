import { useField } from "formik";
import { type FC } from "react";
import { Select, SelectProps } from "../base/Select/Select";

export type ControlledSelectProps = Omit<SelectProps, "value" | "onChange"> & {
  name: string;
};

export const ControlledSelect: FC<ControlledSelectProps> = (props) => {
  const { name, onBlur, ...rest } = props;
  const [field, meta, helper] = useField(name);

  return (
    <Select
      {...rest}
      {...field}
      selectedKeys={field.value}
      onChange={(value) => helper.setValue(value)}
      errorMessage={meta.touched ? meta.error : undefined}
    />
  );
};
