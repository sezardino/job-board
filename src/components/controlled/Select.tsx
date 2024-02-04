import { useField } from "formik";
import { Select, SelectProps } from "../base/Select/Select";

type OmittedProps<T extends string, M extends boolean> = Omit<
  SelectProps<T, M>,
  "value" | "onSelectChange"
>;

type Props = {
  name: string;
};

export type ControlledSelectProps<
  T extends string,
  M extends boolean
> = OmittedProps<T, M> & Props;

export const ControlledSelect = <T extends string, M extends boolean>(
  props: ControlledSelectProps<T, M>
) => {
  const { name, ...rest } = props;
  const [{ onChange, ...field }, meta, helper] = useField(name);

  return (
    // @ts-ignore
    <Select
      {...rest}
      {...field}
      selectedKeys={field.value}
      // @ts-ignore
      onSelectChange={(value) => helper.setValue(value)}
      errorMessage={meta.touched ? meta.error : undefined}
    />
  );
};
