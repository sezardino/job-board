import { type ComponentPropsWithoutRef, type FC } from "react";

type Props = {};

export type HomeTemplateProps = ComponentPropsWithoutRef<"div"> & Props;

export const HomeTemplate: FC<HomeTemplateProps> = (props) => {
  const { className, ...rest } = props;

  return <div {...rest} className={className}></div>;
};
