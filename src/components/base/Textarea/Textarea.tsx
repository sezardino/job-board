"use client";

import {
  Textarea as Component,
  TextAreaProps as ComponentProps,
} from "@nextui-org/input";
import { ForwardRefRenderFunction, forwardRef } from "react";

export type BaseTextareaProps = Omit<
  ComponentProps,
  "variant" | "labelPlacement" | "radius" | "colors"
> & {};

const TextareaComponent: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  BaseTextareaProps
> = (props, ref) => {
  const { type, ...rest } = props;

  return (
    <Component
      {...rest}
      ref={ref}
      variant="bordered"
      labelPlacement="outside"
      placeholder={rest.placeholder || " "}
      radius="sm"
    />
  );
};

export const BaseTextarea = forwardRef(TextareaComponent);
