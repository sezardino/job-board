import {
  DropdownItem,
  DropdownMenu,
  Dropdown as NextUIDropdown,
  DropdownItemProps as NextUIDropdownItemProps,
  DropdownProps as NextUIDropdownProps,
} from "@nextui-org/react";
import { ForwardRefRenderFunction, ReactNode, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import NextLink from "next/link";
import { Typography } from "../Typography/Typography";
import styles from "./Dropdown.module.scss";

export type DropdownItemProps = Omit<NextUIDropdownItemProps, "children"> & {
  key: string;
  text: string;
  to?: string;
};

type Props = {
  items: DropdownItemProps[];
  children: ReactNode;
  label: string;
  disabledKeys?: string[];
};

type DropdownProps = Omit<NextUIDropdownProps, "children"> & Props;

type DropdownComponent = ForwardRefRenderFunction<
  HTMLDivElement,
  DropdownProps
>;

const DropdownComponent: DropdownComponent = (props, ref) => {
  const { label, items, disabledKeys, children, ...rest } = props;

  return (
    <NextUIDropdown ref={ref} placement="bottom-end" radius="sm" {...rest}>
      {children}
      <DropdownMenu disabledKeys={disabledKeys} aria-label={label}>
        {items.map(({ to, href, ...item }) => (
          <DropdownItem
            {...item}
            as={href ? "a" : to ? NextLink : "button"}
            href={href || to}
            target={href ? "_blank" : undefined}
            rel={href ? "noopener noreferrer" : undefined}
            key={item.key}
            aria-label={item.text}
            className={twMerge(styles.item, item.className)}
          >
            <Typography tag="span" className={styles.text}>
              {item.text}
            </Typography>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </NextUIDropdown>
  );
};

export const Dropdown = forwardRef(DropdownComponent);
