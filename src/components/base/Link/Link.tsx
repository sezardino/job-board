import {
  Link as Component,
  LinkProps as ComponentProps,
} from "@nextui-org/react";
import { ForwardRefRenderFunction, forwardRef } from "react";

export type LinkProps = ComponentProps & {
  to?: string;
  href?: string;
};

const LinkComponent: ForwardRefRenderFunction<HTMLElement, LinkProps> = (
  props,
  ref
) => {
  const { as, to, href, children, ...rest } = props;

  const type = as === "button" ? "button" : undefined;

  return (
    <Component
      {...rest}
      // @ts-ignore
      ref={ref}
      as={as}
      type={type}
      href={to || href}
    >
      {children}
    </Component>
  );
};

export const Link = forwardRef(LinkComponent);
