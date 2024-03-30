import { useField } from "formik";
import { type FC } from "react";
import { BaseTextareaProps, BaseTextarea } from "../base/Textarea/Textarea";

type Props = {
  name: string;
};

export type ControlledTextareaProps = BaseTextareaProps & Props;

export const ControlledTextarea: FC<ControlledTextareaProps> = (props) => {
  const { name, onBlur, ...rest } = props;
  const [field, meta] = useField(name);

  return (
    <BaseTextarea
      {...rest}
      {...field}
      errorMessage={meta.touched ? meta.error : undefined}
    />
  );
};
