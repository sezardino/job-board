import parse from "html-react-parser";
import {
  ForwardRefRenderFunction,
  forwardRef,
  type ComponentPropsWithoutRef,
} from "react";

import { twMerge } from "tailwind-merge";

export type TypographyStyling =
  | "xs"
  | "sm"
  | "base"
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

export type TypographyWeight = "regular" | "medium" | "bold" | "thin";

export type TypographyProps = ComponentPropsWithoutRef<"p"> & {
  styling?: TypographyStyling;
  tag: TypographyTag;
  weight?: TypographyWeight;
  isVisuallyHidden?: boolean;
  isTextCentered?: boolean;
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "default"
    | "default-500";
};

const stylingString: Record<TypographyStyling, string> = {
  "7xl": "text-7xl lg:text-9xl",
  "3xl": "text-3xl md:text-4xl lg:text-5xl",
  "2xl": "text-2xl lg:text-4xl md:text-3xl",
  xl: "text-xl md:text-2xl lg:text-3xl",
  lg: "text-lg md:text-xl lg:text-2xl",
  md: "text-md md:text-lg lg:text-xl",
  base: "text-base",
  sm: "text-sm",
  xs: "text-xs",
};

const weightString: Record<TypographyWeight, string> = {
  regular: "font-normal",
  medium: "font-medium",
  bold: "font-bold",
  thin: "font-thin",
};

const TypographyComponent: ForwardRefRenderFunction<
  HTMLParagraphElement,
  TypographyProps
> = (props, ref) => {
  const {
    color = "inherit",
    styling = "sm",
    weight = "regular",
    isTextCentered = false,
    tag: Tag,
    isVisuallyHidden = false,
    className,
    children,
    ...rest
  } = props;

  return (
    <Tag
      {...rest}
      ref={ref}
      className={twMerge(
        stylingString[styling],
        weightString[weight],
        `text-${color}`,
        "whitespace-pre-line",
        isVisuallyHidden && "sr-only",
        isTextCentered && "text-center",
        className
      )}
    >
      {typeof children === "string" ? parse(children) : children}
    </Tag>
  );
};

export const Typography = forwardRef(TypographyComponent);
