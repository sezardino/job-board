import { useField } from "formik";
import { FocusEvent, type FC } from "react";
import { Input, InputProps } from "../base";

export type ControlledInputProps = InputProps & {
  name: string;
};

export const ControlledInput: FC<ControlledInputProps> = (props) => {
  const { name, onBlur, ...rest } = props;
  const [field, meta] = useField(name);

  const blurHandler = (evt: FocusEvent<HTMLInputElement>) => {
    onBlur?.(evt);
    field.onBlur(evt);
  };

  return (
    <Input
      {...rest}
      {...field}
      onBlur={blurHandler}
      error={meta.touched ? meta.error : undefined}
    />
  );
};
