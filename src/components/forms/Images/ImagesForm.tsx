import { ChangeEvent, ComponentPropsWithoutRef, useMemo, type FC } from "react";

import { ImageCard } from "@/components/UI/ImageCard/ImageCard";
import { Button, Icon, Typography } from "@/components/base";
import { FileEntity } from "@/types";
import { megabytesToBytes } from "@/utils";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { FormWrapper, FormWrapperProps } from "../FormWrapper/FormWrapper";

const MAX_IMAGE_SIZE_MB = 10;
const MAX_IMAGE_SIZE_BYTES = megabytesToBytes(MAX_IMAGE_SIZE_MB);
const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg"];

export type ImagesFormValues = {
  images: (FileEntity | File)[];
  imagesToDelete?: string[];
};

type Props = {
  label: string;
  initialValues: ImagesFormValues;
  onFormSubmit: (values: ImagesFormValues) => void;
  cancel: FormWrapperProps["cancel"];
  submit: FormWrapperProps["submit"];
  maxImagesCount?: number;
};

export type ImagesFormProps = ComponentPropsWithoutRef<"form"> & Props;

export const resetInput = (input: HTMLInputElement) => {
  const parentNode = input.parentNode;

  if (!parentNode) return;

  const form = document.createElement("form");
  const ref = input.nextSibling;
  form.appendChild(input);
  form.reset();
  parentNode.insertBefore(input, ref);
};

export const ImagesForm: FC<ImagesFormProps> = (props) => {
  const {
    maxImagesCount = 10,
    initialValues,
    onFormSubmit,
    className,
    label,
    ...rest
  } = props;
  const t = useTranslations("forms.images");

  const formik = useFormik<ImagesFormValues>({
    initialValues,
    onSubmit: onFormSubmit,
    validationSchema: toFormikValidationSchema(
      z.object({
        images: z
          .array(
            z
              .any()
              .refine(
                (file: File) => {
                  if (!file) return true;
                  return file?.size <= MAX_IMAGE_SIZE_BYTES;
                },
                {
                  message: t("logo.max-file-size", {
                    value: MAX_IMAGE_SIZE_MB,
                  }),
                }
              )
              .refine((file: File) => {
                if (!file) return true;
                if (file instanceof File) {
                  ACCEPTED_IMAGE_TYPES.includes(file?.type);
                }
                return true;
              }, t("logo.formats", { value: ACCEPTED_IMAGE_TYPES.join(", ") }))
          )
          .max(
            maxImagesCount,
            t("max-images-count", { value: maxImagesCount })
          ),
      })
    ),
  });

  const images = useMemo(() => {
    return formik.values.images.map((image) => {
      if (image instanceof File)
        return {
          url: URL.createObjectURL(image),
          name: image.name,
          id: image.name,
        };

      return image;
    });
  }, [formik.values.images]);

  const onFileInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) return;

    const formikImageFilesNames = formik.values.images
      .filter((i) => i instanceof File)
      .map((i) => i.name);

    const files = Array.from(evt.target.files);
    const filesWithoutDuplicates = files.filter(
      (f) => !formikImageFilesNames.includes(f.name)
    );

    formik.setFieldValue("images", [
      ...formik.values.images,
      ...filesWithoutDuplicates,
    ]);

    resetInput(evt.target);
  };

  const removeImage = (id: string) => {
    formik.setFieldValue(
      "images",
      formik.values.images.filter((i) => {
        if (!(i instanceof File)) return i.id !== id;

        return i.name !== id;
      })
    );
  };

  return (
    <FormWrapper {...rest} formik={formik} className="grid grid-cols-1 gap-2">
      {!!images.length && (
        <ul className="flex gap-3 flex-wrap">
          {images.map((i) => (
            <ImageCard key={i.id} as="li" size="sm" image={i} className="group">
              <Button
                color="danger"
                isIconOnly
                className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                onClick={() => removeImage(i.id)}
              >
                <Icon name="HiTrash" size={16} />
              </Button>
            </ImageCard>
          ))}
        </ul>
      )}
      <label className="px-3 py-2 border rounded-lg justify-self-center">
        <Typography tag="span" styling="sm">
          {label}
        </Typography>{" "}
        {!!formik.values.images.length && (
          <Typography tag="span">
            {formik.values.images.length} / {maxImagesCount}
          </Typography>
        )}
        <input
          type="file"
          multiple
          accept={ACCEPTED_IMAGE_TYPES.join(", ")}
          className="sr-only"
          onChange={onFileInputChange}
        />
      </label>
    </FormWrapper>
  );
};
