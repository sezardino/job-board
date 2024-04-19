import { useField } from "formik";
import { type FC } from "react";
import { FileInput, FileInputProps } from "../base/FileInput/FileInput";

export type ControlledFileInputProps = Omit<
  FileInputProps,
  "ref" | "onFileChange"
> & {
  name: string;
};

export const ControlledFileInput: FC<ControlledFileInputProps> = (props) => {
  const { name, isMultiple, ...rest } = props;
  const [field, meta, helpers] = useField(name);

  const onFileChange = (files?: FileList) => {
    if (!files) {
      helpers.setTouched(true);
      helpers.setValue(undefined);
      return;
    }

    helpers.setTouched(true);
    helpers.setValue(isMultiple ? files : files[0]);
  };

  return (
    <FileInput
      {...rest}
      isMultiple={isMultiple}
      onFileChange={onFileChange}
      errorMessage={meta.touched ? meta.error : undefined}
    />
  );
};
