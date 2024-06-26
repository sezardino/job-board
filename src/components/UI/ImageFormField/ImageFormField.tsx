import { BaseAvatar } from "@/components/base/Avatar/BaseAvatar";
import { Button } from "@/components/base/Button/Button";
import { Grid } from "@/components/base/Grid/Grid";
import { Icon } from "@/components/base/Icon/Icon";
import { Typography } from "@/components/base/Typography/Typography";
import { useFormField } from "@/hooks/use-form-field";
import { ChangeEvent, type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  src?: string;
  type?: "avatar" | "image";
  onChange: (file: File) => void;
  label: string;
  remove: {
    text: string;
    onClick: () => void;
  };
  isDisabled?: boolean;
  error?: string;
  description?: string;
};

export type ImageFormFieldProps = ComponentPropsWithoutRef<"div"> & Props;

export const ImageFormField: FC<ImageFormFieldProps> = (props) => {
  const {
    src,
    error,
    type = "image",
    description,
    isDisabled,
    onChange,
    label,
    remove,
    className,
    ...rest
  } = props;
  const { descriptionId, errorId, id } = useFormField();

  const changeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    if (!evt.currentTarget.files?.length) return;

    onChange(evt.currentTarget.files[0]);
  };

  return (
    <Grid {...rest} gap={1} className={twMerge(className)}>
      <div className="flex items-center gap-3 flex-wrap">
        <BaseAvatar src={src} alt="" type="image" size="lg" />

        <div className="flex gap-2 items-center flex-wrap">
          <label
            className={twMerge(
              "py-2 px-4 border rounded-lg",
              !isDisabled && "cursor-pointer"
            )}
          >
            <Typography tag="span" styling="sm">
              {label}
            </Typography>
            <input
              id={id}
              type="file"
              multiple={false}
              accept="image/*"
              className="sr-only"
              onChange={changeHandler}
            />
          </label>
        </div>
        <Button
          color="danger"
          isIconOnly
          text={remove.text}
          isDisabled={!src || isDisabled}
          startContent={<Icon name="HiTrash" size={16} />}
          onClick={remove.onClick}
        />
      </div>
      {description && (
        <Typography tag="p" id={descriptionId}>
          {description}
        </Typography>
      )}
      {error && (
        <Typography tag="p" styling="xs" id={errorId} className="text-red-500">
          {error}
        </Typography>
      )}
    </Grid>
  );
};
