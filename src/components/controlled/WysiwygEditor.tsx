import { useField } from "formik";
import dynamic from "next/dynamic";
import { type FC } from "react";
import { WysiwygEditorProps } from "../UI/WysiwygEditor/WysiwygEditor";

const WysiwygEditor = dynamic(
  () => import("@/components/UI/WysiwygEditor/WysiwygEditor"),
  { ssr: false }
);

type Props = {
  name: string;
};

export type ControlledWysiwygEditorProps = Omit<
  WysiwygEditorProps,
  "value" | "onChange"
> &
  Props;

export const ControlledWysiwygEditor: FC<ControlledWysiwygEditorProps> = (
  props
) => {
  const { name, onBlur, ...rest } = props;
  const [field, meta, helpers] = useField(name);

  const handleChange = (value: string) => {
    helpers.setValue(value);
    helpers.setTouched(true);
  };

  return (
    <WysiwygEditor
      {...rest}
      value={field.value}
      onChange={handleChange}
      error={meta.touched ? meta.error : undefined}
    />
  );
};
