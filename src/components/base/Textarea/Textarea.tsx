"use client";

import {
  Textarea as Component,
  TextAreaProps as ComponentProps,
} from "@nextui-org/input";
import { ForwardRefRenderFunction, forwardRef } from "react";
import { Typography } from "../Typography/Typography";

type OmittedProps = Omit<
  ComponentProps,
  "variant" | "labelPlacement" | "radius" | "colors"
>;

type Props = {
  label?: string;
};

export type BaseTextareaProps = OmittedProps & Props;

const TextareaComponent: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  BaseTextareaProps
> = (props, ref) => {
  const { label, type, size = "lg", ...rest } = props;

  return (
    <Component
      {...rest}
      ref={ref}
      size={size}
      variant="bordered"
      labelPlacement="outside"
      placeholder={rest.placeholder || " "}
      radius="sm"
      label={label ? <Typography tag="span">{label}</Typography> : undefined}
    />
  );
};

export const BaseTextarea = forwardRef(TextareaComponent);
