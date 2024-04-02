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

import { Icon } from "../Icon/Icon";
import styles from "./Input.module.scss";
import { Typography } from "../Typography/Typography";

type OmittedProps = Omit<
  ComponentProps,
  "variant" | "radius" | "colors" | "onBlur"
>;

type Props = {
  onBlur?: (evt: FocusEvent<HTMLInputElement, Element>) => void;
  error?: string;
  label?: string;
};

export type InputProps = OmittedProps & Props;

const InputComponent: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  props,
  ref
) => {
  const {
    label,
    size = "lg",
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
        className={styles.button}
        type="button"
        onClick={toggleVisibility}
      >
        <Icon name={isVisible ? "HiEyeOff" : "HiEye"} className={styles.icon} />
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
      size={size}
      labelPlacement={labelPlacement}
      placeholder={rest.placeholder || " "}
      radius="md"
      endContent={endContentJSX}
      label={label ? <Typography tag="span">{label}</Typography> : undefined}
    />
  );
};

export const Input = forwardRef<HTMLInputElement, InputProps>(InputComponent);
