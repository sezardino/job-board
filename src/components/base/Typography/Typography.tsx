import { type ComponentPropsWithoutRef, type FC } from "react";

import { twMerge } from "tailwind-merge";

export type TypographyStyling =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "7xl";
export type TypographyTag =
  | "p"
  | "span"
  | "div"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6";

type TypographyWeight = "regular" | "medium" | "bold" | "thin";

export type TypographyProps = ComponentPropsWithoutRef<"p"> & {
  styling?: TypographyStyling;
  tag: TypographyTag;
  weight?: TypographyWeight;
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "default"
    | "default-500";
};

export const Typography: FC<TypographyProps> = (props) => {
  const {
    color = "default",
    styling = "sm",
    weight = "regular",
    tag: Tag,
    className,
    children,
    ...rest
  } = props;

  const stylingString: Record<TypographyStyling, string> = {
    "7xl": "text-7xl lg:text-9xl",
    "3xl": "text-3xl md:text-4xl lg:text-5xl",
    "2xl": "text-2xl lg:text-4xl md:text-3xl",
    xl: "text-xl md:text-2xl lg:text-3xl",
    lg: "text-lg md:text-xl lg:text-2xl",
    md: "text-base",
    sm: "text-sm",
    xs: "text-xs",
  };

  const weightString: Record<TypographyWeight, string> = {
    regular: "font-normal",
    medium: "font-medium",
    bold: "font-bold",
    thin: "font-thin",
  };

  return (
    <Tag
      {...rest}
      className={twMerge(
        stylingString[styling],
        weightString[weight],
        `text-${color}`,

        className
      )}
    >
      {children}
    </Tag>
  );
};
