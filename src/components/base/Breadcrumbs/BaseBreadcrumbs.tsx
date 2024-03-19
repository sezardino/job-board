import { type FC } from "react";

import {
  BreadcrumbItem,
  Breadcrumbs,
  BreadcrumbsProps,
} from "@nextui-org/react";
import Link from "next/link";

export type BreadcrumbItem = { label: string; href?: string };

export type BaseBreadcrumbsProps = BreadcrumbsProps & {
  items: BreadcrumbItem[];
};

export const BaseBreadcrumbs: FC<BaseBreadcrumbsProps> = (props) => {
  const { items, ...rest } = props;

  return (
    <Breadcrumbs {...rest}>
      {items.map((item, index) => (
        <BreadcrumbItem
          key={index}
          as={item.href ? Link : undefined}
          href={item.href ? item.href : undefined}
        >
          {item.label}
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
};
