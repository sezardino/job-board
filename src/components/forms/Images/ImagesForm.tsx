import { ChangeEvent, ComponentPropsWithoutRef, useMemo, type FC } from "react";

import { ImageCard } from "@/components/UI/ImageCard/ImageCard";
import { Button, Grid, Icon, Typography } from "@/components/base";
import { useFormField } from "@/hooks/use-form-field";
import { FileEntity } from "@/types";
import { megabytesToBytes } from "@/utils";
import { FieldArray, useFormik } from "formik";
import { useTranslations } from "next-intl";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { FormWrapper, FormWrapperProps } from "../FormWrapper/FormWrapper";

const MAX_IMAGE_SIZE_MB = 10;
const MAX_IMAGE_SIZE_BYTES = megabytesToBytes(MAX_IMAGE_SIZE_MB);
const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg"];

export type ImagesFormValues = {
  images: (FileEntity | File)[];
  imagesToDelete: string[];
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
  const { id, errorId } = useFormField();

  const formik = useFormik<ImagesFormValues>({
    initialValues: {
      images: initialValues.images,
      imagesToDelete: [],
    },
    onSubmit: (values) => {
      const images = values.images.filter((i) => i instanceof File);

      onFormSubmit({ images, imagesToDelete: values.imagesToDelete });
    },
    validationSchema: toFormikValidationSchema(
      z.object({
        images: z
          .array(
            z
              .any()
              .refine(
                (file: File) => {
                  if (!file) return true;
                  if (file instanceof File) {
                    return file?.size <= MAX_IMAGE_SIZE_BYTES;
                  }
                  return true;
                },
                { message: t("max-file-size", { value: MAX_IMAGE_SIZE_MB }) }
              )
              .refine((file: File) => {
                if (!file) return true;
                if (file instanceof File) {
                  ACCEPTED_IMAGE_TYPES.includes(file?.type);
                }
                return true;
              }, t("formats", { value: ACCEPTED_IMAGE_TYPES.join(", ") }))
          )
          .max(maxImagesCount, t("max-count", { value: maxImagesCount })),
      })
    ),
  });

  const images = useMemo(() => {
    return formik.values.images.map((image) => {
      if (image instanceof File)
        return {
          size: image.size,
          name: image.name,
          url: URL.createObjectURL(image),
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
    const images = formik.values.images.filter((i) => {
      if (i instanceof File) return i.name !== id;
      return i.id !== id;
    });

    const removedImage = formik.values.images.find((i) => {
      if (i instanceof File) return i.name === id;
      return i.id === id;
    });

    if (removedImage && !(removedImage instanceof File)) {
      formik.setFieldValue("imagesToDelete", [
        ...formik.values.imagesToDelete,
        removedImage.id,
      ]);
    }

    formik.setFieldValue("images", images);
  };

  const isInputDisabled = formik.values.images.length >= maxImagesCount + 10;

  return (
    <FormWrapper {...rest} formik={formik} className="grid grid-cols-1 gap-2">
      {!!images.length && (
        <FieldArray
          name="images"
          render={(helpers) => (
            <ul className="flex gap-3 flex-wrap list-none">
              {images.map((i, index) => (
                <Grid tag="li" key={i.id}>
                  <ImageCard size="sm" image={i} className="group">
                    <Button
                      color="danger"
                      isIconOnly
                      className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                      onClick={() => removeImage(i.id)}
                    >
                      <Icon name="HiTrash" size={16} />
                    </Button>
                  </ImageCard>
                  {Array.isArray(formik.errors.images) &&
                    formik.errors.images?.[index] && (
                      <Typography tag="p" styling="xs" className="text-red-500">
                        {formik.errors.images?.[index] as string}
                      </Typography>
                    )}
                </Grid>
              ))}
            </ul>
          )}
        />
      )}
      <Grid gap={2} className="justify-self-center">
        <label
          className={twMerge(
            "px-3 py-2 border rounded-lg cursor-pointer",
            isInputDisabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <Typography tag="span" styling="sm">
            {label}
          </Typography>{" "}
          {!!formik.values.images.length && (
            <Typography tag="span">
              {formik.values.images.length} / {maxImagesCount}
            </Typography>
          )}
          <input
            id={id}
            type="file"
            disabled={isInputDisabled}
            multiple
            accept={ACCEPTED_IMAGE_TYPES.join(", ")}
            className="sr-only"
            onChange={onFileInputChange}
            aria-invalid={!!formik.errors.images}
            aria-errormessage={formik.errors.images ? errorId : undefined}
          />
        </label>
        {typeof formik.errors.images === "string" && (
          <Typography tag="p" styling="xs" className="text-red-500">
            {formik.errors.images}
          </Typography>
        )}
      </Grid>
    </FormWrapper>
  );
};
