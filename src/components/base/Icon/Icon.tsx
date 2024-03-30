import { FC, SVGProps } from "react";
import * as hiIcons from "react-icons/hi";
import * as hi2Icons from "react-icons/hi2";
import * as tbIcons from "react-icons/tb";

export type HiIconNames = keyof typeof hiIcons;
export type Hi2IconNames = keyof typeof hi2Icons;
export type TbIconNames = keyof typeof tbIcons;
export type IconNames = HiIconNames | Hi2IconNames | TbIconNames;
export type IconRotate = "45" | "90" | "180" | "225" | "270" | "315";

const icons = { ...hiIcons, ...hi2Icons, ...tbIcons };

type Props = {
  name: IconNames;
  size?: number;
  className?: string;
};

export type IconProps = SVGProps<SVGSVGElement> & Props;

export const Icon: FC<IconProps> = (props) => {
  const { rotate, name, size = 24, ...rest } = props;
  const IconJSX = icons[name];

  return <IconJSX {...rest} size={size} />;
};
