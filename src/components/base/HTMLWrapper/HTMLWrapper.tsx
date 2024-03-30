import parse from "html-react-parser";
import { type ComponentPropsWithoutRef, type FC } from "react";

import { twMerge } from "tailwind-merge";
import styles from "./HTMLWrapper.module.scss";

export type HTMLWrapperProps = ComponentPropsWithoutRef<"div"> & {
  body: string;
  tag?: "div" | "section" | "article";
};

export const HTMLWrapper: FC<HTMLWrapperProps> = (props) => {
  const { tag: Tag = "div", body, className, ...rest } = props;

  return (
    <Tag {...rest} className={twMerge(styles.element, className)}>
      {parse(body)}
    </Tag>
  );
};
