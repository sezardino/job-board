import { Button, Grid, Icon, Typography } from "@/components/base";
import { useFormField } from "@/hooks/use-form-field";
import { Avatar } from "@nextui-org/react";
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

export type AvatarFormFieldProps = ComponentPropsWithoutRef<"div"> & Props;

export const AvatarFormField: FC<AvatarFormFieldProps> = (props) => {
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
        <Avatar
          src={src}
          showFallback
          size="lg"
          fallback={type === "image" ? <Icon name="HiPhotograph" /> : undefined}
        />
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
          isDisabled={!src || isDisabled}
          onClick={remove.onClick}
          aria-label={remove.text}
        >
          <Icon name="HiTrash" size={16} />
        </Button>
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
