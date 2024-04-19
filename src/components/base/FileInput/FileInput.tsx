import { Card, CardBody } from "@nextui-org/react";
import { ChangeEvent, FC, MouseEvent, useId, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "../Button/Button";
import { Grid } from "../Grid/Grid";
import { Icon, IconNames } from "../Icon/Icon";
import { Typography } from "../Typography/Typography";
import {
  FileInputFileAcceptedTypes,
  fileInputExtensions,
} from "./FileInput.const";
import { resetFileInput } from "./FileInput.helpers";

export type FileInputProps = {
  id?: string;
  label?: string;
  description?: string;
  icon?: IconNames;
  errorMessage?: string;
  onFileChange: (files?: FileList) => void;
  allowedFileTypes: FileInputFileAcceptedTypes[];
  isMultiple?: boolean;
  defaultValue?: { name: string; url: string };
  noFileString: string;
  isDisabled?: boolean;
  className?: string;
};

export const FileInput: FC<FileInputProps> = (props) => {
  const {
    id: propId,
    label,
    description,
    errorMessage,
    onFileChange,
    isDisabled,
    allowedFileTypes = ["pdf"],
    noFileString,
    icon,
    defaultValue,
    isMultiple = false,
    className,
    ...rest
  } = props;

  const inputId = useId();
  const id = propId ?? inputId;

  const [fileName, setFileName] = useState(defaultValue?.name ?? "");
  const inputRef = useRef<HTMLInputElement>(null);

  const changeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    const files = evt.target.files;
    if (!files?.length) return;

    const fileNames = Array.from(files).map((file) => file.name);

    setFileName(fileNames.join(", "));
    onFileChange(files);
    resetFileInput(evt.target);
  };

  const descriptionId = useId();
  const errorId = useId();

  const onCardClick = () => inputRef.current?.focus();

  const onFileDelete = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setFileName("");
    onFileChange();
  };

  return (
    <Grid
      {...rest}
      gap={1}
      className={twMerge(isDisabled && "opacity-50", className)}
    >
      <Grid tag="label" gap={2}>
        <label htmlFor={id}>
          <Typography tag="span">{label}</Typography>
        </label>
        <Card
          as="div"
          radius="sm"
          isPressable={!isDisabled}
          classNames={{ base: "min-h-20 border-danger-500" }}
          onClick={onCardClick}
          onPress={onCardClick}
          className="border-danger-500"
        >
          <CardBody className="flex-row justify-between items-center">
            <div className="flex items-center gap-2">
              {!fileName && (
                <>
                  <Icon
                    name="HiOutlineDocumentAdd"
                    className="text-default-700"
                    size={40}
                  />
                  <Typography tag="span" styling="md" color="default-500">
                    {noFileString}
                  </Typography>
                </>
              )}
              {fileName && (
                <>
                  <Icon
                    name="HiOutlineDocumentText"
                    className="text-primary-500"
                    size={40}
                  />
                  <Typography tag="span" styling="md" color="default">
                    {fileName}
                  </Typography>
                </>
              )}
              <input
                id={id}
                ref={inputRef}
                disabled={isDisabled}
                type="file"
                multiple={isMultiple}
                accept={allowedFileTypes
                  .map((type) => fileInputExtensions[type])
                  .flat()
                  .join(", ")}
                className="sr-only"
                onChange={changeHandler}
              />
            </div>
            {fileName && (
              <Button
                isIconOnly
                color="danger"
                variant="light"
                onClick={onFileDelete}
                text="Delete file"
                endContent={<Icon name="TbTrash" size={20} />}
              />
            )}
          </CardBody>
        </Card>
      </Grid>

      {description && (
        <Typography id={descriptionId} tag="p" styling="xs" color="default-500">
          {description}
        </Typography>
      )}

      {errorMessage && (
        <Typography id={errorId} tag="p" styling="xs" color="danger">
          {errorMessage}
        </Typography>
      )}
    </Grid>
  );
};
