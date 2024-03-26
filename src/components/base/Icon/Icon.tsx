import { FC, SVGProps } from "react";
import * as hiIcons from "react-icons/hi";
import * as hi2Icons from "react-icons/hi2";
import * as tbIcons from "react-icons/tb";
import { twMerge } from "tailwind-merge";

import styles from "./Icon.module.scss";

export type HiIconNames = keyof typeof hiIcons;
export type Hi2IconNames = keyof typeof hi2Icons;
export type TbIconNames = keyof typeof tbIcons;
export type IconNames = HiIconNames | Hi2IconNames | TbIconNames;
export type IconRotate = "45" | "90" | "135" | "180" | "225" | "270" | "315";

const icons = { ...hiIcons, ...hi2Icons, ...tbIcons };

type Props = {
  name: IconNames;
  size?: number;
  rotate?: IconRotate;
  className?: string;
};

export type IconProps = SVGProps<SVGSVGElement> & Props;

export const Icon: FC<IconProps> = (props) => {
  const { rotate, name, size = 24, className, ...rest } = props;
  const IconJSX = icons[name];

  return (
    <IconJSX
      {...rest}
      size={size}
      className={twMerge(
        styles.element,
        rotate && styles[`rotate-${rotate}`],
        className
      )}
    />
  );
};
