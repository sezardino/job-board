import { FC, SVGProps } from "react";
import * as hiIcons from "react-icons/hi";
import { twMerge } from "tailwind-merge";

export type HiIconNames = keyof typeof hiIcons;
export type IconNames = HiIconNames;
export type IconRotate = "45" | "90" | "135" | "180" | "225" | "270" | "315";

type Props = {
  name: IconNames;
  size?: number;
  rotate?: IconRotate;
  className?: string;
};

export type IconProps = SVGProps<SVGSVGElement> & Props;

export const Icon: FC<IconProps> = (props) => {
  const { rotate, name, size = 24, className, ...rest } = props;
  const IconJSX = hiIcons[name];

  const rotateStyles: Record<IconRotate, string> = {
    "45": "rotate-45",
    "90": "rotate-90",
    "135": "rotate-135",
    "180": "rotate-180",
    "225": "-rotate-135",
    "270": "-rotate-90",
    "315": "-rotate-45",
  };

  return (
    <IconJSX
      {...rest}
      size={size}
      className={twMerge("rotate", rotate && rotateStyles[rotate], className)}
    />
  );
};
