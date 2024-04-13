import {
  Button as NextUIButton,
  ButtonProps as NextUIButtonProps,
  Tooltip,
} from "@nextui-org/react";
import { ForwardRefRenderFunction, forwardRef } from "react";

type OmittedLibProps = Omit<NextUIButtonProps, "ref" | "children">;

type Props = {
  text: string;
  disabledText?: string;
  offset?: number;
};

export type ButtonProps = OmittedLibProps & Props;

const ButtonComponent: ForwardRefRenderFunction<
  HTMLButtonElement,
  ButtonProps
> = (props, ref) => {
  const {
    text,
    isIconOnly,
    disabledText,
    isDisabled,
    variant = "solid",
    offset,
    color,
    ...rest
  } = props;

  const button = (
    <NextUIButton
      {...rest}
      isIconOnly={isIconOnly}
      isDisabled={isDisabled}
      color={color}
      ref={ref}
      variant={variant}
      radius="lg"
    >
      {text && !isIconOnly ? text : undefined}
    </NextUIButton>
  );

  if (isIconOnly || disabledText) {
    return (
      <Tooltip
        color={color}
        offset={offset}
        isDisabled={isDisabled && !disabledText}
        content={isDisabled && disabledText ? disabledText : text}
      >
        <span>{button}</span>
      </Tooltip>
    );
  }

  return button;
};

export const Button = forwardRef(ButtonComponent);
