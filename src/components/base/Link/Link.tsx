import {
  Link as Component,
  LinkProps as ComponentProps,
} from "@nextui-org/react";
import { ForwardRefRenderFunction, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export type LinkProps = ComponentProps & {
  to?: string;
  href?: string;
};

const LinkComponent: ForwardRefRenderFunction<HTMLElement, LinkProps> = (
  props,
  ref
) => {
  const { as, to, href, children, className, ...rest } = props;

  const type = as === "button" ? "button" : undefined;

  return (
    <Component
      {...rest}
      // @ts-ignore
      ref={ref}
      as={as}
      type={type}
      href={to || href}
      className={twMerge("cursor-pointer", className)}
    >
      {children}
    </Component>
  );
};

export const Link = forwardRef(LinkComponent);
