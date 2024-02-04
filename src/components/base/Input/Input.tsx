"use client";

import {
  Input as Component,
  InputProps as ComponentProps,
} from "@nextui-org/input";
import {
  FocusEvent,
  ForwardRefRenderFunction,
  forwardRef,
  useState,
} from "react";
import { Icon } from "..";

type OmittedProps = Omit<
  ComponentProps,
  "variant" | "radius" | "colors" | "onBlur"
>;

type Props = {
  onBlur?: (evt: FocusEvent<HTMLInputElement, Element>) => void;
  error?: string;
};

export type InputProps = OmittedProps & Props;

const InputComponent: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  props,
  ref
) => {
  const {
    labelPlacement = "outside",
    error,
    endContent,
    type,
    ...rest
  } = props;
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const currentType =
    type !== "password" ? type : isVisible ? "text" : "password";

  const endContentJSX =
    type === "password" ? (
      <button
        className="focus:outline-none focus-within:text-primary-500"
        type="button"
        onClick={toggleVisibility}
      >
        <Icon
          name={isVisible ? "HiEyeOff" : "HiEye"}
          className="text-2xl text-default-400 pointer-events-none"
        />
      </button>
    ) : (
      endContent
    );

  return (
    // @ts-ignore
    <Component
      {...rest}
      ref={ref}
      isInvalid={!!error}
      errorMessage={error}
      type={currentType}
      variant="bordered"
      labelPlacement={labelPlacement}
      placeholder={rest.placeholder || " "}
      radius="sm"
      endContent={endContentJSX}
    />
  );
};

export const Input = forwardRef<HTMLInputElement, InputProps>(InputComponent);
