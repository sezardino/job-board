import {
  Button as Component,
  ButtonProps as ComponentProps,
} from "@nextui-org/react";
import { ForwardRefRenderFunction, forwardRef } from "react";

type OmittedLibProps = Omit<ComponentProps, "variant" | "radius">;

type Props = {
  variant?: Extract<
    ComponentProps["variant"],
    "solid" | "shadow" | "bordered" | "light"
  >;
};

export type ButtonProps = OmittedLibProps & Props;

const ButtonComponent: ForwardRefRenderFunction<
  HTMLButtonElement,
  ButtonProps
> = (props, ref) => {
  const { variant = "solid", children, ...rest } = props;

  return (
    <Component {...rest} ref={ref} variant={variant} radius="lg">
      {children}
    </Component>
  );
};

export const Button = forwardRef(ButtonComponent);
