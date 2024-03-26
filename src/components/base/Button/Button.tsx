import {
  Button as NextUIButton,
  ButtonProps as NextUIButtonProps,
  Tooltip,
} from "@nextui-org/react";
import { ForwardRefRenderFunction, forwardRef } from "react";

type OmittedLibProps = Omit<NextUIButtonProps, "ref">;

type Props = {
  tooltip?: string;
  text?: string;
};

export type ButtonProps = OmittedLibProps & Props;

const ButtonComponent: ForwardRefRenderFunction<
  HTMLButtonElement,
  ButtonProps
> = (props, ref) => {
  const { text, tooltip, variant = "solid", color, children, ...rest } = props;

  const button = (
    <NextUIButton
      {...rest}
      color={color}
      ref={ref}
      variant={variant}
      radius="lg"
    >
      {text ? text : children}
    </NextUIButton>
  );

  if (tooltip) {
    return (
      <Tooltip color={color} content={tooltip}>
        {button}
      </Tooltip>
    );
  }

  return button;
};

export const Button = forwardRef(ButtonComponent);
