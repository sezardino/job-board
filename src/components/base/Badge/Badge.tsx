import {
  Chip as Component,
  ChipProps as ComponentProps,
} from "@nextui-org/react";
import { ForwardRefRenderFunction, forwardRef } from "react";

export type BadgeVariant = Extract<
  // @ts-ignore
  ComponentProps["variant"],
  "solid" | "shadow" | "bordered" | "dot"
>;

type OmittedLibProps = Omit<ComponentProps, "variant" | "radius">;

type Props = {
  variant?: BadgeVariant;
  // @ts-ignore
  size?: ComponentProps["size"];
};

export type BadgeProps = OmittedLibProps & Props;

const BadgeComponent: ForwardRefRenderFunction<HTMLDivElement, BadgeProps> = (
  props,
  ref
) => {
  const { children, ...rest } = props;

  return (
    <Component ref={ref} {...rest} radius="lg">
      {children}
    </Component>
  );
};

export const Badge = forwardRef(BadgeComponent);
