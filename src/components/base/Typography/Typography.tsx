import { type ComponentPropsWithoutRef, type FC } from "react";

import { twMerge } from "tailwind-merge";

type TypographyStyling = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
type TypographyTag =
  | "p"
  | "span"
  | "div"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6";

export type TypographyProps = ComponentPropsWithoutRef<"p"> & {
  styling?: TypographyStyling;
  tag: TypographyTag;
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "default";
};

export const Typography: FC<TypographyProps> = (props) => {
  const {
    color = "default",
    styling = "sm",
    tag: Tag,
    className,
    children,
    ...rest
  } = props;

  const stylingString: Record<TypographyStyling, string> = {
    "3xl": "text-3xl text-gray-800 md:text-4xl lg:text-5xl",
    "2xl": "text-2xl text-gray-800 lg:text-4xl md:text-3xl",
    xl: "text-xl text-gray-800 md:text-2xl lg:text-3xl",
    lg: "text-lg text-gray-800 md:text-xl lg:text-2xl",
    md: "text-base text-gray-800 md:text-lg lg:text-lg",
    sm: "text-sm text-gray-800 lg:text-lg md:text-base",
    xs: "text-xs text-gray-800 lg:text-base md:text-base",
  };

  return (
    <Tag
      {...rest}
      className={twMerge(stylingString[styling], `text-${color}`, className)}
    >
      {children}
    </Tag>
  );
};
