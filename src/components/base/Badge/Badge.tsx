import {
  Chip as Component,
  ChipProps as ComponentProps,
} from "@nextui-org/react";
import { type FC } from "react";

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

export const Badge: FC<BadgeProps> = (props) => {
  const { children, ...rest } = props;

  return (
    <Component {...rest} radius="lg">
      {children}
    </Component>
  );
};
