"use client";

import { Tab, Tabs, TabsProps } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type FC } from "react";
import { twMerge } from "tailwind-merge";

export type WindowNavigationLink = {
  title: string;
  href: string;
  disabled?: boolean;
};

type Props = {
  items: WindowNavigationLink[];
  title: string;
};

type OmittedTabProps = Omit<
  TabsProps,
  "items" | "variant" | "aria-label" | "selectedKey"
>;

export type WindowNavigationProps = OmittedTabProps & Props;

export const WindowNavigation: FC<WindowNavigationProps> = (props) => {
  const { items, title, className, ...rest } = props;
  const pathname = usePathname();
  return (
    <Tabs
      {...rest}
      variant="bordered"
      selectedKey={pathname}
      className={twMerge("", className)}
      aria-label={title}
    >
      {items.map((item) => (
        <Tab
          key={item.href}
          as={item.disabled ? "button" : Link}
          disabled={item.disabled}
          href={item.disabled ? undefined : item.href}
          title={item.title}
        />
      ))}
    </Tabs>
  );
};
