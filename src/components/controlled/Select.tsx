import { useField } from "formik";
import { Select, SelectProps } from "../base/Select/Select";

export type ControlledSelectProps<T extends string> = Omit<
  SelectProps<T>,
  "value" | "onChange" | "onSelectChange"
> & {
  name: string;
};

export const ControlledSelect = <T extends string>(
  props: ControlledSelectProps<T>
) => {
  const { name, onBlur, ...rest } = props;
  const [field, meta, helper] = useField(name);

  return (
    <Select
      {...rest}
      {...field}
      selectedKeys={field.value}
      onSelectChange={(value) => helper.setValue(value)}
      errorMessage={meta.touched ? meta.error : undefined}
    />
  );
};
